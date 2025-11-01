# 📋 Notas Técnicas - OAuth Multi-Proveedor

## Estructura del Proyecto

### Archivos Nuevos Creados

#### Estrategias (Strategies)

```
src/auth/strategies/google.strategy.ts
src/auth/strategies/discord.strategy.ts
```

**Qué hacen:** Validan los tokens de OAuth y llaman a los métodos login del servicio.

#### Guards

```
src/guard/google.guard.ts
src/guard/discord.guard.ts
```

**Qué hacen:** Protegen los endpoints, redirigiendo a OAuth si no hay autenticación.

#### Métodos del Servicio

- `googleLogin()` - Crea o actualiza usuario desde perfil de Google
- `discordLogin()` - Crea o actualiza usuario desde perfil de Discord

#### Rutas del Controlador

- `GET /auth/google` - Inicia flujo OAuth
- `GET /auth/google/callback` - Recibe callback
- `GET /auth/discord` - Inicia flujo OAuth
- `GET /auth/discord/callback` - Recibe callback

---

## Flujo de Autenticación

```
┌─────────────────────────────────────────────────────────────┐
│                    FLUJO OAUTH GENERAL                       │
└─────────────────────────────────────────────────────────────┘

1. Usuario hace clic en "Login con Google/Discord"
   │
   ├─→ GET /auth/google (o discord)
   │
2. Guard redirige a Google/Discord OAuth
   │
3. Usuario autoriza en Google/Discord
   │
4. Google/Discord redirige a callback URL
   │
   └─→ GET /auth/google/callback?code=xxx&state=xxx
   │
5. Strategy intercambia código por token
   │
6. Strategy llama validate() → googleLogin() / discordLogin()
   │
7. Servicio:
   ├─ Busca usuario por email
   ├─ Si existe: actualiza auth2Id
   └─ Si no existe: crea nuevo usuario
   │
8. Se genera JWT token
   │
9. Redirige a FRONTEND_URL/auth/callback?token=...
   │
10. Frontend recibe token y lo guarda
```

---

## Cómo Funcionan las Estrategias

### Google Strategy

```typescript
class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  validate(); // Llamado después de OAuth exitoso
  // Recibe: accessToken, refreshToken, profile
  // Retorna: AuthResponseDto con JWT
}
```

### Discord Strategy

```typescript
class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  validate(); // Llamado después de OAuth exitoso
  // Recibe: accessToken, refreshToken, profile
  // Retorna: AuthResponseDto con JWT
}
```

---

## Variables de Entorno Explicadas

### Google OAuth

```env
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
# ID de tu aplicación en Google Cloud
# Lo obtienes en: https://console.cloud.google.com/

GOOGLE_CLIENT_SECRET=xxx
# Contraseña de tu aplicación (SECRETO - no compartir)

GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
# URL donde Google redirecciona después de autorizar
# Debe coincidir exactamente con lo registrado en Google Cloud
```

### Discord OAuth

```env
DISCORD_CLIENT_ID=xxx
# ID de tu aplicación en Discord
# Lo obtienes en: https://discord.com/developers/applications

DISCORD_CLIENT_SECRET=xxx
# Contraseña de tu aplicación (SECRETO - no compartir)

DISCORD_CALLBACK_URL=http://localhost:3000/auth/discord/callback
# URL donde Discord redirecciona después de autorizar
# Debe coincidir exactamente con lo registrado en Discord Developer Portal
```

### Frontend

```env
FRONTEND_URL=http://localhost:3001
# Donde está tu aplicación frontend
# Se usa para redirigir después del login OAuth exitoso
# Recibirá el token en la URL: ?token=xxx&user=...
```

---

## Manejo de Errores

### En las Estrategias

- ✅ Validación automática de tokens
- ✅ Manejo de perfiles inválidos
- ✅ Logging de errores

### En los Métodos de Servicio

- ✅ Validación de email
- ✅ Búsqueda/creación de usuario
- ✅ Actualización de auth2Id
- ✅ Generación de JWT

### En los Callbacks del Controlador

- ✅ Try-catch para manejar excepciones
- ✅ Redirección a error page si falla
- ✅ Logging detallado

---

## Consideraciones de Seguridad

### ✅ Implementado

- JWT tokens con expiración (24h)
- Contraseñas hasheadas con bcrypt
- Validación de email desde OAuth
- Usuario marcado como verificado si viene de OAuth
- Logging de eventos de seguridad

### 🔒 Recomendaciones Adicionales

1. **HTTPS en Producción**

   ```env
   GOOGLE_CALLBACK_URL=https://tu-dominio.com/auth/google/callback
   DISCORD_CALLBACK_URL=https://tu-dominio.com/auth/discord/callback
   ```

2. **Secretos Seguros**
   - Nunca commitear `.env` con valores reales
   - Usar diferentes secrets por ambiente
   - Rotar secrets regularmente

3. **CORS Configurado**

   ```typescript
   app.enableCors({
     origin: process.env.FRONTEND_URL,
     credentials: true,
   });
   ```

4. **Validación de Email**
   - Algunos proveedores pueden no proporcionar email
   - Se genera email fallback (ej: username@discord.com)

---

## Diferencias por Proveedor

### Google

| Aspecto      | Valor                                     |
| ------------ | ----------------------------------------- |
| Perfil       | Completo (nombre, foto, email verificado) |
| Email        | Siempre proporcionado y verificado        |
| Scopes       | profile, email                            |
| StrategyName | 'google'                                  |

### Discord

| Aspecto      | Valor                                     |
| ------------ | ----------------------------------------- |
| Perfil       | Básico (username, avatar, email opcional) |
| Email        | Puede no estar disponible                 |
| Scopes       | identify, email                           |
| StrategyName | 'discord'                                 |

### GitHub

| Aspecto      | Valor                             |
| ------------ | --------------------------------- |
| Perfil       | Básico (username, foto de perfil) |
| Email        | Múltiples direcciones posibles    |
| Scopes       | user:email                        |
| StrategyName | 'github'                          |

---

## Extender para Otros Proveedores

### Patrón a Seguir

1. **Instalar Paquete**

   ```bash
   npm install passport-<provider>
   ```

2. **Crear Strategy** (`src/auth/strategies/<provider>.strategy.ts`)

   ```typescript
   @Injectable()
   export class <Provider>Strategy extends PassportStrategy(
     Strategy,
     '<provider>'
   ) {
     constructor(private authService: AuthService) {
       super({
         clientID: process.env.<PROVIDER>_CLIENT_ID,
         clientSecret: process.env.<PROVIDER>_CLIENT_SECRET,
         callbackURL: process.env.<PROVIDER>_CALLBACK_URL,
         scope: [...],
       });
     }

     async validate(...) {
       return this.authService.<provider>Login(profile);
     }
   }
   ```

3. **Crear Guard** (`src/guard/<provider>.guard.ts`)

   ```typescript
   @Injectable()
   export class <Provider>AuthGuard extends AuthGuard('<provider>') {}
   ```

4. **Crear Método de Servicio**

   ```typescript
   async <provider>Login(profile: any): Promise<AuthResponseDto> {
     // Lógica similar a googleLogin/discordLogin
   }
   ```

5. **Agregar Rutas**

   ```typescript
   @Get('<provider>')
   @UseGuards(<Provider>AuthGuard)
   async <provider>Auth() {}

   @Get('<provider>/callback')
   @UseGuards(<Provider>AuthGuard)
   <provider>Callback(@Req() req, @Res() res) {}
   ```

6. **Registrar en Módulo**
   ```typescript
   providers: [..., <Provider>Strategy]
   ```

---

## Testing

### Prueba Manual

```bash
# 1. Iniciar servidor
npm run start

# 2. Abrir en navegador
http://localhost:3000/auth/google
http://localhost:3000/auth/discord

# 3. Autorizar en el proveedor

# 4. Debe redireccionar a:
http://localhost:3001/auth/callback?token=...&user=...
```

### Con Postman/Insomnia

```
GET /auth/google
Authorization: No necesaria (redirige a OAuth)

Esperar a ser redirigido a /auth/google/callback
JWT se retorna en la URL
```

---

## Base de Datos - Campo auth2Id

El campo `auth2Id` en la tabla `users` guarda el ID del usuario en el proveedor OAuth.

```prisma
model User {
  id      String    @id @default(cuid())
  auth2Id String?   @unique
  email   String    @unique
  // ... otros campos
}
```

**Beneficios:**

- ✅ Permite enlazar múltiples OAuth al mismo usuario
- ✅ Evita duplicados de usuarios
- ✅ Facilita cambios de email

---

## Logs Importantes

Busca estos logs en la consola:

```
✓ Google profile received for user: John Doe
✓ Google login attempt para: john@example.com
✓ Google login exitoso para: john@example.com

✓ Discord profile received for user: GamersUnite#1234
✓ Discord login attempt para: gamerunite@discord.com
✓ Discord login exitoso para: gamerunite@discord.com
```

---

## Troubleshooting Técnico

### "Unsafe member access" warnings

- Estos son errores de ESLint
- Ya están manejados con `/* eslint-disable */`
- No afecta la funcionalidad

### Profile undefined en validate()

- Verifica que el proveedor OAuth esté retornando el perfil
- Revisa los scopes configurados
- Confirma que la respuesta no es limitada por permisos

### Token no se genera

- Verifica JWT_SECRET en .env
- Comprueba que AuthService tiene acceso a JwtService
- Revisa los logs de error

---

## Performance

### Operaciones Realizadas por Cada Login OAuth

1. ✅ Validar token de OAuth (muy rápido)
2. ✅ Buscar usuario por email (índice DB)
3. ✅ Crear o actualizar usuario (1 query)
4. ✅ Generar JWT (criptografía, rápido)
5. ✅ Redirigir (instantáneo)

**Tiempo total:** ~50-100ms (limitado por BD)

---

## Monitoreo

### Métricas a Seguir

```
- Intentos de login OAuth por día
- Tasa de éxito vs error
- Usuarios únicos creados
- Tiempo promedio de login
- Errores más comunes
```

### Logger Recomendado

Ya está implementado:

```typescript
private readonly logger = new Logger(NombreClase.name);
```

Todos los eventos de login se registran automáticamente.

---

**Última actualización:** 1 de Noviembre de 2025
