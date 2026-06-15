import { Global, Module } from '@nestjs/common';
import { cert, getApps, initializeApp } from 'firebase-admin/app';

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        if (getApps().length === 0) {
          const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;

          if (!serviceAccountString) {
            throw new Error(
              'FIREBASE_SERVICE_ACCOUNT environment variable is missing',
            );
          }

          const serviceAccount = JSON.parse(serviceAccountString);

          initializeApp({
            credential: cert(serviceAccount),
          });
        }
        return null;
      },
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule {}
