import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { DatabaseService } from '../database/database.service';
import { LoginBody } from './dto/login-body.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { GoogleUser } from './strategies/google.strategy';

interface UserEntity {
  id: string;
  email: string;
  role_id: number;
  firstname: string;
  lastname: string;
  google_id: string;
  image_url: string;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject('GOOGLE_OAUTH_CLIENT') private googleClient: OAuth2Client,
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService,
  ) {
    this.googleClient = new OAuth2Client(process.env.GOOGLE_WEB_CLIENT_ID);
  }

  async verifyUserOnDb(googleUser: any) {
    try {
      const users = await this.db.query<UserEntity>(
        'SELECT id, email, role_id, firstname FROM t_user WHERE email = $1',
        [googleUser.email],
      );

      let user = users[0];
      if (user) {
        return user;
      } else {
        const newUsers = await this.db.query<UserEntity>(
          `INSERT INTO t_user (google_id, email, firstname, lastname, image_url, username) 
         VALUES ($1, $2, $3, $4, $5, $6) 
         RETURNING id, email, role_id, firstname;`,
          [
            googleUser.googleId,
            googleUser.email,
            googleUser.firstName,
            googleUser.lastName,
            googleUser.picture,
            googleUser.email.split('@')[0],
          ],
        );
        user = newUsers[0];
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  async verifyAndroidGoogleLogin(idToken: string) {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      if (!payload) {
        throw new UnauthorizedException('Invalid Google token payload');
      }

      const user = await this.verifyUserOnDb(payload);

      if (!user) {
        throw new Error('Failed to retrieve or create user');
      }

      return {
        access_token: this.jwtService.sign({
          sub: user.id,
          email: user.email,
          role: user.role_id,
          name: user.firstname,
        }),
      };
    } catch (error) {
      throw new UnauthorizedException('Google authentication failed');
    }
  }

  async verifyMobileGoogleLogin(idToken: string) {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: idToken,
        audience: process.env.GOOGLE_WEB_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      if (!payload) {
        throw new UnauthorizedException('Invalid Google token payload');
      }

      const user = await this.verifyUserOnDb(payload);

      if (!user) {
        throw new Error('Failed to retrieve or create user');
      }

      return {
        access_token: this.jwtService.sign({
          sub: user.id,
          email: user.email,
          role: user.role_id,
          name: user.firstname,
        }),
      };
    } catch (error) {
      throw new UnauthorizedException('Google authentication failed');
    }
  }

  async login(googleUser: GoogleUser): Promise<LoginResponseDto> {
    try {
      const user = await this.verifyUserOnDb(googleUser);
      if (!user) {
        throw new Error('Failed to retrieve or create user');
      }

      const payload = {
        sub: user.id,
        email: user.email,
        role: user.role_id,
        name: user.firstname,
      };

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw error;
    }
  }

  async registerAdmin(body: LoginBody) {
    try {
      const { username, password } = body;
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password, salt);

      const [user] = await this.db.query(
        `INSERT INTO t_user (firstname, username, password_hash, salt, role_id) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING id, email, role_id, firstname;`,
        ['admin', username, hashedPassword, salt, 1],
      );

      return user;
    } catch (error) {
      throw error;
    }
  }

  async adminLogin(body: LoginBody) {
    try {
      const { username, password } = body;

      const [user] = await this.db.query(
        'SELECT username, password_hash FROM t_user WHERE username = $1',
        [username],
      );

      if (!user) {
        throw new ForbiddenException('Invalid credentials');
      }

      const isValid = await bcrypt.compare(password, user.password_hash);
      if (!isValid) {
        throw new ForbiddenException('Invalid credentials');
      }

      const [userDetails] = await this.db.query<UserEntity>(
        'SELECT id, email, role_id, firstname FROM t_user WHERE username = $1',
        [username],
      );

      const payload = {
        sub: userDetails.id,
        email: userDetails.email,
        role: userDetails.role_id,
        name: userDetails.firstname,
      };

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw error;
    }
  }
}
