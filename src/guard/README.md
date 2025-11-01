# Guards - Protección de Rutas y Autenticación

Este directorio contiene los guards que protegen las rutas de la aplicación y validan la autenticación de usuarios y aplicaciones.

## Guards Disponibles

### 1. **AuthGuard** (`auth.guard.ts`)

Guard de autenticación global para proteger rutas mediante JWT.

**Características:**

- Valida tokens JWT
- Verifica si el usuario está activo
- Controla acceso por roles
- Soporta rutas públicas
- Extrae tokens de headers Authorization o cookies

**Uso:**

```typescript
// En un controlador
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './guard/auth.guard';
import { Roles } from './guard/roles.decorator';
import { Public } from './guard/public.decorator';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  // Ruta protegida - requiere autenticación
  @Get()
  getUsers() {
    return { users: [] };
  }

  // Ruta protegida - solo ADMIN puede acceder
  @Get('admin-only')
  @Roles('ADMIN')
  getAdminData() {
    return { data: 'sensitive' };
  }

  // Ruta pública - sin autenticación
  @Get('public-info')
  @Public()
  getPublicInfo() {
    return { message: 'Esta ruta es pública' };
  }

  // Ruta protegida - ADMIN o USER pueden acceder
  @Get('user-area')
  @Roles('ADMIN', 'USER')
  getUserArea() {
    return { message: 'Área de usuario' };
  }
}
```

### 2. **MailAuthGuard** (`mail.guard.ts`)

Guard para proteger el endpoint de envío de correos mediante credenciales de aplicación.

**Características:**

- Valida clientId y secretKey
- Verifica que la aplicación esté activa
- Verifica que no esté suspendida
- Registra el último uso de la aplicación
- Compara secretKey hasheada

**Uso:**

```typescript
// En el controlador de mail
import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { MailAuthGuard } from './guard/mail.guard';

@Controller('mail')
@UseGuards(MailAuthGuard)
export class MailController {
  @Post()
  async sendMail(@Body() mailContent: SendMailDto) {
    return this.mailService.sendMail(mailContent);
  }
}
```

**Cómo enviar emails con credenciales:**

```bash
curl -X POST http://localhost:3000/mail \
  -H "Content-Type: application/json" \
  -H "X-Client-Id: cli_a1b2c3d4e5f6..." \
  -H "X-Secret-Key: sk_live_a1b2c3d4e5f6..." \
  -d '{
    "to": "usuario@example.com",
    "subject": "Bienvenido",
    "html": "<h1>Hola</h1>"
  }'
```

### 3. **GitHubAuthGuard** (`github.guard.ts`)

Guard para manejar la autenticación con GitHub OAuth.

**Características:**

- Valida configuración de OAuth
- Maneja errores de autenticación
- Integración con Passport
- Redirige a GitHub para login

**Uso:**

```typescript
// En el controlador de autenticación
import { Controller, Get, UseGuards } from '@nestjs/common';
import { GitHubAuthGuard } from './guard/github.guard';

@Controller('auth')
export class AuthController {
  @Get('github')
  @UseGuards(GitHubAuthGuard)
  async githubAuth(): Promise<void> {
    // Passport redirige automáticamente a GitHub
  }

  @Get('github/callback')
  @UseGuards(GitHubAuthGuard)
  async githubCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const user = req.user;
    // Manejar la respuesta después del callback
  }
}
```

## Decoradores

### **@Public()**

Marca una ruta como pública (sin requerir autenticación).

```typescript
@Get('info')
@Public()
getInfo() {
  return { public: true };
}
```

### **@Roles(...roles)**

Especifica qué roles pueden acceder a una ruta.

```typescript
@Post('create')
@Roles('ADMIN')
createItem() {
  return { created: true };
}
```

### **@User(data?)**

Inyecta el usuario autenticado en los parámetros del controlador.

```typescript
import { User } from './guard/user.decorator';

@Get('profile')
getProfile(@User() user: User) {
  return user;
}

// Obtener solo un campo
@Get('email')
getEmail(@User('email') email: string) {
  return { email };
}
```

## Instalación y Configuración

### 1. Registrar el AuthGuard globalmente

En `app.module.ts`:

```typescript
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    // ... otros módulos
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
```

### 2. Variables de entorno necesarias

```bash
# JWT
JWT_SECRET=your-secret-key-min-32-characters

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback
```

## Flujo de Autenticación

```
┌─────────────────────────────────────┐
│   Solicitud a ruta protegida        │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│   ¿Ruta marcada con @Public()?      │
└────────────┬────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
   SÍ                NO
    │                 │
    │                 ▼
    │         ┌─────────────────────────────────────┐
    │         │   ¿Existe token?                    │
    │         └────────────┬────────────────────────┘
    │                      │
    │            ┌─────────┴─────────┐
    │            │                   │
    │           NO                  SÍ
    │            │                   │
    │            │                   ▼
    │            │         ┌─────────────────────────────────────┐
    │            │         │   Validar JWT                       │
    │            │         └────────────┬────────────────────────┘
    │            │                      │
    │            │                      ▼
    │            │         ┌─────────────────────────────────────┐
    │            │         │   Buscar usuario en BD              │
    │            │         └────────────┬────────────────────────┘
    │            │                      │
    │            │                      ▼
    │            │         ┌─────────────────────────────────────┐
    │            │         │   ¿Tiene roles especificados?       │
    │            │         └────────────┬────────────────────────┘
    │            │                      │
    │            │            ┌─────────┴─────────┐
    │            │            │                   │
    │            │           NO                  SÍ
    │            │            │                   │
    │            │            │                   ▼
    │            │            │         ┌─────────────────────────────────────┐
    │            │            │         │   ¿Usuario tiene rol permitido?     │
    │            │            │         └────────────┬────────────────────────┘
    │            │            │                      │
    │            │            │            ┌─────────┴─────────┐
    │            │            │            │                   │
    │            │            │           NO                  SÍ
    │            │            │            │                   │
    │            ▼            ▼            ▼                   ▼
    │    ┌────────────────────┐   ┌─────────────────────────────────┐
    │    │ UnauthorizedException│   │ ✅ Acceso permitido           │
    │    └────────────────────┘   └─────────────────────────────────┘
    │
    └─────────────────────────────────────►
              ✅ Acceso permitido
```

## Ejemplos de Uso Completo

### Proteger rutas administrativas

```typescript
@Controller('admin')
@UseGuards(AuthGuard)
export class AdminController {
  @Get('dashboard')
  @Roles('ADMIN')
  getDashboard(@User() user: User) {
    return { admin: user.username };
  }

  @Post('users')
  @Roles('ADMIN')
  createUser(@Body() dto: UserCreateDto) {
    return { created: true };
  }
}
```

### Rutas públicas y privadas

```typescript
@Controller('products')
export class ProductsController {
  @Get()
  @Public()
  getAllProducts() {
    return { products: [] };
  }

  @Post()
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'VENDOR')
  createProduct(@Body() dto: CreateProductDto) {
    return { created: true };
  }

  @Get(':id')
  @Public()
  getProduct(@Param('id') id: string) {
    return { product: {} };
  }
}
```

### Enviar emails con autenticación de aplicación

```typescript
// Cliente enviando emails
const response = await fetch('http://localhost:3000/mail', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Client-Id': 'cli_xxxxx',
    'X-Secret-Key': 'sk_live_xxxxx',
  },
  body: JSON.stringify({
    to: 'recipient@example.com',
    subject: 'Test',
    html: '<h1>Hello</h1>',
  }),
});
```

## Notas Importantes

- **AuthGuard** está diseñado para ser usado globalmente con `APP_GUARD`
- Los tokens JWT se pueden enviar en el header `Authorization: Bearer <token>` o en cookies
- Las aplicaciones de mail se crean cuando un usuario se registra
- El `secretKey` se hashea con bcrypt y solo se puede comparar, no recuperar
- Las rutas sin especificar `@Roles()` requieren autenticación pero permiten cualquier usuario activo
- Las rutas con `@Public()` se saltan completamente el guard de autenticación
