// import 'flatpickr/dist/flatpickr.css'; 
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './theme/shared/shared.module';

import { AppComponent } from './app.component';

import { AuthComponent } from './theme/layout/auth/auth.component';

import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';

import { ToggleFullScreenDirective } from './theme/shared/full-screen/toggle-full-screen';

/* Menu Items */
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { NgbButtonsModule, NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

/* Servicios */
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IdenficicacionAuthGuard } from './core/guards/identificacion.guard';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminModule } from './theme/layout/admin/admin.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { SeguridadModule } from './modules/seguridad/seguridad.module';
import { CalendarModule } from 'angular-calendar';
import { CampaniasModule } from './modules/campanias/campanias.module';
import { StepProgressBarModule } from 'step-progress-bar';
import { StepperProgressBarModule } from 'stepper-progress-bar';
import { ParametrizacionModule } from './modules/parametrizacion/parametrizacion.module';
import { ContactosModule } from './modules/contactos/contactos.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { SeguimientoListComponent } from './modules/reporteria/pages/seguimiento-list/seguimiento-list.component';

import { ModalModule } from 'ngx-bootstrap/modal';

// import Echo from 'laravel-echo';

// (window as any).global = window;
// declare var require: any;

// declare global {
//   interface Window {
//     io: any;
//   }

//   interface Window {
//     Echo: any;
//   }
// }

// window.io = window.io || require('socket.io-client');
// window.Echo = window.Echo || {};

// window.Echo = new Echo({
//   broadcaster: 'socket.io',
//   host: 'http://localhost:6001'
// });

// window.Echo.channel('channel-name')
//   .listen('.channelEvent', (data) => {
//     console.log('From laravel echo: ', data);
//   });



export const MY_MOMENT_FORMATS = {
  parseInput: 'l LT',
  fullPickerInput: 'l LT',
  datePickerInput: 'l',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

@NgModule({
  declarations: [
    AppComponent,
    
    AuthComponent,
   
    
    ToggleFullScreenDirective,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule,
    NgbTabsetModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgbModule.forRoot(),
    ModalModule.forRoot(),
    // StepperProgressBarModule,

    FormsModule,
    SharedModule,
    AdminModule,
    SeguridadModule,
    CampaniasModule,
    ContactosModule,
    ParametrizacionModule,
    // CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory })
  ],
  providers: [
    // appRoutingProviders,
    // {provide: OWL_DATE_TIME_LOCALE, useValue: 'es'},
    NavigationItem, IdenficicacionAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
