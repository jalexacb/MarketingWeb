// import { Component, OnInit } from '@angular/core';

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { Permiso } from 'src/app/theme/shared/models/Permiso';
import { ContactoService } from 'src/app/core/services/contacto.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/core/services/login.service';
import { PermisoService } from 'src/app/core/services/permiso.service';
import { EventoCampania } from 'src/app/theme/shared/models/EventoCampania';
import { EventoCampaniaService } from 'src/app/core/services/evento-campania.service';
import { EventoCampaniaAddModalComponent } from '../../modals/evento-campania-add-modal/evento-campania-add-modal.component';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};


@Component({
  selector: 'app-programacion',
  templateUrl: './programacion.component.html',
  styleUrls: ['./programacion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgramacionComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  public busqueda: String;
  public advancePage: number;
  public collectionSize: number;
  public per_page: number;
  public currentPage: number;
  public permiso: Permiso;
  public locale: string;
  public eventosCampanias: Array<EventoCampania>;
  
  ngOnInit() {
    // this.spinner.show();
    let p1 = this.getEventosCampanias();
    let p2 = this.getPermiso();

    Promise.all([p1, p2])
      .then(result => this.spinner.hide())
      .catch(error => this.spinner.hide());

  }
  

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'Campaña 1',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'Campaña 2',
      color: colors.yellow,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'Campaña 3',
      color: colors.blue,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'Campaña 4',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  activeDayIsOpen: boolean = true;

  constructor(
    private modal: NgbModal,
    
    // private contactoService: ContactoService,
    private eventoCampaniaService: EventoCampaniaService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private loginService: LoginService,
    private permisoService: PermisoService,
    
  ) {

    this.locale = 'es';

    this.permiso = new Permiso();
    this.busqueda = "";
    // this.paginatorp.itemsPerPageLabel = ""
    this.advancePage = 1;
    this.per_page = 5;
    this.eventosCampanias = [];
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }



  getPermiso(){
    let usuario:any = this.loginService.getUsuarioIdentificado();
    let rol_id = usuario.rol_id;
    let qs = "?usuario_id="+localStorage.getItem('usuario_id')+"&menu_id="+localStorage.getItem('menu_id')+"&rol_id="+rol_id;
    this.permisoService.getPermisoByFilter(qs).subscribe(
      (res:Permiso) => {
        this.permiso = res;
        console.log("permiso",res);
      }, 
      err => {

      }
    )
  }

  onKeyBackSpace(){
    if(this.busqueda == ''){
      this.spinner.show();
      this.getEventosCampanias().then(
        res => this.spinner.hide(),
        err => this.spinner.hide(),
      );
    }
  }

  onChangePage(event){
    this.spinner.show();
    this.getEventosCampanias(event).then(
      res => this.spinner.hide(),
      err => this.spinner.hide(),
    )
  }

  onSearch(event:any = null){
    let qs = "";
    if(this.busqueda != ''){
      console.log("bus",this.busqueda);
      this.spinner.show();
      qs += `&busqueda=${this.busqueda}`;
      
    }
    if (event != null) {
      qs += `&page=${event}`;
    }

    this.getEventosCampanias(qs).then(
      res => this.spinner.hide(),
      err => this.spinner.hide(),
    );
  }

  getEventos(){
    return this.eventosCampanias;
  }

  getEventosCampanias(qs: String = ""){
    return new Promise((resolve, reject) => {
      this.eventoCampaniaService.getAll(`?per_page=${this.per_page}${qs}`).subscribe(
        (res:any) => {
          console.log(res);
          this.eventosCampanias = res.data;
          console.log(this.eventosCampanias);
          this.collectionSize = res.total;
          console.log(this.collectionSize);
          resolve(true);
        },
        err => {
          reject();
        }
      );
    });
  }

  onCreate(){
    const modalRef = this.modalService.open(EventoCampaniaAddModalComponent, { size: 'lg' });
    modalRef.componentInstance.name = 'World';
    modalRef.result.then(
      res => this.onSearch(),
    );
    // modalRef.dismiss.then(
    //   res => this.onSearch(),
    // );
  }
}
