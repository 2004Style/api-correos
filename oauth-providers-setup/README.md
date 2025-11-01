# 🔐 OAuth Multi-Proveedor Setup

Carpeta con todo lo necesario para integrar autenticación OAuth con múltiples proveedores (GitHub, Google, Discord) en tu aplicación NestJS.

## 📦 Contenido de la Carpeta

```
oauth-providers-setup/
├── install.sh                      # Script de instalación automática
├── INTEGRATION.md                  # Guía completa de integración
├── README.md                       # Este archivo
├── .env.example                    # Variables de entorno ejemplo
├── auth.service-methods.txt        # Métodos para AuthService
├── auth.controller-methods.txt     # Métodos para AuthController
├── auth.module-update.txt          # Actualización para AuthModule
├── strategies/
│   ├── google.strategy.txt         # Estrategia de Google
│   └── discord.strategy.txt        # Estrategia de Discord
└── guards/
    ├── google.guard.ts            # Guard de Google
    └── discord.guard.ts           # Guard de Discord
```

## 🚀 Instalación Rápida

### Opción 1: Instalación Automática (Recomendado)

Desde la raíz de tu proyecto:

```bash
cd oauth-providers-setup
chmod +x install.sh
./install.sh
```

El script hará lo siguiente automáticamente:

- ✅ Detectará tu gestor de paquetes (npm, pnpm, yarn)
- ✅ Instalará las dependencias necesarias
- ✅ Copiará los archivos de estrategias y guards
- ✅ Creará el archivo `.env`
- ✅ Te guiará con los pasos manuales restantes

### Opción 2: Instalación Manual

1. **Instalar dependencias:**

   ```bash
   npm install passport-google-oauth20 passport-discord @types/passport-google-oauth20
   ```

2. **Copiar archivos:**

   ```bash
   cp strategies/google.strategy.txt ../src/auth/strategies/google.strategy.ts
   cp strategies/discord.strategy.txt ../src/auth/strategies/discord.strategy.ts
   cp guards/google.guard.txt ../src/guard/google.guard.ts
   cp guards/discord.guard.txt ../src/guard/discord.guard.ts
   cp .env.example ../.env
   ```

3. **Actualizar archivos manualmente** (ver INTEGRATION.md)

## 📖 Documentación

Para instrucciones detalladas paso a paso, consulta **[INTEGRATION.md](./INTEGRATION.md)**

La guía incluye:

- 🔑 Cómo crear aplicaciones OAuth en cada plataforma
- 📁 Dónde copiar cada archivo
- 🔒 Configuración de variables de entorno
- ✅ Verificación de la integración
- 🧪 Cómo hacer pruebas
- 🔧 Troubleshooting

## ⚙️ Archivos de Código

### Para AuthService (`auth.service-methods.txt`)

Contiene:

- `googleLogin()` - Método para login con Google
- `discordLogin()` - Método para login con Discord

**Dónde copiar:** Agrega estos métodos al archivo `src/auth/auth.service.ts` después del método `githubLogin()`

### Para AuthController (`auth.controller-methods.txt`)

Contiene:

- Rutas GET `/auth/google` y `/auth/google/callback`
- Rutas GET `/auth/discord` y `/auth/discord/callback`
- Imports actualizados

**Dónde copiar:** Actualiza los imports y agrega las rutas en `src/auth/auth.controller.ts`

### Para AuthModule (`auth.module-update.txt`)

Contiene:

- Imports para GoogleStrategy y DiscordStrategy
- Registro de estrategias en el array `providers`

**Dónde copiar:** Actualiza `src/auth/auth.module.ts`

## 🔧 Creación de OAuth Apps

### Google

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea OAuth 2.0 credentials
3. Tipo: Aplicación Web
4. Agregar redirect: `http://localhost:3000/auth/google/callback`

### Discord

1. Ve a [Discord Developer Portal](https://discord.com/developers/applications)
2. Nueva Aplicación
3. OAuth2 → General (copia Client ID y Secret)
4. Redirect a `http://localhost:3000/auth/discord/callback`

### GitHub

1. Ve a GitHub Settings → Developer settings → OAuth Apps
2. Nueva OAuth App
3. Authorization callback: `http://localhost:3000/auth/github/callback`

## 🌍 Variables de Entorno

Ejemplo completo en `.env.example`. Necesitas:

```env
# OAuth Google
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# OAuth Discord
DISCORD_CLIENT_ID=xxx
DISCORD_CLIENT_SECRET=xxx
DISCORD_CALLBACK_URL=http://localhost:3000/auth/discord/callback

# OAuth GitHub (si lo usas)
GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback
```

## 🧪 Endpoints Disponibles

```
GET  /auth/google              # Iniciar login con Google
GET  /auth/google/callback     # Callback de Google
GET  /auth/discord             # Iniciar login con Discord
GET  /auth/discord/callback    # Callback de Discord
GET  /auth/github              # Iniciar login con GitHub
GET  /auth/github/callback     # Callback de GitHub
POST /auth/register            # Registro manual
POST /auth/login               # Login manual
GET  /auth/profile             # Obtener perfil (requiere JWT)
```

## ✅ Checklist de Integración

- [ ] Ejecuté el script `install.sh` o instalé las dependencias manualmente
- [ ] Copié los archivos de estrategias a `src/auth/strategies/`
- [ ] Copié los guards a `src/guard/`
- [ ] Actualicé `src/auth/auth.service.ts` con los métodos Google y Discord
- [ ] Actualicé `src/auth/auth.controller.ts` con las nuevas rutas
- [ ] Actualicé `src/auth/auth.module.ts` con las nuevas estrategias
- [ ] Configuré las variables de entorno en `.env`
- [ ] Compilé el proyecto sin errores (`npm run build`)
- [ ] Probé los endpoints

## 🆘 Ayuda

### Errores comunes

**Error: "No se encuentra el módulo"**

```bash
npm install passport-google-oauth20 passport-discord @types/passport-google-oauth20
```

**Error: "CLIENT_ID no definido"**

- Verifica tu archivo `.env`
- Asegúrate de que las variables existan
- Reinicia el servidor después de modificar `.env`

**OAuth callback falla**

- Verifica que la URL callback coincide exactamente
- Incluye protocolo, dominio y puerto
- Ejemplo: `http://localhost:3000/auth/google/callback`

## 📚 Enlaces Útiles

- [Passport.js Documentation](http://www.passportjs.org/)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [Discord OAuth](https://discord.com/developers/docs/topics/oauth2)
- [GitHub OAuth](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [NestJS Authentication](https://docs.nestjs.com/techniques/authentication)

## 🎯 Próximos Pasos

Después de completar la integración:

1. **Agregar más proveedores:** Repite el proceso con Microsoft, LinkedIn, etc.
2. **Personalizar:** Adapta los métodos según tus necesidades
3. **Producción:** Usa variables de entorno reales y HTTPS
4. **Seguridad:** Implementa validaciones adicionales

## 📝 Notas

- Todos los archivos `.txt` contienen código TypeScript lista para copiar
- El script `install.sh` es compatible con bash/zsh
- Los archivos ya tienen comentarios eslint deshabilitados donde es necesario
- La estructura mantiene compatibilidad con la arquitectura existente

---

**Última actualización:** 1 de Noviembre de 2025

¿Preguntas? Revisa [INTEGRATION.md](./INTEGRATION.md) para más detalles.
