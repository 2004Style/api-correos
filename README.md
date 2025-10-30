# 📧 API de Envío de Correos Electrónicos

API REST construida con NestJS para el envío de correos electrónicos mediante SMTP. Toda la configuración del servidor de correo está centralizada en la API, el cliente solo envía el contenido del mensaje.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso de la API](#-uso-de-la-api)
- [Ejemplos de Uso](#-ejemplos-de-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Solución de Problemas](#-solución-de-problemas)
- [Seguridad](#-seguridad)

## ✨ Características

- ✅ Envío de correos mediante SMTP
- ✅ Soporte para HTML y texto plano
- ✅ Múltiples destinatarios (to, cc, bcc)
- ✅ Adjuntos de archivos
- ✅ Validación automática de datos
- ✅ Configuración SMTP centralizada en la API
- ✅ CORS configurable
- ✅ Logs detallados
- ✅ Manejo robusto de errores

## 🔧 Requisitos Previos

- **Node.js**: v18 o superior
- **npm**, **yarn** o **pnpm**
- **Cuenta de correo con acceso SMTP** (Gmail, Outlook, SendGrid, etc.)

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd mail-api
```

### 2. Instalar dependencias

Elige tu gestor de paquetes preferido:

**npm:**
```bash
npm install
```

**yarn:**
```bash
yarn install
```

**pnpm:**
```bash
pnpm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

## ⚙️ Configuración

### Archivo `.env`

```env
# Configuración del servidor
PORT=3000
CORS_ORIGIN=*

# Configuración SMTP (TODA la configuración está aquí)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-contraseña-de-aplicacion
MAIL_FROM="Mi Empresa <noreply@miempresa.com>"
```

### 🔑 Variables de entorno explicadas

| Variable | Descripción | Ejemplo | Requerido |
|----------|-------------|---------|-----------|
| `PORT` | Puerto donde se ejecuta la API | `3000` | No (default: 3000) |
| `CORS_ORIGIN` | Origen permitido para CORS | `https://miapp.com` o `*` | No (default: *) |
| `SMTP_HOST` | Host del servidor SMTP | `smtp.gmail.com` | **Sí** |
| `SMTP_PORT` | Puerto del servidor SMTP | `587` (TLS) o `465` (SSL) | **Sí** |
| `SMTP_SECURE` | Usar SSL/TLS | `true` o `false` | No |
| `SMTP_USER` | Usuario para autenticación SMTP | `usuario@gmail.com` | **Sí** |
| `SMTP_PASS` | Contraseña para autenticación | `contraseña-app` | **Sí** |
| `MAIL_FROM` | Remitente predeterminado | `"Empresa <no-reply@empresa.com>"` | No |

### 📧 Configuración para proveedores comunes

#### Gmail

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-app-password
MAIL_FROM="Tu Nombre <tu-email@gmail.com>"
```

**Nota**: Necesitas crear una [contraseña de aplicación](https://support.google.com/accounts/answer/185833) en tu cuenta de Google.

#### Outlook/Hotmail

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@outlook.com
SMTP_PASS=tu-contraseña
MAIL_FROM="Tu Nombre <tu-email@outlook.com>"
```

#### SendGrid

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=tu-api-key-de-sendgrid
MAIL_FROM="Tu Nombre <verified-email@tudominio.com>"
```

#### Mailtrap (testing)

```env
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_SECURE=false
SMTP_USER=tu-usuario-mailtrap
SMTP_PASS=tu-password-mailtrap
MAIL_FROM="Test <test@example.com>"
```

## 🚀 Ejecutar la aplicación

### Modo desarrollo

**npm:**
```bash
npm run start:dev
```

**yarn:**
```bash
yarn start:dev
```

**pnpm:**
```bash
pnpm start:dev
```

### Modo producción

**npm:**
```bash
npm run build
npm run start:prod
```

**yarn:**
```bash
yarn build
yarn start:prod
```

**pnpm:**
```bash
pnpm build
pnpm start:prod
```

La API estará disponible en: `http://localhost:3000`

## 🔌 Uso de la API

### Endpoints disponibles

#### `GET /` - Información del servicio

Devuelve información sobre el estado de la API.

**Respuesta:**

```json
{
  "service": "API de envío de correos electrónicos",
  "status": "ready",
  "configured": true,
  "from": "Mi Empresa <noreply@miempresa.com>"
}
```

#### `POST /mail` - Enviar correo

Envía un correo electrónico.

**Headers:**

```
Content-Type: application/json
```

**Body (JSON):**

```json
{
  "to": "destinatario@ejemplo.com",
  "subject": "Asunto del correo",
  "html": "<h1>Contenido HTML</h1>",
  "cc": ["copia@ejemplo.com"],
  "bcc": ["copia-oculta@ejemplo.com"],
  "replyTo": "responder@ejemplo.com",
  "attachments": [
    {
      "filename": "documento.pdf",
      "path": "/ruta/al/archivo.pdf"
    }
  ]
}
```

**Campos del body:**

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `to` | `string \| string[]` | **Sí** | Destinatario(s) principal(es) |
| `subject` | `string` | **Sí** | Asunto del correo |
| `text` | `string` | No* | Contenido en texto plano |
| `html` | `string` | No* | Contenido en HTML |
| `cc` | `string \| string[]` | No | Destinatarios en copia |
| `bcc` | `string \| string[]` | No | Destinatarios en copia oculta |
| `replyTo` | `string` | No | Email para respuestas |
| `headers` | `object` | No | Headers personalizados |
| `attachments` | `array` | No | Adjuntos del correo |

\* Debes proporcionar al menos `text` o `html`

**Respuesta exitosa (200):**

```json
{
  "ok": true,
  "result": {
    "messageId": "<abc123@gmail.com>",
    "accepted": ["destinatario@ejemplo.com"],
    "rejected": [],
    "response": "250 Message accepted",
    "from": "Mi Empresa <noreply@miempresa.com>"
  }
}
```

**Respuesta de error (500):**

```json
{
  "ok": false,
  "message": "Error al enviar el correo",
  "error": "Connection timeout"
}
```

## 📝 Ejemplos de Uso

### Correo simple con texto plano

```bash
curl -X POST http://localhost:3000/mail \
  -H "Content-Type: application/json" \
  -d '{
    "to": "usuario@ejemplo.com",
    "subject": "Mensaje de prueba",
    "text": "Este es un correo de prueba"
  }'
```

### Correo HTML con múltiples destinatarios

```bash
curl -X POST http://localhost:3000/mail \
  -H "Content-Type: application/json" \
  -d '{
    "to": ["usuario1@ejemplo.com", "usuario2@ejemplo.com"],
    "cc": "supervisor@ejemplo.com",
    "subject": "Reporte mensual",
    "html": "<h1>Reporte</h1><p>Contenido del reporte...</p>"
  }'
```

### Correo con adjuntos (desde archivo)

```bash
curl -X POST http://localhost:3000/mail \
  -H "Content-Type: application/json" \
  -d '{
    "to": "cliente@ejemplo.com",
    "subject": "Documentos adjuntos",
    "html": "<p>Adjunto los documentos solicitados</p>",
    "attachments": [
      {
        "filename": "factura.pdf",
        "path": "/ruta/completa/al/archivo.pdf"
      }
    ]
  }'
```

### Correo con adjuntos (contenido base64)

```bash
curl -X POST http://localhost:3000/mail \
  -H "Content-Type: application/json" \
  -d '{
    "to": "usuario@ejemplo.com",
    "subject": "Imagen adjunta",
    "html": "<p>Mira esta imagen</p>",
    "attachments": [
      {
        "filename": "imagen.png",
        "content": "iVBORw0KGgoAAAANSUhEUgA...",
        "encoding": "base64"
      }
    ]
  }'
```

### Ejemplo desde JavaScript/TypeScript

```typescript
async function enviarCorreo() {
  const response = await fetch('http://localhost:3000/mail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: 'destinatario@ejemplo.com',
      subject: 'Hola desde JavaScript',
      html: '<h1>¡Hola!</h1><p>Este correo fue enviado desde JavaScript</p>',
    }),
  });

  const result = await response.json();
  console.log(result);
}
```

### Ejemplo desde Python

```python
import requests

url = "http://localhost:3000/mail"
payload = {
    "to": "destinatario@ejemplo.com",
    "subject": "Hola desde Python",
    "html": "<h1>¡Hola!</h1><p>Este correo fue enviado desde Python</p>"
}

response = requests.post(url, json=payload)
print(response.json())
```

## 📁 Estructura del Proyecto

```
mail-api/
├── src/
│   ├── main.ts                 # Punto de entrada de la aplicación
│   ├── app.module.ts           # Módulo principal
│   ├── app.controller.ts       # Controlador de endpoints
│   ├── app.service.ts          # Lógica de negocio
│   ├── app.dto.ts              # Data Transfer Objects y validaciones
│   └── mail.interface.ts       # Interfaces de TypeScript
├── .env                        # Variables de entorno (NO subir a git)
├── .env.example                # Ejemplo de variables de entorno
├── package.json                # Dependencias del proyecto
├── tsconfig.json               # Configuración de TypeScript
└── README.md                   # Este archivo
```

## 🐛 Solución de Problemas

### Error: "SMTP transporter not initialized"

**Causa**: Las variables de entorno SMTP no están configuradas correctamente.

**Solución**:
1. Verifica que el archivo `.env` existe
2. Asegúrate de tener `SMTP_HOST` y `SMTP_PORT` configurados
3. Reinicia la aplicación después de modificar el `.env`

### Error: "Invalid login" o "Authentication failed"

**Causa**: Credenciales incorrectas o configuración de seguridad del proveedor.

**Solución**:
- **Gmail**: Activa la verificación en 2 pasos y crea una [contraseña de aplicación](https://support.google.com/accounts/answer/185833)
- **Outlook**: Verifica que tu cuenta permite SMTP
- Verifica que `SMTP_USER` y `SMTP_PASS` son correctos

### Error: "Connection timeout"

**Causa**: No se puede conectar al servidor SMTP.

**Solución**:
1. Verifica el `SMTP_HOST` y `SMTP_PORT`
2. Comprueba tu firewall o antivirus
3. Verifica que tu proveedor permite conexiones SMTP

### El correo se envía pero no llega

**Posibles causas**:
1. El correo está en spam
2. El dominio del remitente no está verificado
3. Límites de envío del proveedor

**Solución**:
- Verifica la carpeta de spam
- Usa un dominio verificado en `MAIL_FROM`
- Configura SPF, DKIM y DMARC en tu dominio

### Validación de correos falla

**Causa**: Formato de email inválido o campos requeridos faltantes.

**Solución**:
- Asegúrate de que los emails tienen formato válido: `usuario@dominio.com`
- Verifica que `to` y `subject` están presentes
- Proporciona al menos `text` o `html`

## 🔒 Seguridad

### Mejores prácticas

1. **Nunca subas el archivo `.env` a git**
   ```bash
   # Agregar a .gitignore
   .env
   .env.local
   .env.*.local
   ```

2. **Usa contraseñas de aplicación**
   - No uses tu contraseña personal de correo
   - Crea contraseñas específicas para aplicaciones

3. **Limita el CORS en producción**
   ```env
   CORS_ORIGIN=https://tu-dominio.com
   ```

4. **Implementa rate limiting** (próximamente)
   - Limita las peticiones por IP
   - Previene abuso del servicio

5. **Usa HTTPS en producción**
   - Nunca expongas esta API sin TLS/SSL

6. **Autentica las peticiones** (recomendado)
   - Agrega un API Key o JWT
   - No dejes el endpoint público en producción

### Ejemplo de implementación con API Key

Para proteger tu API, puedes agregar un middleware de autenticación:

```typescript
// En main.ts o en un guard personalizado
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ 
      ok: false, 
      message: 'Unauthorized' 
    });
  }
  
  next();
});
```

Luego en `.env`:
```env
API_KEY=tu-clave-secreta-aqui
```

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

## 📞 Soporte

Si tienes problemas o preguntas:
- Abre un issue en GitHub
- Revisa la sección de [Solución de Problemas](#-solución-de-problemas)

---

**¡Feliz envío de correos! 📧✨**