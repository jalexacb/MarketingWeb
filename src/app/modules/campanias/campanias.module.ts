import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaniasRoutingModule } from './campanias-routing.module';
import { CampaniaListComponent } from './pages/campania-list/campania-list.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ProgramacionComponent } from './pages/programacion/programacion.component';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { CampaniaAddModalComponent } from './modals/campania-add-modal/campania-add-modal.component';
import { StepperProgressBarModule } from 'stepper-progress-bar';

import { PruebaComponent } from './pages/prueba/prueba.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { CampaniaEditModalComponent } from './modals/campania-edit-modal/campania-edit-modal.component';
import { CampaniaFrmComponent } from './components/campania-frm/campania-frm.component';
// import { StepProgressBarModule } from 'step-progress-bar';

registerLocaleData(localeEs);

@NgModule({
  declarations: [CampaniaListComponent, ProgramacionComponent, CampaniaAddModalComponent, PruebaComponent, CampaniaEditModalComponent, CampaniaFrmComponent],
  imports: [
    CommonModule,
    CampaniasRoutingModule,
    //Externos
    NgbTabsetModule,
    NgxSpinnerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgMultiSelectDropDownModule.forRoot(),
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    // StepperProgressBarModule,
    // StepProgressBarModule,
    //Internos
    SharedModule,

  ],
  entryComponents: [ 
    CampaniaAddModalComponent,
    CampaniaEditModalComponent,
  ]
})
export class CampaniasModule { }
