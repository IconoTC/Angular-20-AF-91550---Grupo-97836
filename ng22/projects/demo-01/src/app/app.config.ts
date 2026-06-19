import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import localeES from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeES, 'es');

import { routes } from './app.routes';
import { TimeOld } from './core/services/time';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideRouter(routes),
    {
      provide: LOCALE_ID, useValue: 'es'
    },
    TimeOld,
    //  {
    //   provide: TimeOld, useClass: TimeOld
    // },
  ],
};
