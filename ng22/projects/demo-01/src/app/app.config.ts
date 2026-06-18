import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import localeES from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeES, 'es');

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideRouter(routes),
    {
      provide: LOCALE_ID, useValue: 'es'
    }
  ],
};
