import { Routes } from '@angular/router';
import { SessionNotActivateGuard } from './session-not-activate.guard';
import { SessionActivateGuard } from './session-activate.guard';


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage),
    canActivate:[SessionNotActivateGuard]
  },
  {
    path: 'inicio',
    loadComponent: () => import('./inicio/inicio.page').then( m => m.InicioPage),
    canActivate:[SessionActivateGuard]
  },
  {
    path: 'empleados',
    loadComponent: () => import('./empleados/empleados.page').then( m => m.EmpleadosPage),
    canActivate:[SessionActivateGuard]
  },
  {
    path: 'mesas',
    loadChildren: () => import('./mesas/mesas.module').then( m => m.MesasPageModule),
    canActivate:[SessionActivateGuard]
  },
  {
    path: 'ordenes',
    loadComponent: () => import('./ordenes/ordenes.page').then( m => m.OrdenesPage),
    canActivate:[SessionActivateGuard]
  },
  {
    path: 'marcas',
    loadComponent: () => import('./marcas/marcas.page').then( m => m.MarcasPage)
  },
];
