# 📮 Importar Colección Postman

## Opción 1: Importar desde Archivo

1. **Abre Postman**
2. Haz clic en **Import** (arriba a la izquierda)
3. Selecciona la pestaña **Upload Files**
4. Elige el archivo `postman-collection.json` de este repositorio
5. Haz clic en **Import**

## Opción 2: Copiar JSON Directamente

1. Abre el archivo `postman-collection.json`
2. Copia todo el contenido JSON
3. En Postman, haz clic en **Import**
4. Selecciona la pestaña **Paste Raw Text**
5. Pega el JSON
6. Haz clic en **Import**

## Configurar Variables en Postman

Una vez importada, necesitas configurar las variables de entorno:

1. **En la colección importada**, haz clic en el icono **Variables** (o en los tres puntos)
2. Selecciona **Edit**
3. Configura las siguientes variables:

| Variable     | Valor                   | Descripción                            |
| ------------ | ----------------------- | -------------------------------------- |
| `base_url`   | `http://localhost:3000` | URL de tu servidor                     |
| `token`      | (obtenido en Login)     | Tu JWT Bearer Token                    |
| `client_id`  | (obtenido al crear App) | Client ID de la aplicación             |
| `secret_key` | (obtenido al crear App) | Secret Key de la aplicación            |
| `user_id`    | (ID de usuario)         | ID del usuario a usar en requests      |
| `role_id`    | (ID de rol)             | ID del rol a usar en requests          |
| `app_id`     | (ID de app)             | ID de la aplicación a usar en requests |

## Flujo Recomendado de Prueba

Sigue este orden para probar la API completa:

### 1️⃣ **Autenticación**

- [ ] Registrar (Ronald)
- [ ] Copia el `id` de la respuesta y guárdalo en la variable `user_id`
- [ ] Copia el `access_token` y guárdalo en la variable `token`
- [ ] Login (Ronald) - para verificar

### 2️⃣ **Usuarios**

- [ ] Listar Usuarios (Página 1)
- [ ] Buscar Usuarios (Ronald)
- [ ] Obtener Usuario por ID (usando `user_id`)
- [ ] Crear Usuario (Style)
- [ ] Actualizar Usuario
- [ ] Eliminar Usuario

### 3️⃣ **Roles** (Si tienes permisos ADMIN)

- [ ] Listar Todos los Roles
- [ ] Buscar Rol (Admin)
- [ ] Crear Rol (ADMIN Only) - si eres admin
- [ ] Actualizar Rol - si eres admin
- [ ] Eliminar Rol - si eres admin

### 4️⃣ **Aplicaciones**

- [ ] Listar Todas las Aplicaciones
- [ ] Crear Aplicación
- [ ] Copia el `clientId` y `secretKey` de la respuesta
- [ ] Guarda `clientId` en `client_id` y `secretKey` en `secret_key`
- [ ] Obtener Aplicación por ID
- [ ] Aplicaciones del Usuario

### 5️⃣ **Correos**

- [ ] Enviar Correo Simple a Ronald
- [ ] Enviar Correo HTML
- [ ] Enviar a Múltiples Destinatarios
- [ ] Enviar con Reply-To
- [ ] Enviar con CC y BCC

## 💡 Tips Útiles

### Automatizar con Pre-request Script

En los requests de **Login**, puedes agregar un script para guardar automáticamente el token:

```javascript
// Post-request Script
var jsonData = pm.response.json();
pm.collectionVariables.set('token', jsonData.access_token);
pm.collectionVariables.set('user_id', jsonData.id);
```

### Similar para Crear Aplicación

```javascript
// Post-request Script
var jsonData = pm.response.json();
pm.collectionVariables.set('client_id', jsonData.clientId);
pm.collectionVariables.set('secret_key', jsonData.secretKey);
pm.collectionVariables.set('app_id', jsonData.id);
```

### Paginación en Postman

Ajusta los parámetros `page` y `limit` según necesites:

```
GET /user?page=1&limit=10
GET /user?page=2&limit=20
GET /user?search=ronald&page=1&limit=10
```

## 📝 Variables de Ejemplo

```
base_url: http://localhost:3000
token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
client_id: app_550e8400e29b41d4a716446655440200
secret_key: sk_live_abc123xyz...
user_id: 550e8400-e29b-41d4-a716-446655440000
role_id: 550e8400-e29b-41d4-a716-446655440099
app_id: 550e8400-e29b-41d4-a716-446655440201
```

## ✅ Listo

¡Ahora estás listo para probar todos los endpoints de la API!

---

**Última actualización**: 1 de noviembre de 2024
