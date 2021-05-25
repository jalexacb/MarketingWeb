import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactoListComponent } from './pages/contacto-list/contacto-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cliente-list',
        component: ContactoListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactosRoutingModule { }
