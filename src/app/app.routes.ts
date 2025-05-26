// src/app/app.routes.ts
import { Routes, provideRouter } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TasklistComponent, canActivate: [AuthGuard] },
  { path: 'add-task', component: AddtaskComponent, canActivate: [AuthGuard] },
];

export const appRouter = provideRouter(routes);
