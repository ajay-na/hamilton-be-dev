import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { OAuth2Client } from 'google-auth-library';
import { DatabaseModule } from './../database/database.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [
    AuthService,
    GoogleStrategy,
    JwtStrategy,
    {
      provide: 'GOOGLE_OAUTH_CLIENT',
      useFactory: () => {
        return new OAuth2Client(process.env.GOOGLE_WEB_CLIENT_ID);
      },
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
