import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { WinstonLoggerService } from './logger/logger.service';

export async function bootstrap() {
  const logger = new WinstonLoggerService();

  const app = await NestFactory.create(AppModule, { logger });

  app.use(helmet());

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message:
        'Too many requests from this IP, please try again after 15 minutes',
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api/v1');
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
  SwaggerModule.setup('api/v1/docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);

  logger.log(
    `Application successfully started on port ${port} in ${process.env.NODE_ENV || 'development'} mode`,
  );
}

bootstrap();
