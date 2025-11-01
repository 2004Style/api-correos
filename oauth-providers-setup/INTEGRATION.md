# 🔐 Guía de Integración OAuth Multi-Proveedor

Este documento proporciona instrucciones paso a paso para integrar autenticación OAuth con Google y Discord (además de GitHub) en tu aplicación NestJS.

## 📋 Tabla de Contenidos

1. [Instalación de Dependencias](#instalación-de-dependencias)
2. [Creación de Aplicaciones OAuth](#creación-de-aplicaciones-oauth)
3. [Integración de Archivos](#integración-de-archivos)
4. [Configuración de Variables de Entorno](#configuración-de-variables-de-entorno)
5. [Actualización de Módulos y Controladores](#actualización-de-módulos-y-controladores)
6. [Pruebas](#pruebas)

---

## 🚀 Instalación de Dependencias

Ejecuta el script de instalación automática:

```bash
chmod +x install.sh
./install.sh
```

**O manualmente:**

```bash
# Con npm
npm install passport-google-oauth20 passport-discord @types/passport-google-oauth20

# Con pnpm
pnpm add passport-google-oauth20 passport-discord @types/passport-google-oauth20

# Con yarn
yarn add passport-google-oauth20 passport-discord @types/passport-google-oauth20
```

---

## 🔑 Creación de Aplicaciones OAuth

### Google OAuth Setup

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto
3. Habilita la API de Google+
4. Ve a "Credenciales" → "Crear Credenciales" → "OAuth 2.0 Client ID"
5. Selecciona "Aplicación Web"
6. Agrega URIs autorizados:
   - `http://localhost:3000/auth/google/callback` (desarrollo)
   - `https://tu-dominio.com/auth/google/callback` (producción)
7. Copia el **Client ID** y **Client Secret**

### Discord OAuth Setup

1. Ve a [Discord Developer Portal](https://discord.com/developers/applications)
2. Haz clic en "New Application"
3. En "OAuth2" → "General"
4. Copia el **Client ID** y **Client Secret**
5. En "OAuth2" → "Redirects", agrega:
   - `http://localhost:3000/auth/discord/callback` (desarrollo)
   - `https://tu-dominio.com/auth/discord/callback` (producción)

### GitHub OAuth Setup (Si aún no lo tienes configurado)

1. Ve a GitHub → Settings → Developer settings → OAuth Apps
2. Click en "New OAuth App"
3. Completa los campos:
   - Application name: `Mi App`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/auth/github/callback`
4. Copia el **Client ID** y **Client Secret**

---

## 📁 Integración de Archivos

### Paso 1: Copiar Estrategias

Copia los archivos de estrategia a tu proyecto:

```bash
# Google Strategy
cp strategies/google.strategy.txt src/auth/strategies/google.strategy.ts

# Discord Strategy
cp strategies/discord.strategy.txt src/auth/strategies/discord.strategy.ts
```

### Paso 2: Copiar Guards

Copia los archivos de guards a tu proyecto:

```bash
# Google Guard
cp guards/google.guard.txt src/guard/google.guard.ts

# Discord Guard
cp guards/discord.guard.txt src/guard/discord.guard.ts
```

### Paso 3: Actualizar AuthService

1. Abre `src/auth/auth.service.ts`
2. Abre el archivo `auth.service-methods.txt`
3. Copia el contenido del método `googleLogin()` y `discordLogin()`
4. Pégalo en tu `auth.service.ts` después del método `githubLogin()`

### Paso 4: Actualizar AuthController

1. Abre `src/auth/auth.controller.ts`
2. Abre el archivo `auth.controller-methods.txt`
3. **En la parte superior**, actualiza los imports agregando:

   ```typescript
   import { GoogleAuthGuard } from '../guard/google.guard';
   import { DiscordAuthGuard } from '../guard/discord.guard';
   ```

4. **En la clase AuthController**, agrega las rutas Google y Discord proporcionadas en el archivo

### Paso 5: Actualizar AuthModule

1. Abre `src/auth/auth.module.ts`
2. Abre el archivo `auth.module-update.txt`
3. **En los imports**, agrega:

   ```typescript
   import { GoogleStrategy } from './strategies/google.strategy';
   import { DiscordStrategy } from './strategies/discord.strategy';
   ```

4. **En el array `providers`**, agrega:
   ```typescript
   GoogleStrategy,
   DiscordStrategy,
   ```

---

## 🔒 Configuración de Variables de Entorno

1. Copia el archivo `.env.example` a `.env`:

   ```bash
   cp .env.example .env
   ```

2. Actualiza los valores con tus credenciales OAuth:

```env
# JWT Configuration
JWT_SECRET=tu-clave-super-secreta

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/api_correos

# GitHub OAuth
GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback

# Google OAuth
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# Discord OAuth
DISCORD_CLIENT_ID=xxx
DISCORD_CLIENT_SECRET=xxx
DISCORD_CALLBACK_URL=http://localhost:3000/auth/discord/callback

# Frontend
FRONTEND_URL=http://localhost:3001

# Application
NODE_ENV=development
PORT=3000
```

---

## ✅ Verificación de la Integración

Después de completar todos los pasos, verifica que:

1. ✅ Los archivos están en sus carpetas correctas
2. ✅ Los imports están actualizados
3. ✅ Las variables de entorno están configuradas
4. ✅ El TypeScript compila sin errores:
   ```bash
   npm run build
   # o
   pnpm build
   ```

---

## 🧪 Pruebas

### Endpoints Disponibles

| Método | Ruta                     | Descripción                   |
| ------ | ------------------------ | ----------------------------- |
| GET    | `/auth/github`           | Iniciar login con GitHub      |
| GET    | `/auth/github/callback`  | Callback de GitHub            |
| GET    | `/auth/google`           | Iniciar login con Google      |
| GET    | `/auth/google/callback`  | Callback de Google            |
| GET    | `/auth/discord`          | Iniciar login con Discord     |
| GET    | `/auth/discord/callback` | Callback de Discord           |
| POST   | `/auth/register`         | Registro manual               |
| POST   | `/auth/login`            | Login manual                  |
| GET    | `/auth/profile`          | Obtener perfil (requiere JWT) |

### Prueba Manual en Postman o Insomnia

1. **Prueba de GitHub Login:**

   ```
   GET http://localhost:3000/auth/github
   ```

2. **Prueba de Google Login:**

   ```
   GET http://localhost:3000/auth/google
   ```

3. **Prueba de Discord Login:**

   ```
   GET http://localhost:3000/auth/discord
   ```

4. **Obtener Perfil (después de autenticarse):**
   ```
   GET http://localhost:3000/auth/profile
   Authorization: Bearer <token_recibido>
   ```

---

## 🔧 Troubleshooting

### Error: "No se encuentra el módulo 'passport-google-oauth20'"

**Solución:** Ejecuta nuevamente:

```bash
npm install passport-google-oauth20 passport-discord @types/passport-google-oauth20
```

### Error: "GOOGLE_CLIENT_ID no está definido"

**Solución:** Verifica que tu archivo `.env` contiene todas las variables necesarias:

```bash
cat .env | grep GOOGLE_CLIENT_ID
```

### El callback no funciona

**Solución:**

1. Verifica que la URL de callback en tu aplicación OAuth coincide exactamente con:
   ```
   http://localhost:3000/auth/google/callback
   http://localhost:3000/auth/discord/callback
   ```
2. Asegúrate de que estés usando `FRONTEND_URL` correcto para las redirecciones

### CORS Error

**Solución:** Agrega CORS en tu `main.ts`:

```typescript
app.enableCors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true,
});
```

---

## 📚 Estructura de Carpetas Resultante

```
src/
├── auth/
│   ├── strategies/
│   │   ├── jwt.strategy.ts
│   │   ├── github.strategy.ts
│   │   ├── google.strategy.ts    ← NUEVO
│   │   └── discord.strategy.ts   ← NUEVO
│   ├── auth.controller.ts        (actualizado)
│   ├── auth.service.ts           (actualizado)
│   ├── auth.module.ts            (actualizado)
│   └── auth.dto.ts
├── guard/
│   ├── auth.guard.ts
│   ├── github.guard.ts
│   ├── google.guard.ts           ← NUEVO
│   ├── discord.guard.ts          ← NUEVO
│   ├── public.decorator.ts
│   ├── user.decorator.ts
│   └── roles.decorator.ts
```

---

## 🚀 Agregar Más Proveedores

Para agregar más proveedores OAuth (Microsoft, LinkedIn, etc.), sigue este patrón:

1. Instala el paquete: `npm install passport-<provider>`
2. Crea la estrategia en `src/auth/strategies/<provider>.strategy.ts`
3. Crea el guard en `src/guard/<provider>.guard.ts`
4. Agrega el método `<provider>Login()` en `AuthService`
5. Agrega las rutas en `AuthController`
6. Registra en `AuthModule`

---

## 📞 Soporte

Para más información sobre Passport.js OAuth estrategias:

- [Passport Documentation](http://www.passportjs.org/)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [Discord OAuth](https://discord.com/developers/docs/topics/oauth2)
- [GitHub OAuth](https://docs.github.com/en/developers/apps/building-oauth-apps)

---

**Última actualización:** 1 de Noviembre de 2025
