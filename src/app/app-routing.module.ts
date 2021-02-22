import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdenficicacionAuthGuard } from './core/guards/identificacion.guard';
import { AdminComponent } from './theme/layout/admin/admin.component';
import {AuthComponent} from './theme/layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard/analytics',
        pathMatch: 'full',
        canActivate: [IdenficicacionAuthGuard]
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./demo/dashboard/dashboard.module').then(module => module.DashboardModule),
        canActivate: [IdenficicacionAuthGuard],
      },
      {
        path: 'parametrizacion',
        loadChildren: () => import('./modules/parametrizacion/parametrizacion.module').then(module => module.ParametrizacionModule),
        canActivate: [IdenficicacionAuthGuard],
      },
      {
        path: 'campanias',
        loadChildren: () => import('./modules/campanias/campanias.module').then(module => module.CampaniasModule),
        canActivate: [IdenficicacionAuthGuard],
      },
      {
        path: 'contactos',
        loadChildren: () => import('./modules/contactos/contactos.module').then(module => module.ContactosModule),
        canActivate: [IdenficicacionAuthGuard],
      },
      {
        path: 'seguridad',
        loadChildren: () => import('./modules/seguridad/seguridad.module').then(module => module.SeguridadModule),
        canActivate: [IdenficicacionAuthGuard],
      },
      {
        path: 'layout',
        loadChildren: () => import('./demo/pages/layout/layout.module').then(module => module.LayoutModule)
      },
      {
        path: 'basic',
        loadChildren: () => import('./demo/ui-elements/ui-basic/ui-basic.module').then(module => module.UiBasicModule)
      },
      {
        path: 'forms',
        loadChildren: () => import('./demo/pages/form-elements/form-elements.module').then(module => module.FormElementsModule)
      },
      {
        path: 'tbl-bootstrap',
        loadChildren: () => import('./demo/pages/tables/tbl-bootstrap/tbl-bootstrap.module').then(module => module.TblBootstrapModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./demo/pages/core-chart/core-chart.module').then(module => module.CoreChartModule)
      },
      {
        path: 'sample-page',
        loadChildren: () => import('./demo/pages/sample-page/sample-page.module').then(module => module.SamplePageModule)
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then(module => module.AuthenticationModule)
      },
      {
        path: 'maintenance',
        loadChildren: () => import('./demo/pages/maintenance/maintenance.module').then(module => module.MaintenanceModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
