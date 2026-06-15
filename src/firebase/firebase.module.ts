import { Global, Module } from '@nestjs/common';
import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        // 1. If no apps are initialized, set up the default app
        if (getApps().length === 0) {
          const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;

          if (!serviceAccountString) {
            throw new Error(
              'FIREBASE_SERVICE_ACCOUNT environment variable is missing',
            );
          }

          try {
            const serviceAccount = JSON.parse(serviceAccountString);

            // CRITICAL FOR VERCEL: Sanitize the private key newlines
            if (serviceAccount.private_key) {
              serviceAccount.private_key = serviceAccount.private_key.replace(
                /\\n/g,
                '\n',
              );
            }

            // Return the initialized Firebase App instance
            return initializeApp({
              credential: cert(serviceAccount),
            });
          } catch (error) {
            console.error('Firebase initialization failed:', error);
            throw error;
          }
        }

        // 2. If already initialized (warm serverless container), return the existing app instance
        return getApp();
      },
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule {}
