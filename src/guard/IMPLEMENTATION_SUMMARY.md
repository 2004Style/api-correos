# RESUMEN DE IMPLEMENTACIÓN DE GUARDS

## ✅ Archivos Creados/Modificados

### 1. **auth.guard.ts** (Modificado)

Guard de autenticación global con soporte para JWT, validación de roles y rutas públicas.

**Características:**

- Valida tokens JWT del header `Authorization: Bearer <token>` o cookies
- Verifica que el usuario esté activo en la BD
- Controla acceso por roles mediante `@Roles()`
- Permite rutas públicas con `@Public()`
- Inyecta usuario autenticado en los handlers

**Uso:**

```typescript
@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  @Get() // Requiere autenticación
  getUsers() {}

  @Get('public')
  @Public() // No requiere autenticación
  getPublic() {}

  @Post()
  @Roles('ADMIN') // Solo admin
  createUser() {}
}
```

---

### 2. **public.decorator.ts** (Nuevo)

Decorador para marcar rutas como públicas (sin autenticación).

```typescript
@Get('info')
@Public()
getInfo() { }
```

---

### 3. **roles.decorator.ts** (Nuevo)

Decorador para especificar qué roles pueden acceder a una ruta.

```typescript
@Post('create')
@Roles('ADMIN', 'VENDOR')
createItem() { }
```

---

### 4. **user.decorator.ts** (Nuevo)

Decorador para inyectar el usuario autenticado en los parámetros del handler.

```typescript
// Usuario completo
@Get('profile')
getProfile(@User() user: User) { }

// Solo un campo
@Get('email')
getEmail(@User('email') email: string) { }
```

---

### 5. **mail.guard.ts** (Modificado)

Guard para proteger el endpoint de emails mediante credenciales de aplicación (clientId + secretKey).

**Características:**

- Valida que el cliente envíe `X-Client-Id` y `X-Secret-Key` en headers
- Verifica que la aplicación esté activa y no suspendida
- Compara el secretKey hasheado con bcrypt
- Registra el último uso de la aplicación

**Uso:**

```bash
curl -X POST http://localhost:3000/mail \
  -H "Content-Type: application/json" \
  -H "X-Client-Id: cli_xxxxx" \
  -H "X-Secret-Key: sk_live_xxxxx" \
  -d '{"to":"user@example.com","subject":"Test","text":"Hello"}'
```

---

### 6. **github.guard.ts** (Nuevo)

Guard para autenticación con GitHub OAuth mediante Passport.

**Características:**

- Valida que esté configurado GITHUB_CLIENT_ID y GITHUB_CLIENT_SECRET
- Maneja errores de autenticación
- Integración automática con Passport

**Uso:**

```typescript
@Get('github')
@UseGuards(GitHubAuthGuard)
githubAuth() { }

@Get('github/callback')
@UseGuards(GitHubAuthGuard)
githubCallback(@Req() req: Request) {
  return req.user;
}
```

---

### 7. **auth.service.ts** (Modificado)

Se añadió el método `getUserWithRole()` para obtener usuario con su rol incluido.

```typescript
async getUserWithRole(userId: string) {
  return await DbContext.user.findUnique({
    where: { id: userId },
    include: { role: true },
  });
}
```

---

### 8. **aplication.service.ts** (Modificado)

Se añadieron métodos para soporte del MailAuthGuard:

- `getApplicationByClientId(clientId)` - Obtener aplicación por clientId
- `updateLastUsed(applicationId)` - Registrar último uso

```typescript
async getApplicationByClientId(clientId: string) {
  return await DbContext.application.findUnique({
    where: { clientId },
  });
}

async updateLastUsed(applicationId: string) {
  await DbContext.application.update({
    where: { id: applicationId },
    data: { lastUsedAt: new Date() },
  });
}
```

---

### 9. **README.md** (Creado)

Documentación completa de todos los guards con ejemplos de uso.

---

## 🔐 Seguridad

### Protección de Rutas

1. **Rutas Públicas**: Se marcan con `@Public()` para saltarse la autenticación
2. **Rutas Privadas**: Requieren token JWT válido
3. **Rutas por Rol**: Se especifican con `@Roles('ADMIN', 'USER')`
4. **Rutas de Email**: Se protegen con credenciales de aplicación

### Validación de Tokens

- Extraen tokens de `Authorization: Bearer <token>` o cookies
- Verifican firma JWT con `JWT_SECRET`
- Validan que no estén expirados
- Verifican que el usuario esté activo en BD

### Validación de Credenciales de Email

- Validan `X-Client-Id` y `X-Secret-Key` en headers
- Comparan secretKey hasheada con bcrypt
- Verifican que la aplicación esté activa
- Verifican que no esté suspendida

---

## 📝 Variables de Entorno Requeridas

```bash
# JWT
JWT_SECRET=your-secret-key-minimum-32-characters

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback
```

---

## 🚀 Próximos Pasos

### 1. Registrar AuthGuard Globalmente (app.module.ts)

```typescript
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
```

### 2. Usar Decoradores en Controladores

- `@Public()` para rutas públicas
- `@Roles('ADMIN')` para rutas protegidas por rol
- `@User()` para inyectar usuario autenticado

### 3. Aplicar Guards Específicos

- `@UseGuards(AuthGuard)` si no está registrado globalmente
- `@UseGuards(MailAuthGuard)` para endpoints de email
- `@UseGuards(GitHubAuthGuard)` para OAuth con GitHub

---

## ✨ Ejemplos Rápidos

### Ruta Pública

```typescript
@Get('about')
@Public()
getAbout() { return { about: true }; }
```

### Ruta Solo Admin

```typescript
@Post('users')
@Roles('ADMIN')
createUser(@Body() dto: any) { return { created: true }; }
```

### Ruta para Admin o User

```typescript
@Get('profile')
@Roles('ADMIN', 'USER')
getProfile(@User() user: User) { return user; }
```

### Enviar Email con Autenticación

```bash
curl -X POST http://localhost:3000/mail \
  -H "X-Client-Id: cli_abc123" \
  -H "X-Secret-Key: sk_live_xyz789" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "recipient@example.com",
    "subject": "Welcome",
    "html": "<h1>Hello</h1>"
  }'
```

---

## 📊 Flujo de Autenticación

```
Request a ruta
     ↓
¿Está marcada @Public()?
     ├─ SÍ → Permitir acceso
     └─ NO → Extraer token
              ↓
        ¿Token válido?
              ├─ NO → 401 Unauthorized
              └─ SÍ → Obtener usuario de BD
                     ↓
                ¿Usuario activo?
                     ├─ NO → 401 Unauthorized
                     └─ SÍ → ¿Hay @Roles()?
                            ├─ NO → Permitir acceso
                            └─ SÍ → ¿Usuario tiene rol?
                                   ├─ NO → 403 Forbidden
                                   └─ SÍ → Permitir acceso
```

---

## 🎯 Resumen

✅ AuthGuard - Autenticación global con JWT y control de roles
✅ MailAuthGuard - Protección de emails con credenciales
✅ GitHubAuthGuard - Autenticación con OAuth de GitHub
✅ Decoradores - @Public(), @Roles(), @User()
✅ Documentación - README.md con ejemplos completos
✅ Métodos de soporte - Agregados a AuthService y AplicationService
