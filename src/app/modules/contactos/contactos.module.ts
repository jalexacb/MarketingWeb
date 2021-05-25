import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactosRoutingModule } from './contactos-routing.module';
import { ContactoListComponent } from './pages/contacto-list/contacto-list.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbButtonsModule, NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactoAddModalComponent } from './modals/contacto-add-modal/contacto-add-modal.component';
import { ContactoEditModalComponent } from './modals/contacto-edit-modal/contacto-edit-modal.component';
import { ContactoFrmComponent } from './components/contacto-frm/contacto-frm.component';
import { Ng2TelInputModule } from 'ng2-tel-input';



@NgModule({
  declarations: [ContactoListComponent, ContactoAddModalComponent, ContactoEditModalComponent, ContactoFrmComponent],
  imports: [
    CommonModule,
    ContactosRoutingModule,
    //librerías
    NgxSpinnerModule,
    NgbDropdownModule,
    NgbButtonsModule,
    NgbPaginationModule,
    Ng2TelInputModule, 
    //componentes
    SharedModule,
    
  ],
  entryComponents: [ 
    ContactoAddModalComponent,
    ContactoEditModalComponent,
  ]
})
export class ContactosModule { }
