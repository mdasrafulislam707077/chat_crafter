import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { reducers } from './app/ngrx/store';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideStore(reducers),
    provideHttpClient(),
  ],
}).catch((err) => console.error(err));
