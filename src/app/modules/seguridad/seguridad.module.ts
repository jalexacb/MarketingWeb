import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BloqueoComponent } from './pages/bloqueo/bloqueo.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UsuarioFrmComponent } from './components/usuario-frm/usuario-frm.component';
import { FormsModule } from '@angular/forms';
import { UsuarioAddModalComponent } from './modals/usuario-add-modal/usuario-add-modal.component';
import { UsuarioEditModalComponent } from './modals/usuario-edit-modal/usuario-edit-modal.component';
// import { BloqueoComponent } from './bloqueo/bloqueo.component';


@NgModule({
  declarations: [BloqueoComponent,UsuarioFrmComponent, UsuarioAddModalComponent, UsuarioEditModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    SeguridadRoutingModule,
    SharedModule,
    NgxSpinnerModule
    // BloqueoComponent,
    
  ],
  exports: [
    UsuarioFrmComponent
  ],
  entryComponents: [ 
    UsuarioAddModalComponent,
    UsuarioEditModalComponent,
  ]

})
export class SeguridadModule { }
