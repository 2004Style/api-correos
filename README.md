# 📧 API REST - Sistema Integral de Gestión de Correos, Usuarios y Aplicaciones

API REST profesional construida con **NestJS**, **Prisma** y **PostgreSQL** que proporciona un sistema completo de autenticación, gestión de usuarios, aplicaciones y envío de correos electrónicos mediante SMTP. Incluye autenticación con JWT, OAuth multi-proveedor (Google, Discord, GitHub), paginación avanzada, búsqueda en tiempo real y un sistema de roles flexible.

---

> 🎯 **¿Estás aquí por primera vez?** Abre **[COMIENZA_AQUI.md](./COMIENZA_AQUI.md)** para una guía personalizada según tu necesidad. Te llevará de la mano en los primeros pasos. ¡No te pierdas!

---

## 📋 Tabla de Contenidos

- [Características Principales](#-características)
- [Inicio Rápido](#-inicio-rápido)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Autenticación y OAuth](#-autenticación-y-oauth)
- [Paginación y Búsqueda](#-📊-paginación-y-búsqueda)
- [Documentación de Rutas](#-documentación-de-rutas)
- [Ejemplos de Uso](#-ejemplos-de-uso-completos)
- [Colección de Postman](#-colección-de-postman)
- [Seguridad](#-seguridad)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Solución de Problemas](#-solución-de-problemas)

> **💡 Tip:** Tenemos un **[Índice Completo de Documentación](./DOCUMENTACION.md)** que te ayuda a navegar todo. Si te pierdes, ¡úsalo!

## ✨ Características

- ✅ **Autenticación segura** - Login/Registro con JWT y OAuth2 (Google, Discord, GitHub)
- ✅ **OAuth Multi-Proveedor** - Integración con Google, Discord y GitHub lista para usar
- ✅ **Gestión de Usuarios** - CRUD completo con paginación y búsqueda case-insensitive
- ✅ **Paginación avanzada** - Offset/limit inteligente con metadatos completos
- ✅ **Sistema de Roles** - Gestión flexible de permisos y acceso
- ✅ **Gestión de Aplicaciones** - Crear y administrar aplicaciones con credenciales seguras
- ✅ **Envío de Correos** - SMTP configurado, múltiples destinatarios, adjuntos, plantillas HTML
- ✅ **Autenticación por API Key** - Protección con X-Client-Id y X-Secret-Key
- ✅ **Guards y Decoradores** - Protección completa de rutas (@Public, @Roles, @User)
- ✅ **Type-Safety completo** - TypeScript strict, sin `any`, totalmente type-safe
- ✅ **Base de datos** - PostgreSQL con Prisma ORM y migraciones automáticas
- ✅ **Validación automática** - DTOs con class-validator
- ✅ **Manejo robusto de errores** - Respuestas estandarizadas en todas las rutas
- ✅ **CORS configurable** - Control completo de orígenes permitidos

## ⚡ Inicio Rápido

Si quieres empezar en menos de 5 minutos:

```bash
# 1. Clonar y entrar al proyecto
git clone https://github.com/2004Style/api-correos.git
cd api-correos

# 2. Instalar dependencias
pnpm install

# 3. Configurar base de datos (ver sección de Configuración)
# Crear .env con DATABASE_URL

# 4. Ejecutar migraciones
npx prisma migrate dev --name init

# 5. Iniciar servidor
pnpm start:dev

# ¡Listo! API disponible en http://localhost:3000
```

### Para OAuth (Google, Discord, GitHub)

Si quieres agregar autenticación OAuth a la API, existe una carpeta completa con todo lo necesario:

```bash
# Desde la raíz del proyecto
cd oauth-providers-setup

# Ver instrucciones rápidas
cat START_HERE.md

# Ejecutar instalación automática
chmod +x install.sh
./install.sh
```

La carpeta `oauth-providers-setup/` contiene:

- **Documentación paso a paso** para entender cómo funciona
- **Script automático** que instala todo lo necesario
- **Estrategias y Guards** ya listos para copiar
- **Ejemplos y troubleshooting** para resolver problemas

## 🔧 Requisitos Previos

Antes de empezar, asegúrate de tener instalado:

- **Node.js**: v18 o superior (v20+ recomendado)
- **npm**, **yarn** o **pnpm** - Gestor de paquetes
- **PostgreSQL**: v12 o superior - Base de datos
- **Git**: Para clonar el repositorio

Para verificar que todo está bien:

```bash
node --version      # v18.x.x o superior
npm --version       # O pnpm/yarn
psql --version      # PostgreSQL
```

### Cuenta de Correo SMTP (Opcional)

Si planeas usar el envío de correos, necesitas:

- **Gmail**: Cuenta con contraseña de aplicación
- **Outlook**: Credenciales de aplicación
- **SendGrid**: API key
- **Cualquier proveedor SMTP**: Servidor, puerto y credenciales

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/2004Style/api-correos.git
cd api-correos
```

### 2. Instalar dependencias

```bash
pnpm install
# O con npm: npm install
# O con yarn: yarn install
```

### 3. Configurar el archivo `.env`

Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración:

```env
# ═══════════════════════════════════════════════════════════════
# Configuración del Servidor
# ═══════════════════════════════════════════════════════════════
NODE_ENV=development
PORT=3000

# ═══════════════════════════════════════════════════════════════
# Base de Datos - PostgreSQL
# ═══════════════════════════════════════════════════════════════
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/api_correos"
# Ejemplo: postgresql://postgres:password123@localhost:5432/api_correos

# ═══════════════════════════════════════════════════════════════
# Autenticación JWT
# ═══════════════════════════════════════════════════════════════
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production-minimum-32-characters"
JWT_EXPIRATION="24h"

# ═══════════════════════════════════════════════════════════════
# Autenticación OAuth - GitHub (Opcional)
# ═══════════════════════════════════════════════════════════════
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GITHUB_CALLBACK_URL="http://localhost:3000/auth/github/callback"

# ═══════════════════════════════════════════════════════════════
# Autenticación OAuth - Google (Opcional, ver oauth-providers-setup/)
# ═══════════════════════════════════════════════════════════════
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google/callback"

# ═══════════════════════════════════════════════════════════════
# Autenticación OAuth - Discord (Opcional, ver oauth-providers-setup/)
# ═══════════════════════════════════════════════════════════════
DISCORD_CLIENT_ID="your-discord-client-id"
DISCORD_CLIENT_SECRET="your-discord-client-secret"
DISCORD_CALLBACK_URL="http://localhost:3000/auth/discord/callback"

# ═══════════════════════════════════════════════════════════════
# SMTP - Configuración de Correos
# ═══════════════════════════════════════════════════════════════
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="tu-email@gmail.com"
SMTP_PASS="tu-contraseña-de-aplicacion"
SMTP_FROM="tu-email@gmail.com"
SMTP_FROM_NAME="API Correos"

# ═══════════════════════════════════════════════════════════════
# CORS - Orígenes Permitidos
# ═══════════════════════════════════════════════════════════════
CORS_ORIGIN="*"
# En producción: CORS_ORIGIN="https://tudominio.com"

# ═══════════════════════════════════════════════════════════════
# Frontend URL - Para redireccionamientos OAuth
# ═══════════════════════════════════════════════════════════════
FRONTEND_URL="http://localhost:3001"
# En producción: FRONTEND_URL="https://tudominio.com"
```

### 4. Crear la base de datos

Antes de ejecutar las migraciones, asegúrate de crear la base de datos:

```bash
# Con psql
psql -U postgres -c "CREATE DATABASE api_correos;"

# O con DBeaver/pgAdmin - GUI para PostgreSQL
```

### 5. Ejecutar migraciones

Las migraciones crean la estructura de tablas automáticamente:

```bash
# Ejecutar migraciones en desarrollo
npx prisma migrate dev --name init

# O solo aplicar migraciones sin crear nuevas
npx prisma migrate deploy
```

### 6. Inicializar con datos de prueba (Seed)

Opcionalmente, carga datos de ejemplo:

```bash
npx prisma db seed
```

Esto crea usuarios de prueba como **ronald**, **estilo** y **rdev** con roles ADMIN y USER.

### 7. Iniciar el servidor

```bash
# Modo desarrollo (con hot-reload)
pnpm start:dev

# Modo producción
pnpm build
pnpm start:prod
```

El servidor estará disponible en: **http://localhost:3000**

## 🔐 Autenticación y OAuth

### Autenticación JWT (Predeterminada)

La mayoría de las rutas están protegidas con **JWT Bearer tokens**. Simplemente incluye el token en el header:

```bash
curl -H "Authorization: Bearer <tu-token-aqui>" http://localhost:3000/user
```

El token se obtiene al registrarse o hacer login:

```bash
# Registro
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "ronald",
    "email": "ronald@cs.dev",
    "contrasena": "Ronald@1234",
    "confirmaContrasena": "Ronald@1234"
  }'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ronald@cs.dev",
    "contrasena": "Ronald@1234"
  }'
```

### OAuth Multi-Proveedor (Google, Discord, GitHub)

Si quieres agregar autenticación con **Google** y **Discord** además de GitHub, la carpeta `oauth-providers-setup/` tiene todo completamente documentado y automatizado.

#### ¿Por qué separar OAuth en otra carpeta?

Decidimos mantenerlo separado porque:

1. **Es opcional** - No es necesario para usar la API básica
2. **Requiere configuración externa** - Necesitas crear aplicaciones en Google/Discord
3. **Mantiene el código limpio** - El proyecto principal es más simple de entender
4. **Fácil de seguir** - Cada paso está documentado por separado

#### Primeros Pasos con OAuth

Si quieres agregar Google y Discord OAuth, sigue estos pasos:

```bash
# 1. Entra a la carpeta OAuth
cd oauth-providers-setup

# 2. Lee el archivo de inicio (2 minutos)
cat START_HERE.md

# 3. Si quieres ir rápido, sigue QUICK_START.md
cat QUICK_START.md

# 4. Para entender todo en detalle, lee INTEGRATION.md
cat INTEGRATION.md

# 5. Ejecuta el script de instalación automática
chmod +x install.sh
./install.sh
```

#### Lo que hace el script automático

- ✅ Instala todas las dependencias necesarias
- ✅ Copia las estrategias OAuth a `src/auth/strategies/`
- ✅ Copia los guards a `src/guard/`
- ✅ Crea un `.env` con variables de ejemplo
- ✅ Te guía con los pasos manuales pendientes

#### Después de ejecutar el script

Necesitarás:

1. **Crear aplicaciones OAuth** en Google y Discord (ver `INTEGRATION.md` para detalles)
2. **Editar 3 archivos** manualmente (copiar fragmentos de código)
3. **Configurar `.env`** con tus credenciales
4. **Compilar y probar** las nuevas rutas

El tiempo total es aproximadamente **20-30 minutos**.

---

## 📊 Paginación y Búsqueda

### Concepto General

La API utiliza **paginación offset/limit** con búsqueda **case-insensitive** en usuarios, roles y aplicaciones.

### Parámetros de Paginación

| Parámetro | Tipo   | Rango      | Predeterminado | Descripción          |
| --------- | ------ | ---------- | -------------- | -------------------- |
| `page`    | number | ≥ 1        | 1              | Número de página     |
| `limit`   | number | 1-100      | 10             | Elementos por página |
| `search`  | string | cualquiera | -              | Término de búsqueda  |

### Respuesta de Paginación

```json
{
  "data": [
    {
      "id": "uuid",
      "username": "ronald",
      "email": "ronald@cs.dev",
      "telefono": "+34 600 123 456",
      "createdAt": "2025-01-15T10:00:00Z",
      "updatedAt": "2025-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "pageSize": 10,
    "totalItems": 45,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPreviousPage": false,
    "startIndex": 0,
    "endIndex": 9
  }
}
```

### Campos Buscables

#### Usuarios

- Username
- Email
- Teléfono

#### Roles

- Nombre

#### Aplicaciones

- Nombre
- Client ID

### Ejemplos de Búsqueda

```bash
# Primera página (10 usuarios)
GET /user?page=1&limit=10

# Buscar usuario "ronald"
GET /user?search=ronald&page=1&limit=10

# Buscar por email
GET /user?search=ronald@cs.dev

# Segunda página con búsqueda
GET /user?search=estilo&page=2&limit=5

# Buscar roles con "ADMIN"
GET /roles?search=ADMIN&page=1&limit=10

# Buscar aplicaciones
GET /aplication?search=newsletter&page=1&limit=10
```

---

## 📚 Documentación de Rutas

### 🔓 Rutas Públicas (Sin autenticación)

```
GET  /        - Información del servicio
POST /auth/register - Registro de usuario
POST /auth/login    - Login de usuario
GET  /auth/github   - Autenticación GitHub (redirect)
GET  /auth/github/callback - Callback GitHub
```

### 🔐 Autenticación

#### Registro

```http
POST /auth/register
Content-Type: application/json

{
  "username": "ronald",
  "email": "ronald@cs.dev",
  "telefono": "+34 600 123 456",
  "contrasena": "Ronald@1234",
  "confirmaContrasena": "Ronald@1234"
}
```

**Respuesta (201):**

```json
{
  "id": "uuid",
  "username": "ronald",
  "email": "ronald@cs.dev",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "ronald@cs.dev",
  "contrasena": "Ronald@1234"
}
```

**Respuesta (200):**

```json
{
  "id": "uuid",
  "username": "ronald",
  "email": "ronald@cs.dev",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Obtener Perfil Actual

```http
GET /auth/profile
Authorization: Bearer <token>
```

**Respuesta (200):**

```json
{
  "id": "uuid",
  "username": "ronald",
  "email": "ronald@cs.dev",
  "telefono": "+34 600 123 456",
  "roleName": "ADMIN",
  "createdAt": "2025-01-15T10:00:00Z",
  "updatedAt": "2025-01-15T10:00:00Z"
}
```

---

### 👥 Usuarios

#### Listar Usuarios (Paginado)

```http
GET /user?page=1&limit=10&search=ronald
Authorization: Bearer <token>
```

**Respuesta (200):**

```json
{
  "data": [
    {
      "id": "uuid-ronald",
      "username": "ronald",
      "email": "ronald@cs.dev",
      "telefono": "+34 600 123 456",
      "roleName": "ADMIN",
      "createdAt": "2025-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "pageSize": 10,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

#### Obtener Usuario por ID

```http
GET /user/:id
Authorization: Bearer <token>
```

#### Crear Usuario

```http
POST /user
Authorization: Bearer <token>
Content-Type: application/json
X-Roles: ADMIN

{
  "username": "estilo",
  "email": "estilo@cs.dev",
  "telefono": "+34 600 234 567",
  "roleName": "USER"
}
```

#### Actualizar Usuario

```http
PUT /user/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "ronald_nuevo@cs.dev",
  "telefono": "+34 600 111 222"
}
```

#### Eliminar Usuario

```http
DELETE /user/:id
Authorization: Bearer <token>
```

---

### 🔑 Roles

#### Listar Roles (Paginado)

```http
GET /roles?page=1&limit=10
Authorization: Bearer <token>
```

#### Buscar Rol Específico

```http
GET /roles?search=ADMIN&page=1&limit=10
Authorization: Bearer <token>
```

#### Obtener Rol por ID

```http
GET /roles/:id
Authorization: Bearer <token>
```

#### Crear Rol

```http
POST /roles
Authorization: Bearer <token>
Content-Type: application/json
X-Roles: ADMIN

{
  "name": "MODERATOR"
}
```

#### Actualizar Rol

```http
PUT /roles/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "SUPER_MODERATOR"
}
```

#### Eliminar Rol

```http
DELETE /roles/:id
Authorization: Bearer <token>
```

---

### 📱 Aplicaciones

#### Listar Aplicaciones (Paginado)

```http
GET /aplication?page=1&limit=10&search=newsletter
Authorization: Bearer <token>
```

#### Crear Aplicación

```http
POST /aplication
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Mi App Newsletter",
  "userId": "uuid-ronald"
}
```

**Respuesta (201):**

```json
{
  "id": "uuid",
  "name": "Mi App Newsletter",
  "clientId": "client_123abc",
  "secretKey": "secret_xyz789",
  "status": "ACTIVE",
  "userId": "uuid-ronald",
  "createdAt": "2025-01-15T10:00:00Z"
}
```

#### Desactivar Aplicación

```http
POST /aplication/inactive/:id
Authorization: Bearer <token>
```

#### Suspender Aplicación

```http
POST /aplication/suspend/:id
Authorization: Bearer <token>
```

#### Eliminar Aplicación

```http
DELETE /aplication/:id
Authorization: Bearer <token>
```

---

### 📧 Envío de Correos

Todos los endpoints de correo requieren autenticación por API Key.

#### Enviar Correo Simple

```http
POST /mail
X-Client-Id: client_123abc
X-Secret-Key: secret_xyz789
Content-Type: application/json

{
  "to": "ronald@cs.dev",
  "subject": "Hola desde la API",
  "text": "Este es un correo de prueba"
}
```

#### Enviar Correo HTML

```http
POST /mail
X-Client-Id: client_123abc
X-Secret-Key: secret_xyz789
Content-Type: application/json

{
  "to": "ronald@cs.dev",
  "subject": "Bienvenido a nuestra plataforma",
  "html": "<h1>¡Hola Ronald!</h1><p>Tu cuenta está lista para usar.</p>",
  "replyTo": "soporte@cs.dev"
}
```

#### Enviar a Múltiples Destinatarios

```http
POST /mail
X-Client-Id: client_123abc
X-Secret-Key: secret_xyz789
Content-Type: application/json

{
  "to": ["ronald@cs.dev", "estilo@cs.dev", "rdev@cs.dev"],
  "cc": "supervisor@cs.dev",
  "bcc": "archivo@empresa.com",
  "subject": "Newsletter de Octubre 2025",
  "html": "<h2>Boletín de Noticias</h2><p>Contenido del newsletter...</p>"
}
```

#### Enviar con Adjuntos

```http
POST /mail
X-Client-Id: client_123abc
X-Secret-Key: secret_xyz789
Content-Type: application/json

{
  "to": "ronald@cs.dev",
  "subject": "Tu factura adjunta",
  "html": "<p>Aquí está tu factura del mes:</p>",
  "attachments": [
    {
      "filename": "factura_octubre.pdf",
      "path": "/home/user/documents/factura.pdf"
    }
  ]
}
```

---

## 💡 Ejemplos de Uso Completos

### Ejemplo 1: Flujo Completo con ronald

```bash
# 1. Registro de ronald
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "ronald",
    "email": "ronald@cs.dev",
    "telefono": "+34 600 123 456",
    "contrasena": "Ronald@1234",
    "confirmaContrasena": "Ronald@1234"
  }'

# 2. Guardar token
export TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# 3. Obtener perfil
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer $TOKEN"

# 4. Listar usuarios (con paginación)
curl -X GET "http://localhost:3000/user?page=1&limit=10" \
  -H "Authorization: Bearer $TOKEN"

# 5. Buscar usuario "estilo"
curl -X GET "http://localhost:3000/user?search=estilo&page=1&limit=10" \
  -H "Authorization: Bearer $TOKEN"

# 6. Crear aplicación
curl -X POST http://localhost:3000/aplication \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mi App Newsletter",
    "userId": "uuid-ronald"
  }'

# 7. Enviar correo con la aplicación
curl -X POST http://localhost:3000/mail \
  -H "X-Client-Id: client_abc123" \
  -H "X-Secret-Key: secret_xyz789" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "ronald@cs.dev",
    "subject": "¡Hola Ronald!",
    "html": "<h1>Correo desde la API</h1>"
  }'
```

### Ejemplo 2: Buscar y Paginar Usuarios

```bash
export TOKEN="your-token-here"

# Página 1 (10 usuarios)
curl -X GET "http://localhost:3000/user?page=1&limit=10" \
  -H "Authorization: Bearer $TOKEN"

# Buscar "ronald"
curl -X GET "http://localhost:3000/user?search=ronald&page=1&limit=10" \
  -H "Authorization: Bearer $TOKEN"

# Buscar por email
curl -X GET "http://localhost:3000/user?search=ronald@cs.dev" \
  -H "Authorization: Bearer $TOKEN"
```

### Ejemplo 3: Team Newsletter

```bash
export CLIENT_ID="client_abc123"
export SECRET_KEY="secret_xyz789"

# Enviar a ronald, estilo y rdev
curl -X POST http://localhost:3000/mail \
  -H "X-Client-Id: $CLIENT_ID" \
  -H "X-Secret-Key: $SECRET_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": ["ronald@cs.dev", "estilo@cs.dev", "rdev@cs.dev"],
    "subject": "Newsletter - Octubre 2025",
    "html": "<h2>Boletín de Noticias</h2><p>Resumen del mes...</p>"
  }'
```

---

## 📦 Colección de Postman

La API incluye una colección completa de Postman para testing.

### Instalación

1. **Descargar la colección:**
   - Archivo: `Postman_Collection.json`

2. **Importar en Postman:**
   - Abre Postman
   - Haz clic en "Import"
   - Selecciona el archivo `Postman_Collection.json`
   - Confirma la importación

3. **Configurar variables:**

   | Variable     | Valor Ejemplo            |
   | ------------ | ------------------------ |
   | `base_url`   | `http://localhost:3000`  |
   | `token`      | _Del login_              |
   | `user_id`    | _Del endpoint GET /user_ |
   | `client_id`  | _Al crear aplicación_    |
   | `secret_key` | _Al crear aplicación_    |

4. **Ejemplos inclusos:**
   - Todos los endpoints pre-configurados
   - Usuarios: **ronald**, **estilo**, **rdev**
   - Variables dinámicas automáticas

---

## � Seguridad

### Tipos de Autenticación

La API utiliza tres niveles de seguridad según el tipo de ruta:

#### 1. **Rutas Públicas** (@Public)

Algunas rutas no requieren autenticación:

```
POST /auth/register - Registro de usuario
POST /auth/login - Login de usuario
GET /auth/profile - Ver perfil (requiere JWT en header)
```

#### 2. **Rutas Protegidas con JWT** (Predeterminado)

La mayoría de rutas requieren un token JWT válido:

```bash
curl -H "Authorization: Bearer <token>" http://localhost:3000/user
```

**Guards incluidos:**

- `@AuthGuard()` - Valida token JWT
- `@UseGuards(AuthGuard)` - Protege una ruta específica
- `@Roles('ADMIN')` - Restringe a ciertos roles
- `@User()` - Inyecta usuario autenticado en los parámetros

#### 3. **Rutas Protegidas con API Key** (Para Correos)

El endpoint de envío de correos usa credenciales de aplicación:

```bash
curl -X POST http://localhost:3000/mail \
  -H "X-Client-Id: client_abc123" \
  -H "X-Secret-Key: secret_xyz789"
```

Este sistema permite que diferentes aplicaciones envíen correos sin compartir la contraseña del usuario.

### Características de Seguridad

✅ **JWT Tokens** con expiración de 24 horas  
✅ **Contraseñas hasheadas** con bcrypt  
✅ **Validación de email** desde OAuth  
✅ **API Keys seguras** para aplicaciones  
✅ **CORS configurado** para orígenes específicos  
✅ **Logging de eventos** de seguridad  
✅ **Type-safety** - Sin `any` en TypeScript  
✅ **Validación automática** de DTOs

### Guards Disponibles

En la carpeta `src/guard/` encontrarás:

- **`auth.guard.ts`** - Valida JWT y autorización global
- **`github.guard.ts`** - Autenticación con GitHub OAuth
- **`google.guard.ts`** - Autenticación con Google OAuth (si lo instalaste)
- **`discord.guard.ts`** - Autenticación con Discord OAuth (si lo instalaste)
- **`mail.guard.ts`** - Protección de emails con API Key

### Decoradores de Seguridad

Puedes usar estos decoradores en tus controladores:

```typescript
import { Public } from './guard/public.decorator';
import { Roles } from './guard/roles.decorator';
import { User } from './guard/user.decorator';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  // Ruta pública - sin autenticación
  @Get('about')
  @Public()
  getAbout() {}

  // Ruta solo para ADMIN
  @Post('create')
  @Roles('ADMIN')
  createUser() {}

  // Ruta para ADMIN o USER - inyecta usuario autenticado
  @Get('profile')
  @Roles('ADMIN', 'USER')
  getProfile(@User() user: User) {
    return user;
  }

  // Solo el email del usuario
  @Get('email')
  getEmail(@User('email') email: string) {}
}
```

### Variables de Entorno de Seguridad

Recuerda cambiar estos valores en producción:

```env
# ⚠️ IMPORTANTE: Cambia esto en producción
JWT_SECRET="una-clave-muy-larga-y-aleatoria-minimo-32-caracteres"

# ⚠️ Usa HTTPS en producción
CORS_ORIGIN="https://tu-dominio.com"

# ⚠️ Credenciales reales en producción
SMTP_USER="tu-email-real@gmail.com"
SMTP_PASS="tu-contraseña-de-app"
```

---

## 📁 Estructura del Proyecto

```
api-correos/
├── 📖 README.md                          ← Estás aquí
├── 📖 POSTMAN_IMPORT.md                  ← Cómo importar en Postman
├── 📖 SETUP_COMPLETADO.md                ← Resumen de configuración
│
├── oauth-providers-setup/                ← 🔐 Setup OAuth (Google, Discord)
│   ├── START_HERE.md                     Empieza aquí para OAuth
│   ├── QUICK_START.md                    Guía rápida (5 min)
│   ├── INTEGRATION.md                    Guía completa (30 min)
│   ├── TECHNICAL_NOTES.md                Detalles técnicos
│   ├── STRUCTURE.md                      Estructura de archivos
│   ├── install.sh                        Script automático
│   ├── .env.example                      Variables de entorno
│   ├── strategies/
│   │   ├── google.strategy.txt
│   │   └── discord.strategy.txt
│   └── guards/
│       ├── google.guard.txt
│       └── discord.guard.txt
│
├── prisma/                               ← 🗄️ Base de datos
│   ├── schema.prisma                     Definición de tablas
│   ├── migrations/                       Historial de cambios BD
│   └── seed/                             Datos iniciales
│
├── src/
│   ├── main.ts                           Punto de entrada
│   ├── app.module.ts                     Módulo principal
│   ├── app.controller.ts                 Rutas raíz
│   ├── app.service.ts                    Lógica raíz
│   │
│   ├── 🔐 guard/                         ← Guards de seguridad
│   │   ├── auth.guard.ts                 Validación JWT global
│   │   ├── github.guard.ts               GitHub OAuth
│   │   ├── google.guard.ts               Google OAuth (si lo instalaste)
│   │   ├── discord.guard.ts              Discord OAuth (si lo instalaste)
│   │   ├── mail.guard.ts                 Protección de emails
│   │   ├── public.decorator.ts           @Public() para rutas públicas
│   │   ├── roles.decorator.ts            @Roles() para roles específicos
│   │   └── user.decorator.ts             @User() para inyectar usuario
│   │
│   ├── 👤 auth/                          ← Autenticación
│   │   ├── auth.controller.ts            Rutas de login/registro
│   │   ├── auth.service.ts               Lógica JWT y OAuth
│   │   ├── auth.module.ts                Configuración
│   │   ├── auth.dto.ts                   Validación de datos
│   │   └── strategies/
│   │       ├── jwt.strategy.ts           JWT strategy (Passport)
│   │       ├── github.strategy.ts        GitHub OAuth strategy
│   │       ├── google.strategy.ts        Google OAuth (si lo instalaste)
│   │       └── discord.strategy.ts       Discord OAuth (si lo instalaste)
│   │
│   ├── 👥 user/                          ← Gestión de usuarios
│   │   ├── user.controller.ts            CRUD de usuarios (con paginación)
│   │   ├── user.service.ts               Lógica de búsqueda/paginación
│   │   ├── user.module.ts                Configuración
│   │   └── user.dto.ts                   Validación
│   │
│   ├── 🔑 roles/                         ← Sistema de roles
│   │   ├── roles.controller.ts           CRUD de roles (con paginación)
│   │   ├── roles.service.ts              Lógica de roles
│   │   ├── roles.module.ts               Configuración
│   │   └── roles.dto.ts                  Validación
│   │
│   ├── 📱 aplication/                    ← Gestión de aplicaciones
│   │   ├── aplication.controller.ts      CRUD de apps
│   │   ├── aplication.service.ts         Lógica de aplicaciones
│   │   ├── aplication.module.ts          Configuración
│   │   └── aplication.dto.ts             Validación
│   │
│   ├── 📧 mail/                          ← Envío de correos SMTP
│   │   ├── mail.controller.ts            Endpoint para enviar
│   │   ├── mail.service.ts               Lógica SMTP
│   │   ├── mail.module.ts                Configuración
│   │   ├── mail.interface.ts             Tipos de datos
│   │   └── mail.dto.ts                   Validación
│   │
│   ├── 🧩 shared/                        ← Código compartido
│   │   ├── pagination.dto.ts             ✨ Sistema de paginación
│   │   ├── search-filters.ts             ✨ Filtros type-safe
│   │   ├── generators.ts                 Generadores de datos
│   │   ├── roles.ts                      Enumeración de roles
│   │   ├── all-exceptions-filter.ts      Manejo de errores global
│   │   └── ...
│   │
│   └── 🗄️ context/
│       └── db-context.ts                 Cliente de Prisma
│
├── test/                                 ← Tests e2e
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── .env.example                          Plantilla de variables
├── .env                                  Variables reales (NO commitar)
├── package.json                          Dependencias
├── tsconfig.json                         Configuración TypeScript
├── eslint.config.mjs                     Linter config
└── Postman_Collection.json               ✨ Colección para testing
```

### Características Destacadas

**✨ Sistema de Paginación (`shared/pagination.dto.ts`)**

- Paginación offset/limit
- Búsqueda case-insensitive
- Metadatos completos (totalPages, hasNextPage, etc.)
- Type-safe con generics

**✨ Guards Completos (`guard/`)**

- @Public() - Rutas sin autenticación
- @Roles() - Control de roles
- @User() - Inyección de usuario
- Protección de emails con API Key

**✨ Colección de Postman**

- Todos los endpoints pre-configurados
- Ejemplos con usuarios reales
- Variables automáticas
- Tests rápidos para cada ruta

### Cómo Navegar el Código

1. **Entender estructura:** Lee `src/app.module.ts`
2. **Ver endpoints:** Cada carpeta tiene un `*.controller.ts`
3. **Entender lógica:** Cada `*.service.ts` tiene la lógica
4. **Ver validación:** Los `*.dto.ts` definen qué datos aceptan
5. **Guards y seguridad:** `guard/` contiene todo

---

## 🚀 ¡Listo para usar!

Tu API está completamente configurada con:

✅ Autenticación JWT y OAuth multi-proveedor  
✅ Paginación y búsqueda en usuarios, roles y aplicaciones  
✅ Envío de correos SMTP con múltiples destinatarios  
✅ Sistema flexible de roles y permisos  
✅ Colección de Postman lista para importar  
✅ Type-safety completo sin `any`  
✅ Documentación completa y ejemplos reales

### Próximos Pasos

1. **Prueba la API**

   ```bash
   curl http://localhost:3000  # Verifica que está activa
   ```

2. **Importa la colección en Postman**
   - Ver: `POSTMAN_IMPORT.md`

3. **Agrega OAuth** (Opcional)

   ```bash
   cd oauth-providers-setup
   cat START_HERE.md
   ```

4. **Deploya en producción**
   - Cambia variables de entorno
   - Configura HTTPS y CORS
   - Usa variables secretas seguras

---

## 🆘 Solución de Problemas

### Error: "Base de datos no existe"

```
error: database "api_correos" does not exist
```

**Solución:**

```bash
# Crear la base de datos
psql -U postgres -c "CREATE DATABASE api_correos;"

# O actualizar DATABASE_URL en .env
```

### Error: "Variable de entorno indefinida"

```
Error: Cannot read property of undefined (reading 'find')
```

**Solución:**

1. Verifica que el archivo `.env` existe en la raíz
2. Reinicia el servidor después de actualizar `.env`
3. Recarga las variables: `source .env`

Usa este template de `.env` si falta algo:

```bash
cp .env.example .env
# Edita .env con tus valores
```

### Error: "Puerto 3000 ya está en uso"

```
EADDRINUSE: address already in use :::3000
```

**Solución:**

```bash
# Ver qué proceso está usando el puerto
lsof -i :3000

# Matar el proceso (si es Node, normalmente PID)
kill -9 <PID>

# O cambiar el puerto en .env
PORT=3001
```

### Error: "Módulo passport no encontrado"

```
Cannot find module 'passport'
```

**Solución:**

```bash
# Reinstalar dependencias
pnpm install
# O
npm install

# Si aún no funciona, limpiar caché
pnpm install --force
```

### Error: "JWT token inválido"

```
Unauthorized: Invalid token
```

**Causas comunes:**

- Token expirado (24 horas)
- Token malformado o incompleto
- Secret key diferente en .env

**Solución:**

1. Obtén un token nuevo con login/registro
2. Asegúrate de usar `Bearer <token>` correctamente
3. Verifica que `JWT_SECRET` sea el mismo que cuando se creó

### Problemas con OAuth (Google/Discord)

Consulta los documentos en `oauth-providers-setup/`:

- **QUICK_START.md** - Solución rápida (5 min)
- **INTEGRATION.md** - Troubleshooting detallado
- **TECHNICAL_NOTES.md** - Errores específicos

### Base de datos con datos antiguos

Si necesitas resetear todo:

```bash
# ⚠️ Esto elimina todos los datos
npx prisma migrate reset

# Confirma escribiendo "y" si se pregunta
```

Luego carga los datos de ejemplo:

```bash
npx prisma db seed
```

### El servidor no inicia

**Pasos a seguir:**

```bash
# 1. Verifica la conexión a PostgreSQL
psql -U postgres -d postgres -c "SELECT version();"

# 2. Verifica que .env está bien
cat .env | grep DATABASE_URL

# 3. Limpia instalación
rm -rf node_modules
pnpm install

# 4. Crea la BD si no existe
npx prisma migrate deploy

# 5. Intenta nuevamente
pnpm start:dev
```

Si aún hay problemas, revisa los logs completos y busca en:

- Documentación de NestJS
- Issues del repositorio
- Stack Overflow

### Problemas de CORS

```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solución:**

En `.env`:

```env
# Para desarrollo (permite todo)
CORS_ORIGIN="*"

# Para producción (específico)
CORS_ORIGIN="https://tudominio.com,https://api.tudominio.com"
```

O editando `src/main.ts`:

```typescript
app.enableCors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
});
```

### Ayuda Adicional

- **Documentación de NestJS**: https://docs.nestjs.com/
- **Documentación de Prisma**: https://www.prisma.io/docs/
- **Problemas OAuth**: Abre `oauth-providers-setup/TECHNICAL_NOTES.md`
- **Issues del repositorio**: GitHub Issues

---

## 📝 Notas Finales

- Este proyecto es completamente open-source bajo licencia **MIT**
- Contribuciones y pull requests son bienvenidas
- Para reportar bugs, abre un issue en GitHub
- La documentación se actualiza regularmente

¡Que disfrutes usando esta API! 🎉

---

## 📋 Licencia

Este proyecto está bajo la licencia **MIT** (Open Source).

**¿Qué puedo hacer?**

- ✅ Usar el código libremente
- ✅ Modificar el código
- ✅ Distribuir (con o sin cambios)
- ✅ Usar comercialmente

**¿Qué debo hacer?**

- ⚠️ **DEBES** dar crédito a `2004Style` (autor original)
- ⚠️ **DEBES** incluir la licencia en tus distribuciones
- ⚠️ **DEBES** incluir aviso de copyright

**Lo que NO viene**

- ❌ Garantía de ningún tipo
- ❌ Responsabilidad del autor por problemas

### Cómo dar crédito

Si usas este proyecto, incluye en tu `README.md`:

```markdown
## Licencia

Basado en: API REST - Sistema de Gestión de Correos (2004Style)
Licencia: MIT - https://github.com/2004Style/api-correos
```

**Archivo completo:** [`LICENSE`](./LICENSE)  
**Más información:** https://opensource.org/licenses/MIT

---

**Última actualización:** 1 de noviembre de 2025
