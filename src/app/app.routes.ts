import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'authentication',
    loadComponent: () => import('./pages/authentication/authentication.page').then(m => m.AuthenticationPage)
  },
  {
    path: 'files-upload',
    loadComponent: () => import('./pages/files-upload/files-upload.page').then(m => m.FilesUploadPage)
  },
  {
    path: 'scanners',
    loadComponent: () => import('./pages/scanners/scanners.page').then(m => m.ScannersPage)
  },
  {
    path: 'database',
    loadComponent: () => import('./pages/database/database.page').then(m => m.DatabasePage)
  },
];
