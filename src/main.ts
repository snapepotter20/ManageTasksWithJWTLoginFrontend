// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { appRouter } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()),
    importProvidersFrom(FormsModule),
    appRouter // ✅ make sure router is provided
  ]
}).catch(err => console.error(err));
