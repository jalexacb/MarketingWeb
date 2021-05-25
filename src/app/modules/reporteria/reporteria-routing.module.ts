import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComportamientoClientesListComponent } from './pages/comportamiento-clientes-list/comportamiento-clientes-list.component';
import { SeguimientoListComponent } from './pages/seguimiento-list/seguimiento-list.component';
import { TableroComponent } from './pages/tablero/tablero.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'tablero',
        component: TableroComponent,
      },
      {
        path: 'seguimiento/list',
        component: SeguimientoListComponent,
      },
      {
        path: 'comportamiento-cliente/list',
        component: ComportamientoClientesListComponent,
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteriaRoutingModule { }
