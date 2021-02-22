import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermisoRoutingModule } from './permiso-routing.module';
import { PermisoListComponent } from './permiso-list/permiso-list.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbButtonsModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [PermisoListComponent],
  imports: [
    CommonModule,
    PermisoRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgbButtonsModule,
    NgxSpinnerModule
  ]
})
export class PermisoModule { }
