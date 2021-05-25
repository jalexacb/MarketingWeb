import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteriaRoutingModule } from './reporteria-routing.module';
import { SeguimientoListComponent } from './pages/seguimiento-list/seguimiento-list.component';
import { TableroComponent } from './pages/tablero/tablero.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbButtonsModule, NgbDropdownModule, NgbModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartCircularComponent } from './components/chart-circular/chart-circular.component';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ComportamientoClientesListComponent } from './pages/comportamiento-clientes-list/comportamiento-clientes-list.component';


// import 'froala-editor/js/languages/de.js';

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
  declarations: [
    
   
    
    SeguimientoListComponent,
    
   
    
    TableroComponent,
    
   
    
    ChartCircularComponent,
    
   
    
    ComportamientoClientesListComponent
  ],
  imports: [
    CommonModule,
    ReporteriaRoutingModule,
    
    //Módulos externos
    NgxSpinnerModule,
    NgbDropdownModule,
    NgbButtonsModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    NgbProgressbarModule,
    NgbModule,
    NgbPopoverModule,
    ChartsModule,
    NgMultiSelectDropDownModule.forRoot(),
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    //Módulos internos
    SharedModule,
    
  ],
  providers:[ThemeService,
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'es'},
    {provide: OwlDateTimeIntl, useClass: SetPickerLabels},
  ] 
})
export class ReporteriaModule { }
