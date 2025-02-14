import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideDatabase,getDatabase} from '@angular/fire/database';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { routes } from './app.routes';
import { environment } from '../environments/environments';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideFirebaseApp(()=>initializeApp(environment.firebaseConfig)),
  provideAuth(() => getAuth()),
  provideDatabase(()=>getDatabase()),
  ]
};
