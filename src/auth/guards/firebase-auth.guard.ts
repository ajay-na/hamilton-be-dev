import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or malformed Authorization header',
      );
    }

    const idToken = authHeader.split('Bearer ')[1];

    try {
      const decodedToken = await getAuth().verifyIdToken(idToken);

      request['user'] = {
        uid: decodedToken.uid,
        phoneNumber: decodedToken.phone_number,
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired Firebase token');
    }
  }
}
