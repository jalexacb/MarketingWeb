import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbButtonsModule, NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
// import { MatTableModule } from '@angular/material/table';
// import { MatSortModule } from '@angular/material/sort';
// import { MatPaginatorModule } from '@angular/material/paginator';
import { UsuarioCrearComponent } from './usuario-crear/usuario-crear.component';
import { UiBasicRoutingModule } from 'src/app/demo/ui-elements/ui-basic/ui-basic-routing.module';
import { SeguridadModule } from '../../seguridad.module';


@NgModule({
  declarations: [UsuarioListComponent, UsuarioCrearComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgbButtonsModule,
    NgxSpinnerModule,
    NgbPaginationModule,
    SeguridadModule
    // MatSortModule,
    // MatTableModule,
    // MatPaginatorModule,
    
  ]
})
export class UsuarioModule { }
