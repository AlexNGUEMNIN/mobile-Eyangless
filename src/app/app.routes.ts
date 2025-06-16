import { Routes } from '@angular/router';
import { bailleur_routes } from './pages/bailleur/tabs/tabs.routes';

export const routes: Routes = [

 // Les routes des interfaces Utilisateur
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    loadComponent: () => import('./pages/Utilisateur/Auth/landing/landing.page').then(m => m.LandingPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/Utilisateur/Auth/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/Utilisateur/Auth/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/Utilisateur/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'city-details/:id',
    loadComponent: () => import('./pages/Utilisateur/city-details/city-details.page').then(m => m.CityDetailsPage)
  },

{
    path: 'code-verification',
    loadComponent: () => import('./pages/Utilisateur/Auth/code-verification/code-verification.page').then( m => m.CodeVerificationPage)
  },
  {
    path: 'phone-verification',
    loadComponent: () => import('./pages/Utilisateur/Auth/phone-verification/phone-verification.page').then( m => m.PhoneVerificationPage)
  },
  {
    path: 'user-type-selection',
    loadComponent: () => import('./pages/Utilisateur/Auth/user-type-selection/user-type-selection.page').then( m => m.UserTypeSelectionPage)
  },




  // Les routes des interfaces du bailleur

  

];