import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolListComponent } from './rol-list/rol-list.component';


const routes: Routes = [
  {
    path: 'list',
    component: RolListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolRoutingModule { }
