import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolRoutingModule } from './rol-routing.module';
import { RolListComponent } from './rol-list/rol-list.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbButtonsModule, NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [RolListComponent],
  imports: [
    CommonModule,
    RolRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgbButtonsModule,
    NgxSpinnerModule,
    NgbPaginationModule,
  ]
})
export class RolModule { }
