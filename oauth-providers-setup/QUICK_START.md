# 🚀 Guía Rápida - OAuth Multi-Proveedor

## En 5 Minutos

### 1. Ejecuta el Script (1 min)

```bash
cd oauth-providers-setup
chmod +x install.sh
./install.sh
```

### 2. Copia Métodos al Service (1 min)

Abre `auth.service-methods.txt` y copia los dos métodos al archivo `src/auth/auth.service.ts`

### 3. Actualiza el Controlador (1 min)

Abre `auth.controller-methods.txt` y:

- Actualiza los IMPORTS
- Agrega las 4 rutas nuevas

### 4. Actualiza el Módulo (1 min)

Abre `auth.module-update.txt` y:

- Agrega 2 IMPORTS
- Agrega 2 providers

### 5. Configura .env (1 min)

Abre `.env` y completa con tus credenciales OAuth

## Credenciales OAuth - Dónde Obtenerlas

### 🔵 Google

- [Google Cloud Console](https://console.cloud.google.com/)
- Crear OAuth 2.0 Client ID
- Tipo: Web Application
- Callback: `http://localhost:3000/auth/google/callback`

### 🟣 Discord

- [Discord Developer Portal](https://discord.com/developers/applications)
- New Application
- OAuth2 → Redirects → Agregar callback
- Callback: `http://localhost:3000/auth/discord/callback`

### ⚫ GitHub

- GitHub Settings → Developer settings → OAuth Apps
- New OAuth App
- Callback: `http://localhost:3000/auth/github/callback`

## Archivos Creados

```
✅ src/auth/strategies/google.strategy.ts
✅ src/auth/strategies/discord.strategy.ts
✅ src/guard/google.guard.ts
✅ src/guard/discord.guard.ts
✅ .env (con ejemplo)
```

## Verificar

```bash
# Compilar sin errores
npm run build

# Ejecutar
npm run start

# Probar endpoint
curl http://localhost:3000/auth/google
```

## Rutas Disponibles

| Proveedor | Ruta            |
| --------- | --------------- |
| Google    | `/auth/google`  |
| Discord   | `/auth/discord` |
| GitHub    | `/auth/github`  |

## ⚠️ Importante

- Actualiza **3 archivos principales** (service, controller, module)
- Coloca **credenciales reales** en `.env` (no compartir!)
- URLs de callback deben coincidir exactamente
- `FRONTEND_URL` para redirigir después de login

## Variables .env Necesarias

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
DISCORD_CALLBACK_URL=http://localhost:3000/auth/discord/callback

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback

FRONTEND_URL=http://localhost:3001
```

## Flujo de Login

```
Usuario → GET /auth/google → Redirige a Google OAuth
                              ↓
                        Usuario autoriza
                              ↓
         Google → callback a /auth/google/callback
                              ↓
                    Se crea/actualiza usuario
                              ↓
                    Se genera JWT token
                              ↓
         Redirige a FRONTEND_URL/auth/callback?token=...
```

## Solucionar Problemas

### "Módulo no encontrado"

```bash
npm install passport-google-oauth20 passport-discord @types/passport-google-oauth20
```

### "Callback URL no coincide"

- Verifica en el proveedor OAuth: debe ser exacto
- Incluye protocolo `http://` o `https://`
- No olvides el puerto `:3000`

### "CLIENT_ID undefined"

- Revisa el archivo `.env`
- Reinicia el servidor después de actualizar `.env`

## Para Agregar Otro Proveedor

1. Instala: `npm install passport-<provider>`
2. Crea `src/auth/strategies/<provider>.strategy.ts`
3. Crea `src/guard/<provider>.guard.ts`
4. Agrega método en `AuthService`
5. Agrega rutas en `AuthController`
6. Registra en `AuthModule`

Sigue el mismo patrón de Google/Discord.

---

📖 **Documentación completa:** Abre `INTEGRATION.md`
