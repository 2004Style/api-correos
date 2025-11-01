# 📚 Índice Completo de Documentación

> Este archivo te ayuda a navegar toda la documentación del proyecto de forma organizada.

## 🎯 ¿Por Dónde Empiezo?

### 1️⃣ Si es la PRIMERA VEZ

Lee en este orden:

1. **`README.md`** (este proyecto)
   - Visión general
   - Instalación rápida
   - Características principales

2. **`POSTMAN_IMPORT.md`**
   - Cómo probar la API con Postman
   - Variables automáticas
   - Flujo de pruebas

3. **Comienza a experimentar**
   - Abre Postman
   - Importa la colección
   - Prueba los endpoints

### 2️⃣ Si quieres AGREGAR OAUTH (Google/Discord)

Ve a la carpeta `oauth-providers-setup/` y sigue este orden:

1. **`START_HERE.md`** (2 minutos)
   - Visión rápida

2. **`QUICK_START.md`** (5 minutos)
   - Pasos rápidos

3. **`INTEGRATION.md`** (30 minutos)
   - Guía completa con detalles

4. **`TECHNICAL_NOTES.md`** (consulta según necesites)
   - Detalles técnicos
   - Troubleshooting

### 3️⃣ Si ya CONOCES el proyecto

- Consulta las secciones específicas del `README.md`
- Revisa la estructura en `README.md` → Estructura del Proyecto
- Mira ejemplos en `README.md` → Ejemplos de Uso

---

## 📖 Documentación por Tema

### Autenticación

| Tema                         | Ubicación                                  | Tiempo |
| ---------------------------- | ------------------------------------------ | ------ |
| Autenticación JWT            | `README.md` → Autenticación y OAuth        | 5 min  |
| OAuth con GitHub             | `README.md` → Autenticación y OAuth        | 5 min  |
| Agregar Google OAuth         | `oauth-providers-setup/QUICK_START.md`     | 5 min  |
| Agregar Discord OAuth        | `oauth-providers-setup/QUICK_START.md`     | 5 min  |
| Entender cómo funciona OAuth | `oauth-providers-setup/TECHNICAL_NOTES.md` | 15 min |
| Guards y protección          | `README.md` → Seguridad                    | 10 min |

### Paginación y Búsqueda

| Tema                 | Ubicación                           | Tiempo |
| -------------------- | ----------------------------------- | ------ |
| Usar paginación      | `README.md` → Paginación y Búsqueda | 10 min |
| Ejemplos de búsqueda | `README.md` → Ejemplos de Uso       | 5 min  |

### Usuarios y Roles

| Tema               | Ubicación                            | Tiempo |
| ------------------ | ------------------------------------ | ------ |
| Gestionar usuarios | `README.md` → Documentación de Rutas | 10 min |
| Usar roles         | `README.md` → Documentación de Rutas | 10 min |

### Envío de Correos

| Tema                    | Ubicación                            | Tiempo |
| ----------------------- | ------------------------------------ | ------ |
| Enviar correos simples  | `README.md` → Documentación de Rutas | 5 min  |
| Correos HTML            | `README.md` → Documentación de Rutas | 5 min  |
| Múltiples destinatarios | `README.md` → Documentación de Rutas | 5 min  |
| Adjuntos                | `README.md` → Documentación de Rutas | 5 min  |

### Seguridad

| Tema                     | Ubicación               | Tiempo |
| ------------------------ | ----------------------- | ------ |
| Tipos de autenticación   | `README.md` → Seguridad | 10 min |
| Guards disponibles       | `README.md` → Seguridad | 10 min |
| Configurar en producción | `README.md` → Seguridad | 15 min |

### Testing y Ejemplos

| Tema                | Ubicación                     | Tiempo |
| ------------------- | ----------------------------- | ------ |
| Importar en Postman | `POSTMAN_IMPORT.md`           | 5 min  |
| Ejemplos curl       | `README.md` → Ejemplos de Uso | 10 min |
| Flujo completo      | `README.md` → Ejemplos de Uso | 15 min |

---

## 📂 Estructura de Documentos

```
Raíz del Proyecto
├── 📄 README.md                          ← EMPIEZA AQUÍ
│                                         Guía principal completa
│
├── 📄 DOCUMENTACION.md                   ← TÚ ESTÁS AQUÍ
│                                         Índice y navegación
│
├── 📄 POSTMAN_IMPORT.md
│                                         Cómo usar Postman
│
├── 📄 SETUP_COMPLETADO.md
│                                         Resumen de configuración
│
└── 📁 oauth-providers-setup/
    ├── 📄 START_HERE.md                  ← Si quieres OAuth
    │                                     Comienza aquí
    │
    ├── 📄 QUICK_START.md
    │                                     Guía de 5 minutos
    │
    ├── 📄 INTEGRATION.md
    │                                     Guía completa (30 min)
    │
    ├── 📄 TECHNICAL_NOTES.md
    │                                     Detalles técnicos
    │
    ├── 📄 STRUCTURE.md
    │                                     Estructura de archivos
    │
    ├── 📄 README.md
    │                                     Overview de OAuth
    │
    ├── 🔧 install.sh
    │                                     Script automático
    │
    ├── ⚙️ .env.example
    │                                     Variables de entorno
    │
    ├── 📁 strategies/
    │   ├── google.strategy.txt
    │   └── discord.strategy.txt
    │
    └── 📁 guards/
        ├── google.guard.txt
        └── discord.guard.txt
```

---

## 🎓 Rutas de Aprendizaje

### 🚀 Ruta Rápida (15 minutos)

Para los apurados:

1. **README.md** - Secciones principales (5 min)
2. **POSTMAN_IMPORT.md** - Importar colección (3 min)
3. **Probar endpoints** en Postman (7 min)

✅ Resultado: Conoces la API y puedes hacer requests básicos

### 📚 Ruta Estándar (1 hora)

Para entender todo:

1. **README.md** - Lectura completa (20 min)
2. **POSTMAN_IMPORT.md** - Configurar Postman (10 min)
3. **Probar ejemplos** en Postman (15 min)
4. **Revisar code** - Estructura (`README.md` → Estructura) (15 min)

✅ Resultado: Comprendes cómo funciona y puedes usarla profesionalmente

### 🔐 Ruta OAuth (45 minutos)

Para agregar Google/Discord:

1. **oauth-providers-setup/START_HERE.md** (5 min)
2. **oauth-providers-setup/QUICK_START.md** (10 min)
3. **Ejecutar install.sh** (5 min)
4. **Crear credenciales** en Google/Discord (15 min)
5. **Editar archivos** manualmente (10 min)

✅ Resultado: OAuth funcionando con Google y Discord

### 🏢 Ruta Profesional (2 horas)

Para deployar en producción:

1. **README.md** - Lectura completa (20 min)
2. **Seguridad** - Revisar en detalle (20 min)
3. **oauth-providers-setup/** - Si usarás OAuth (45 min)
4. **Configuración de producción** - .env y variables (20 min)
5. **Testing** - Postman completo (15 min)

✅ Resultado: Listo para deployar en producción de forma segura

---

## ⚡ Búsqueda Rápida

### "¿Cómo hago X?"

| Pregunta                    | Respuesta                                                  |
| --------------------------- | ---------------------------------------------------------- |
| ¿Cómo registro un usuario?  | `README.md` → Documentación de Rutas → 🔐 Autenticación    |
| ¿Cómo hago login?           | `README.md` → Documentación de Rutas → 🔐 Autenticación    |
| ¿Cómo obtengo un token?     | `README.md` → Autenticación y OAuth → JWT                  |
| ¿Cómo uso OAuth con Google? | `oauth-providers-setup/QUICK_START.md`                     |
| ¿Cómo envío correos?        | `README.md` → Documentación de Rutas → 📧 Envío de Correos |
| ¿Cómo pagino usuarios?      | `README.md` → Paginación y Búsqueda                        |
| ¿Cómo busco usuarios?       | `README.md` → Paginación y Búsqueda → Ejemplos             |
| ¿Cómo creo roles?           | `README.md` → Documentación de Rutas → 🔑 Roles            |
| ¿Cómo protejo una ruta?     | `README.md` → Seguridad → Decoradores                      |
| ¿Qué es un Guard?           | `README.md` → Seguridad → Guards Disponibles               |
| ¿Por qué tengo error X?     | `README.md` → Solución de Problemas                        |
| ¿Cómo importo en Postman?   | `POSTMAN_IMPORT.md`                                        |

---

## 🎯 Decisión Rápida

### Tengo poco tiempo

→ **QUICK_START** en la sección que te interese

### Necesito entenderlo bien

→ Lee el **README principal completo**

### Tengo un problema

→ **Busca en "Solución de Problemas"** al final de README.md

### Quiero agregar OAuth

→ Abre **oauth-providers-setup/ → START_HERE.md**

### Necesito ejemplos

→ **README.md → Ejemplos de Uso Completos**

### Necesito detalles técnicos

→ **oauth-providers-setup/TECHNICAL_NOTES.md**

---

## 📞 Obtener Ayuda

### El documento tiene respuesta

1. Busca en el índice arriba (esta página)
2. Usa Ctrl+F para buscar palabras clave
3. Revisa la sección de Solución de Problemas

### Necesitas más ayuda

1. Revisa los comentarios en el código
2. Consulta la documentación oficial:
   - [NestJS Docs](https://docs.nestjs.com/)
   - [Prisma Docs](https://www.prisma.io/docs/)
   - [Passport.js Docs](http://www.passportjs.org/)
3. Busca en Stack Overflow
4. Abre un issue en GitHub

---

## ✨ Características Destacadas

- ✅ **Documentación entrelazada** - Todo conectado
- ✅ **Múltiples niveles** - Desde rápido hasta profesional
- ✅ **Con ejemplos reales** - Usuarios como ronald, estilo, rdev
- ✅ **Autoexplicativa** - Sin términos confusos
- ✅ **Actualizada** - Última actualización: 1 de noviembre de 2025

---

## 📝 Mapa Mental

```
API de Correos
│
├─ 🚀 Inicio Rápido
│  ├─ Leer README.md (20 min)
│  └─ Probar en Postman (10 min)
│
├─ 🔐 Autenticación
│  ├─ JWT (default)
│  ├─ GitHub OAuth
│  ├─ Google OAuth → oauth-providers-setup/
│  └─ Discord OAuth → oauth-providers-setup/
│
├─ 📊 Datos
│  ├─ Usuarios (con paginación)
│  ├─ Roles (con paginación)
│  └─ Aplicaciones (con paginación)
│
├─ 📧 Correos
│  ├─ Simple
│  ├─ HTML
│  ├─ Múltiples destinatarios
│  └─ Con adjuntos
│
├─ 🛡️ Seguridad
│  ├─ Guards (@AuthGuard, etc.)
│  ├─ Decoradores (@Public, @Roles, @User)
│  └─ API Keys (para correos)
│
├─ 🧪 Testing
│  ├─ Postman (ver POSTMAN_IMPORT.md)
│  ├─ curl (ejemplos en README.md)
│  └─ Tests e2e (test/)
│
└─ 📚 Documentación
   ├─ README.md (principal)
   ├─ DOCUMENTACION.md (tú estás aquí)
   ├─ POSTMAN_IMPORT.md (testing)
   └─ oauth-providers-setup/ (OAuth setup)
```

---

## 📋 Licencia

Este proyecto está bajo **Licencia MIT**. Ver [`LICENSE`](./LICENSE)

Si usas el código, recuerda dar crédito a `2004Style`.

---

## 🎉 ¡Ya Sabes Dónde Buscar!

Usa este documento como **tu brújula** para navegar toda la documentación.

Si necesitas algo específico:

1. Busca en la tabla de temas
2. O usa Ctrl+F para palabras clave
3. O sigue una ruta de aprendizaje completa

**Última actualización:** 1 de noviembre de 2025

---

_Elaborado como guía de navegación central para el proyecto api-correos_
