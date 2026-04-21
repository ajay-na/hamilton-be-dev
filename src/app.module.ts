import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BrandModule } from './api/brand/brand.module';
import { UserModule } from './api/user/user.module';
import { VehicleModule } from './api/vehicle/vehicle.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import validationSchema from './config/validation';
import { HealthModule } from './health/health.module';
import { LoggerModule } from './logger/logger.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    LoggerModule,
    HealthModule,
    AuthModule,
    UserModule,
    BrandModule,
    VehicleModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
