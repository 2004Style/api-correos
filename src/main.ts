// ============================================
// main.ts
// ============================================
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { initializedSeed } from './seed/initialized.seed';
import * as os from 'os';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? '*',
    methods: ['GET', 'POST'],
    credentials: true,
  });

  // Configuración de ValidationPipe global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      errorHttpStatusCode: 400,
    }),
  );

  await initializedSeed();

  const port = process.env.PORT ?? 3000;
  // Escuchar en 0.0.0.0 para aceptar conexiones desde cualquier interfaz de red
  await app.listen(port, '0.0.0.0');

  // Obtener la IP local para referencia
  const networkInterfaces = os.networkInterfaces();
  let localIP = 'localhost';

  Object.values(networkInterfaces).forEach((ifaces) => {
    if (ifaces) {
      ifaces.forEach((iface) => {
        // Obtener direcciones IPv4 (no loopback)
        if (iface.family === 'IPv4' && !iface.internal) {
          localIP = iface.address;
        }
      });
    }
  });

  logger.log(`🚀 Application running on: http://0.0.0.0:${port}`);
  logger.log(`🌐 Accessible from network at: http://${localIP}:${port}`);
  logger.log(`📧 Mail endpoint: POST http://localhost:${port}/mail`);
  logger.log(`ℹ️  Info endpoint: GET http://localhost:${port}`);
}

void bootstrap();
