import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaniaAddComponent } from './pages/campania/campania-add/campania-add.component';
import { CampaniaEditComponent } from './pages/campania/campania-edit/campania-edit.component';
import { CampaniaListComponent } from './pages/campania/campania-list/campania-list.component';
import { PlanificacionListComponent } from './pages/planificacion-list/planificacion-list.component';
import { ProgramacionComponent } from './pages/programacion/programacion.component';
import { PruebaComponent } from './pages/prueba/prueba.component';


const routes: Routes = [
  {
    path: '',
    children: [

      {
        path: '',
        component: CampaniaListComponent,
      },
      {
        path: 'crear',
        component: CampaniaAddComponent,
      },
      {
        path: 'editar/:id',
        component: CampaniaEditComponent,
      },
      {
        path: 'programacion',
        component: PlanificacionListComponent,
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
