import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express, { Express } from 'express';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { WinstonLoggerService } from './logger/logger.service';

const server: Express = express();
let isInitialized = false; // Serverless cold-start cache

const logger = new WinstonLoggerService();

export async function bootstrap(): Promise<Express> {
  // Only initialize Nest once per serverless container lifespan
  if (!isInitialized) {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
      {
        logger,
      },
    );

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
    isInitialized = true;
  }

  return server;
}

// 1. Local Development Execution
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  bootstrap().then((serverInstance) => {
    const port = process.env.PORT || 3001;
    serverInstance.listen(port, () => {
      console.log(`Application started locally on http://localhost:${port}`);
    });
  });
}

// 2. Vercel Serverless Function Export
export default async (req: express.Request, res: express.Response) => {
  const app = await bootstrap();
  return app(req, res); // Pass the incoming Vercel request to the initialized Express app
};
