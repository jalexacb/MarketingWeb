import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanalListComponent } from './pages/canal-list/canal-list.component';
import { InteresListComponent } from './pages/interes-list/interes-list.component';
import { ObjetivoListComponent } from './pages/objetivo-list/objetivo-list.component';
import { ParametroListComponent } from './pages/parametro-list/parametro-list.component';


const routes: Routes = [
  {
    path: '',
    children: [

      {
        path: 'canal/list',
        component: CanalListComponent,
      },
      {
        path: 'objetivo/list',
        component: ObjetivoListComponent,
      },
      {
        path: 'parametro/list',
        component: ParametroListComponent,
      },
      {
        path: 'interes/list',
        component: InteresListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { }
