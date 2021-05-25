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
import { RegistroListComponent } from './pages/registro-list/registro-list.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RolEditModalComponent } from './modals/rol-edit-modal/rol-edit-modal.component';
import { RolAddModalComponent } from './modals/rol-add-modal/rol-add-modal.component';
// import { BloqueoComponent } from './bloqueo/bloqueo.component';


@NgModule({
  declarations: [BloqueoComponent,UsuarioFrmComponent, UsuarioAddModalComponent, UsuarioEditModalComponent, RegistroListComponent, RolEditModalComponent, RolAddModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    SeguridadRoutingModule,
    SharedModule,
    NgxSpinnerModule,
    
    NgbPaginationModule,
    // BloqueoComponent,
    
  ],
  exports: [
    UsuarioFrmComponent
  ],
  entryComponents: [ 
    UsuarioAddModalComponent,
    UsuarioEditModalComponent,
    RolEditModalComponent,
    RolAddModalComponent,
  ]

})
export class SeguridadModule { }
