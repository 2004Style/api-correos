# 🎯 ¡Comienza Aquí!

Bienvenido a la **API de Gestión de Correos, Usuarios y Aplicaciones**. Este archivo te guía por los primeros pasos según tu necesidad.

## 🚦 ¿Cuál es tu Situación?

### ✅ Es mi PRIMERA VEZ en este proyecto

Sigue esto:

1. **Entiende qué es** (2 minutos)
   - Lee la descripción al inicio de [`README.md`](./README.md)

2. **Instala y configura** (10 minutos)
   - Ve a [`README.md`](./README.md) → Sección "Instalación"
   - Sigue paso a paso

3. **Prueba la API** (10 minutos)
   - Lee [`POSTMAN_IMPORT.md`](./POSTMAN_IMPORT.md)
   - Importa la colección en Postman
   - Haz requests a los endpoints

4. **Explora más** (30 minutos)
   - Lee [`README.md`](./README.md) completo
   - Prueba diferentes endpoints en Postman
   - Revisa la estructura en [`README.md`](./README.md) → Estructura del Proyecto

**Total: ~1 hora** ⏱️

---

### ✅ Necesito OAuth con Google/Discord

Antes que nada:

1. ¿Ya instalaste y probaste la API básica?
   - Si NO → Sigue la sección anterior primero
   - Si SÍ → Continúa

Ahora:

2. Entra a la carpeta OAuth

   ```bash
   cd oauth-providers-setup
   ```

3. Lee y sigue el archivo correcto según tu tiempo:
   - **Tengo 5 minutos** → [`QUICK_START.md`](./oauth-providers-setup/QUICK_START.md)
   - **Tengo 30 minutos** → [`INTEGRATION.md`](./oauth-providers-setup/INTEGRATION.md)
   - **Necesito entender todo** → [`START_HERE.md`](./oauth-providers-setup/START_HERE.md)

**Total: ~20-30 minutos** ⏱️

---

### ✅ Solo quiero PROBAR sin instalar nada

Puedes hacerlo en **Postman online**:

1. Abre [Postman en web](https://web.postman.co/)
2. Ve a [`POSTMAN_IMPORT.md`](./POSTMAN_IMPORT.md)
3. Sigue "Opción 2: Copiar JSON Directamente"
4. Prueba los endpoints

Pero necesitarás una API corriendo en `http://localhost:3000` (haz primero los pasos de instalación).

---

### ✅ Necesito AYUDA o tengo un ERROR

1. **Busca en esta página** - Usa Ctrl+F
2. **Revisa el README** - Va a [`README.md`](./README.md) → "Solución de Problemas"
3. **Consulta el índice** - Abre [`DOCUMENTACION.md`](./DOCUMENTACION.md)
4. **Lee comentarios en el código** - Los archivos `.ts` tienen explicaciones

---

## 📂 Archivos Principales

| Archivo                                  | Para Qué                                | Tiempo |
| ---------------------------------------- | --------------------------------------- | ------ |
| **README.md**                            | Guía principal completa                 | 30 min |
| **DOCUMENTACION.md**                     | Índice y navegación por tema            | 5 min  |
| **MAPA_DOCUMENTACION.md**                | Visión general de TODA la documentación | 10 min |
| **POSTMAN_IMPORT.md**                    | Cómo probar con Postman                 | 5 min  |
| **oauth-providers-setup/START_HERE.md**  | Primeros pasos OAuth                    | 2 min  |
| **oauth-providers-setup/QUICK_START.md** | Setup OAuth rápido                      | 5 min  |
| **oauth-providers-setup/INTEGRATION.md** | Setup OAuth completo                    | 30 min |

---

## 🎯 Decisión Rápida

¿Cuál te describe?

### 📝 "Quiero empezar AHORA"

```bash
# 1. Instala siguiendo README.md → Instalación
pnpm install
npx prisma migrate dev --name init
pnpm start:dev

# 2. Abre otra terminal
cd oauth-providers-setup
chmod +x install.sh
./install.sh

# 3. Prueba en Postman
# Ver: POSTMAN_IMPORT.md
```

**Tiempo: ~15 minutos**

### 📖 "Quiero ENTENDER cómo funciona"

```bash
# 1. Lee README.md completo
# 2. Lee DOCUMENTACION.md para orientarte
# 3. Explora el código en src/
# 4. Prueba endpoints en Postman
# 5. Luego: oauth-providers-setup/INTEGRATION.md
```

**Tiempo: ~1-2 horas**

### 🚀 "Necesito esto en PRODUCCIÓN"

```bash
# 1. Sigue los pasos anteriores
# 2. Lee README.md → Seguridad (completo)
# 3. Configura variables de producción en .env
# 4. Usa oauth-providers-setup/ si necesitas OAuth
# 5. Despliega en tu servidor
```

**Tiempo: ~3-4 horas** (según tu experiencia)

### 🤔 "Tengo una PREGUNTA específica"

Busca en esta tabla:

| Pregunta                 | Documento              | Sección                  |
| ------------------------ | ---------------------- | ------------------------ |
| ¿Cómo instalo?           | README.md              | Instalación              |
| ¿Cómo hago login?        | README.md              | Documentación de Rutas   |
| ¿Cómo uso OAuth?         | oauth-providers-setup/ | START_HERE.md            |
| ¿Cómo envío correos?     | README.md              | Documentación de Rutas   |
| ¿Cómo pagino datos?      | README.md              | Paginación y Búsqueda    |
| ¿Cómo pruebo en Postman? | POSTMAN_IMPORT.md      | -                        |
| ¿Tengo un error?         | README.md              | Solución de Problemas    |
| ¿Qué archivos hay?       | DOCUMENTACION.md       | Estructura de Documentos |
| ¿Cómo navego todo?       | DOCUMENTACION.md       | -                        |

---

## 🔑 Conceptos Clave

Antes de empezar, entiende estos 3 conceptos:

### 1. **JWT Tokens** 🎟️

Es como un "ticket" que te da acceso. Obtienes uno al hacer login:

```bash
POST /auth/login → Recibes token
# Luego usas en todas las rutas:
GET /user
Authorization: Bearer <tu-token>
```

**Para entender más:** [`README.md`](./README.md) → Autenticación y OAuth

### 2. **Paginación** 📄

Es dividir resultados en páginas para cargar solo lo necesario:

```bash
GET /user?page=1&limit=10
# Trae 10 usuarios de la página 1
```

**Para entender más:** [`README.md`](./README.md) → Paginación y Búsqueda

### 3. **OAuth** 🔐

Es permitir login con Google/Discord/GitHub:

```bash
GET /auth/google
# Te redirige a Google para autorizar
```

**Para entender más:** [`oauth-providers-setup/START_HERE.md`](./oauth-providers-setup/START_HERE.md)

---

## ⚡ Acciones Rápidas

Copya y pega según necesites:

### Instalar todo

```bash
# Instalar dependencias
pnpm install

# Crear base de datos
psql -U postgres -c "CREATE DATABASE api_correos;"

# Migraciones
npx prisma migrate dev --name init

# Datos de ejemplo (opcional)
npx prisma db seed

# Iniciar
pnpm start:dev
```

### Probar un endpoint

```bash
# Registro
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test",
    "email": "test@example.com",
    "contrasena": "Test@1234",
    "confirmaContrasena": "Test@1234"
  }'

# Obtendrás un token en la respuesta
```

### Agregar OAuth rápido

```bash
cd oauth-providers-setup
chmod +x install.sh
./install.sh

# Luego sigue los pasos del script
```

---

## 📚 Rutas de Documentación

**Elige UNA según tu necesidad:**

### 🚀 Ruta Rápida (15 min)

```
README.md (inicio)
    ↓
Instalación → Inicio Rápido
    ↓
POSTMAN_IMPORT.md
    ↓
Probar en Postman
```

### 📖 Ruta Estándar (1 hora)

```
README.md (completo)
    ↓
Entender características
    ↓
POSTMAN_IMPORT.md
    ↓
Probar endpoints
    ↓
Revisar estructura
```

### 🔐 Ruta OAuth (30 min)

```
oauth-providers-setup/START_HERE.md
    ↓
oauth-providers-setup/QUICK_START.md
    ↓
Crear credenciales en Google/Discord
    ↓
Ejecutar install.sh
    ↓
Editar 3 archivos
```

### 🏢 Ruta Producción (2 horas)

```
README.md (completo)
    ↓
README.md → Seguridad
    ↓
oauth-providers-setup/ (si lo necesitas)
    ↓
Configurar variables .env
    ↓
Revisar estructura para deployment
```

---

## ❓ Preguntas Frecuentes

### P: ¿Por dónde empiezo?

**R:** Sigue la sección "¿Cuál es tu Situación?" al inicio de esta página.

### P: ¿Puedo usar la API sin OAuth?

**R:** SÍ. OAuth es completamente opcional. La API funciona perfectamente solo con JWT.

### P: ¿Qué es Postman?

**R:** Es una herramienta para probar APIs. Descárgala de [postman.com](https://www.postman.com/).

### P: ¿Tengo que leer TODA la documentación?

**R:** NO. Empieza con lo que necesitas. El [`DOCUMENTACION.md`](./DOCUMENTACION.md) te ayuda a saltar directo.

### P: ¿Dónde reporto bugs?

**R:** En GitHub Issues del repositorio.

### P: ¿Puedo usar esta API en producción?

**R:** SÍ, pero revisa la sección de Seguridad en [`README.md`](./README.md) primero.

---

## 🎬 Próximo Paso

Elige UNO y hazlo ahora:

### Opción A: Instala (si no lo hiciste)

```bash
git clone https://github.com/2004Style/api-correos.git
cd api-correos
pnpm install
```

**Luego:** Sigue [`README.md`](./README.md) → Instalación

### Opción B: Abre la documentación

- **Para inicio:** [`README.md`](./README.md)
- **Para OAuth:** `cd oauth-providers-setup && cat START_HERE.md`
- **Para navegar todo:** [`DOCUMENTACION.md`](./DOCUMENTACION.md)

### Opción C: Prueba en Postman

- Abre [`POSTMAN_IMPORT.md`](./POSTMAN_IMPORT.md)
- Sigue los pasos

---

## 🎓 Lo Que Aprenderás

Siguiendo esta documentación, aprenderás:

✅ Cómo instalar y configurar una API NestJS  
✅ Cómo funcionan JWT tokens  
✅ Cómo hacer paginación eficiente  
✅ Cómo agregar OAuth con Google/Discord  
✅ Cómo enviar correos con SMTP  
✅ Cómo proteger rutas con Guards  
✅ Cómo usar Postman para testing  
✅ Cómo estructurar un proyecto profesional

---

## 💡 Tips Importantes

1. **Revisa los comentarios en el código** - Explican qué hace cada cosa
2. **Usa las variables de .env.example** - Son un buen punto de partida
3. **Testea todo en Postman primero** - Antes de usar en tu app
4. **Lee los errores con atención** - Suelen ser muy descriptivos
5. **No abandones si algo falla** - Revisa la sección de Troubleshooting

---

## 🎉 ¡Listo!

Ya sabes por dónde empezar. Adelante 🚀

**¿Dudas?** Consulta:

- Este archivo
- [`DOCUMENTACION.md`](./DOCUMENTACION.md) (navegación)
- [`README.md`](./README.md) (guía principal)

---

## 📋 Licencia

Este proyecto está bajo **Licencia MIT** (Open Source).

Si lo usas, solo necesitas:

- ✅ Dar crédito a `2004Style`
- ✅ Incluir la licencia en tu distribución

Ver: [`LICENSE`](./LICENSE) para detalles completos

---

**Última actualización:** 1 de noviembre de 2025

_Escrito para hacerte la vida más fácil 😊_
