import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrizacionRoutingModule } from './parametrizacion-routing.module';
import { CanalListComponent } from './pages/canal-list/canal-list.component';
import { ParametroListComponent } from './pages/parametro-list/parametro-list.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { InteresListComponent } from './pages/interes-list/interes-list.component';
import { CanalAddModalComponent } from './modals/canal-add-modal/canal-add-modal.component';
import { ObjetoFrmComponent } from './components/objeto-frm/objeto-frm.component';
import { CanalEditModalComponent } from './modals/canal-edit-modal/canal-edit-modal.component';
import { InteresAddModalComponent } from './modals/interes-add-modal/interes-add-modal.component';
import { InteresEditModalComponent } from './modals/interes-edit-modal/interes-edit-modal.component';
import { ParametroAddModalComponent } from './modals/parametro-add-modal/parametro-add-modal.component';
import { ParametroEditModalComponent } from './modals/parametro-edit-modal/parametro-edit-modal.component';
import { ParametroFrmComponent } from './components/parametro-frm/parametro-frm.component';


@NgModule({
  declarations: [
    ObjetoFrmComponent, 
    CanalListComponent, 
    CanalAddModalComponent, 
    CanalEditModalComponent, 
    InteresListComponent, 
    InteresAddModalComponent, 
    InteresEditModalComponent, 
    ParametroListComponent, 
    ParametroAddModalComponent, 
    ParametroEditModalComponent, 
    ParametroFrmComponent],
  imports: [
    CommonModule,
    ParametrizacionRoutingModule,
    SharedModule,

    NgbDropdownModule,
    NgxSpinnerModule,
    NgbPaginationModule,
  ],
  entryComponents: [ 
    CanalAddModalComponent,
    CanalEditModalComponent,
    InteresAddModalComponent,
    InteresEditModalComponent,
    ParametroAddModalComponent,
    ParametroEditModalComponent,
  ]
})
export class ParametrizacionModule { }
