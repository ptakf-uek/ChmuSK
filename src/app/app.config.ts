import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'chmusk-00000',
          appId: '1:702253145631:web:24a39b0a75f2742d423f2a',
          storageBucket: 'chmusk-00000.appspot.com',
          apiKey: 'AIzaSyDNoHpZLGLEK8xX9WOHKsMW37JRrnL-z4c',
          authDomain: 'chmusk-00000.firebaseapp.com',
          messagingSenderId: '702253145631',
          measurementId: 'G-QRTZ7Z5HW9',
        }),
      ),
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage())),
  ],
};
