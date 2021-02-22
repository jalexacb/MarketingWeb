import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BloqueoComponent } from './pages/bloqueo/bloqueo.component';


const routes: Routes = [
  
  {
    path: '',
    children: [
      {
        path: 'usuario',
        loadChildren: () => import('./pages/usuario/usuario.module').then(module => module.UsuarioModule)
      },
      {
        path: 'rol',
        loadChildren: () => import('./pages/rol/rol.module').then(module => module.RolModule)
      },
      {
        path: 'permiso',
        loadChildren: () => import('./pages/permiso/permiso.module').then(module => module.PermisoModule)
      },
      {
        path: 'bloqueos',
        component: BloqueoComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
