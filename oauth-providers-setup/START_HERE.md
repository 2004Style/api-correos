#!/usr/bin/env markdown

# 🎯 INICIO RÁPIDO - Carpeta OAuth Multi-Proveedor

> **Última actualización:** 1 de Noviembre de 2025

## 📌 Estás aquí: `oauth-providers-setup/`

Esta carpeta contiene **TODO lo necesario** para agregar autenticación OAuth con Google y Discord a tu aplicación NestJS.

---

## ⚡ En 2 Minutos

```bash
# Desde la raíz del proyecto
cd oauth-providers-setup

# Ejecutar instalación automática
chmod +x install.sh
./install.sh
```

El script hará todo por ti automáticamente.

---

## 📚 Documentación (Elige Tu Nivel)

### 🚀 **RÁPIDO** (5 minutos)

Quieres hacerlo YA mismo.

👉 Lee: **[QUICK_START.md](./QUICK_START.md)**

### 📖 **COMPLETO** (30 minutos)

Quieres entender cada paso.

👉 Lee: **[INTEGRATION.md](./INTEGRATION.md)**

### 🔬 **TÉCNICO** (profesionales)

Quieres entender cómo funciona internamente.

👉 Lee: **[TECHNICAL_NOTES.md](./TECHNICAL_NOTES.md)**

### 🗂️ **ESTRUCTURA** (orientación)

¿Qué archivo es qué?

👉 Lee: **[STRUCTURE.md](./STRUCTURE.md)**

### ❓ **GENERAL** (resumen)

¿Qué es esta carpeta?

👉 Lee: **[README.md](./README.md)**

---

## 📂 Lo Que Encontrarás Aquí

| Archivo                | Propósito                   | Acción          |
| ---------------------- | --------------------------- | --------------- |
| **install.sh**         | Automatiza todo             | ▶️ Ejecuta      |
| **QUICK_START.md**     | Pasos en 5 min              | 📖 Lee primero  |
| **INTEGRATION.md**     | Guía completa               | 📖 Referencia   |
| **TECHNICAL_NOTES.md** | Detalles técnicos           | 🔬 Consulta     |
| **STRUCTURE.md**       | Guía de archivos            | 🗂️ Navega       |
| **README.md**          | Overview general            | 📄 Resumen      |
| **.env.example**       | Variables de config         | ⚙️ Copia a .env |
| **strategies/**        | Código OAuth Google/Discord | 📁 Carpeta      |
| **guards/**            | Protección de rutas         | 📁 Carpeta      |

---

## 🎬 Comienza Aquí

### Opción A: Automático (Recomendado)

```bash
# 1. Ejecutar script
chmod +x install.sh
./install.sh

# El script te guiará por todo
```

### Opción B: Manual

```bash
# 1. Leer instrucciones rápidas
# Lee: QUICK_START.md

# 2. Instalar dependencias
npm install passport-google-oauth20 passport-discord

# 3. Copiar archivos (ver INTEGRATION.md)
# 4. Editar 3 archivos del proyecto (ver QUICK_START.md)
# 5. Configurar .env
# 6. Compilar y probar
```

---

## 📋 Archivos a Copiar/Editar

### ✅ Se Copian Automáticamente (install.sh)

```
google.strategy.ts  ← strategies/google.strategy.txt
discord.strategy.ts ← strategies/discord.strategy.txt
google.guard.ts     ← guards/google.guard.txt
discord.guard.ts    ← guards/discord.guard.txt
.env                ← .env.example
```

### ✏️ Se Editan Manualmente

```
src/auth/auth.service.ts      ← auth.service-methods.txt
src/auth/auth.controller.ts   ← auth.controller-methods.txt
src/auth/auth.module.ts       ← auth.module-update.txt
```

---

## 🔑 Antes de Empezar

### Necesitas Crear:

1. **Google OAuth**
   - [Google Cloud Console](https://console.cloud.google.com/)
   - OAuth 2.0 Client ID para Web Application

2. **Discord OAuth**
   - [Discord Developer Portal](https://discord.com/developers/applications)
   - New Application → OAuth2

Ver detalles en: [INTEGRATION.md → Creación de Aplicaciones OAuth](./INTEGRATION.md)

---

## ⚙️ Configuración Rápida

### 1. Variables de Entorno

Copia `.env.example` a `.env` y rellena:

```env
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

DISCORD_CLIENT_ID=xxx
DISCORD_CLIENT_SECRET=xxx
DISCORD_CALLBACK_URL=http://localhost:3000/auth/discord/callback

FRONTEND_URL=http://localhost:3001
```

### 2. Rutas Disponibles

```
GET  /auth/google              # Login con Google
GET  /auth/google/callback     # Callback
GET  /auth/discord             # Login con Discord
GET  /auth/discord/callback    # Callback
```

---

## ✨ Características

- ✅ Soporte multi-proveedor OAuth (Google, Discord, GitHub)
- ✅ Creación automática de usuarios
- ✅ Generación de JWT tokens
- ✅ Logging detallado
- ✅ Manejo de errores robusto
- ✅ Compatible con npm, pnpm, yarn
- ✅ Fácil de extender a otros proveedores

---

## 🆘 Ayuda Rápida

### Error: "Módulo no encontrado"

```bash
npm install passport-google-oauth20 passport-discord @types/passport-google-oauth20
```

### Error: "Variable de entorno no definida"

- Verifica archivo `.env`
- Asegúrate de tener todas las variables
- Reinicia el servidor

### Callback no funciona

- Verifica que URL callback coincida exactamente
- Incluye protocolo y puerto: `http://localhost:3000`
- Revisa credenciales en Google/Discord

Ver más en: [TECHNICAL_NOTES.md → Troubleshooting](./TECHNICAL_NOTES.md)

---

## 🚀 Próximos Pasos

1. ✅ Lee **QUICK_START.md** (3 minutos)
2. ✅ Ejecuta `./install.sh` (1 minuto)
3. ✅ Crea credenciales OAuth (10 minutos)
4. ✅ Edita 3 archivos manualmente (5 minutos)
5. ✅ Configura `.env` (2 minutos)
6. ✅ Compila y prueba (2 minutos)

**Total: ~25 minutos**

---

## 📞 Recursos Externos

- [Passport.js](http://www.passportjs.org/)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [Discord OAuth](https://discord.com/developers/docs/topics/oauth2)
- [NestJS Auth](https://docs.nestjs.com/techniques/authentication)

---

## 🎯 Tu Decisión

**¿Qué haces ahora?**

👉 Opción 1: Ejecuta `./install.sh` (automático)

👉 Opción 2: Lee `QUICK_START.md` primero

👉 Opción 3: Lee `INTEGRATION.md` para detalles

---

**¿Preguntas?** Consulta los documentos de esta carpeta o revisa los comentarios en el código.

¡Bienvenido! 🎉
