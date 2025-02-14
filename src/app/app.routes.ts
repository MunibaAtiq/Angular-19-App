import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BookComponent } from './components/book/book.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'book', component: BookComponent },
    { path: 'resetPassword', component: ForgotPasswordComponent },
];
