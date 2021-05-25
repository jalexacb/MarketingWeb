import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaniasRoutingModule } from './campanias-routing.module';
import { CampaniaListComponent } from './pages/campania/campania-list/campania-list.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule, NgbPaginationModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
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
import { EventoCampaniaAddModalComponent } from './modals/evento-campania-add-modal/evento-campania-add-modal.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { PlanificacionListComponent } from './pages/planificacion-list/planificacion-list.component';
import 'flatpickr/dist/flatpickr.css';
import { OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CampaniaAddComponent } from './pages/campania/campania-add/campania-add.component';
import { CampaniaEditComponent } from './pages/campania/campania-edit/campania-edit.component';
// import { StepProgressBarModule } from 'step-progress-bar';

registerLocaleData(localeEs);

export const MY_MOMENT_FORMATS = {
  parseInput: 'l LT',
  fullPickerInput: 'l LT',
  datePickerInput: 'l',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

export class SetPickerLabels extends OwlDateTimeIntl {
  public cancelBtnLabel = 'Cancelar';
  public setBtnLabel = 'Seleccionar';
  };

@NgModule({
  declarations: [CampaniaListComponent, ProgramacionComponent, CampaniaAddModalComponent, PruebaComponent, CampaniaEditModalComponent, CampaniaFrmComponent, EventoCampaniaAddModalComponent, PlanificacionListComponent, CampaniaAddComponent, CampaniaEditComponent],
  imports: [
    CommonModule,
    // BrowserAnimationsModule,
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
    NgbPaginationModule,
    NgbDropdownModule,
    FlatpickrModule.forRoot(),
    OwlDateTimeModule, 
         OwlNativeDateTimeModule,
    // StepperProgressBarModule,
    // StepProgressBarModule,
    //Internos
    SharedModule,

  ],
  entryComponents: [ 
    CampaniaAddModalComponent,
    CampaniaEditModalComponent,
    EventoCampaniaAddModalComponent,
  ],
  providers: [
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'es'},
    {provide: OwlDateTimeIntl, useClass: SetPickerLabels},
  ]
})
export class CampaniasModule { }
