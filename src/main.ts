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
let app: any; // Cache the initialized Nest application instance

export async function bootstrap(): Promise<any> {
  // Only initialize Nest and Swagger once per serverless container lifespan
  if (!app) {
    const logger = new WinstonLoggerService();

    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
      { logger },
    );

    nestApp.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    nestApp.setGlobalPrefix('api/v1');
    nestApp.useGlobalInterceptors(new TransformInterceptor());
    nestApp.useGlobalFilters(new AllExceptionsFilter());
    nestApp.enableCors();

    // ----------------------------------------------------
    // Swagger is now safely built ONLY during the cold start
    // ----------------------------------------------------
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

    const document = SwaggerModule.createDocument(nestApp, configSwagger);

    // Serve Swagger UI assets from a CDN to prevent Vercel static file errors
    SwaggerModule.setup('api/v1/docs', nestApp, document, {
      customCssUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
      ],
    });

    await nestApp.init();
    app = nestApp;
  }

  return app;
}

// 1. Local Development Execution
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  bootstrap().then(() => {
    const port = process.env.PORT || 3001;
    server.listen(port, () => {
      console.log(`Application started locally on http://localhost:${port}`);
    });
  });
}

// 2. Vercel Serverless Function Export
export default async (req: express.Request, res: express.Response) => {
  await bootstrap(); // Ensures everything is ready, but does not rebuild on subsequent requests
  return server(req, res); // Safely pass the request to the underlying Express server
};
