import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermisoListComponent } from './permiso-list/permiso-list.component';


const routes: Routes = [
  {
    path: 'list',
    component: PermisoListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermisoRoutingModule { }
