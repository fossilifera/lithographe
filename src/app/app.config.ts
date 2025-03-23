import {ApplicationConfig, isDevMode, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideServiceWorker} from '@angular/service-worker';
import {providePrimeNG} from 'primeng/config';
import Nora from '@primeng/themes/aura';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient} from '@angular/common/http';
import {definePreset} from '@primeng/themes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: definePreset(Nora, {
          semantic: {
            primary: {
              50: '{amber.50}',
              100: '{amber.100}',
              200: '{amber.200}',
              300: '{amber.300}',
              400: '{amber.400}',
              500: '{amber.500}',
              600: '{amber.600}',
              700: '{amber.700}',
              800: '{amber.800}',
              900: '{amber.900}',
              950: '{amber.950}'
            }
          }
        }),
        options: {
          prefix: 'ltg',
          darkModeSelector: '.ltg-app-dark'
        }
      }
    })
  ]
};
