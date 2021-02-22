import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaniaListComponent } from './pages/campania-list/campania-list.component';
import { ProgramacionComponent } from './pages/programacion/programacion.component';
import { PruebaComponent } from './pages/prueba/prueba.component';


const routes: Routes = [
  {
    path: '',
    children: [

      {
        path: 'list',
        component: CampaniaListComponent,
      },
      {
        path: 'programacion',
        component: ProgramacionComponent,
      }
      ,
      {
        path: 'pruebas',
        component: PruebaComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaniasRoutingModule { }
