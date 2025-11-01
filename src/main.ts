// ============================================
// main.ts
// ============================================
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { initializedSeed } from './seed/initialized.seed';

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
  await app.listen(port);

  logger.log(`🚀 Application running on: http://localhost:${port}`);
  logger.log(`📧 Mail endpoint: POST http://localhost:${port}/mail`);
  logger.log(`ℹ️  Info endpoint: GET http://localhost:${port}`);
}

void bootstrap();
