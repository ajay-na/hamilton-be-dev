import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express, { Express } from 'express'; // Import the Express type
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { WinstonLoggerService } from './logger/logger.service';

const server: Express = express();

const logger = new WinstonLoggerService();
export async function createServer(): Promise<Express> {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    logger,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors();

  const configSwagger = new DocumentBuilder()
    .setTitle('Hamilton API')
    .setDescription('The core authentication and user management API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api/docs', app, document);

  await app.init();
  return server;
}

if (process.env.NODE_ENV !== 'production') {
  createServer().then(() => {
    const port = process.env.PORT || 3001;
    server.listen(port, () => {
      logger.log(`Application started locally on http://localhost:${port}`);
    });
  });
}

export default server;
