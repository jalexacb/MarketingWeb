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

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventoCampaniaService } from 'src/app/core/services/evento-campania.service';
import { LoginService } from 'src/app/core/services/login.service';
import { PermisoService } from 'src/app/core/services/permiso.service';
import { EventoCampania } from 'src/app/theme/shared/models/EventoCampania';
import { Permiso } from 'src/app/theme/shared/models/Permiso';
import { EventoCampaniaAddModalComponent } from '../../modals/evento-campania-add-modal/evento-campania-add-modal.component';

import * as moment from 'moment';
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
  selector: 'app-planificacion-list',
  templateUrl: './planificacion-list.component.html',
  styleUrls: ['./planificacion-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanificacionListComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  public eventosCampanias: Array<EventoCampania>;
  public busqueda: String;
  public advancePage: number;
  public collectionSize: number;
  public per_page: number;
  public currentPage: number;
  public permiso: Permiso;
  public locale: string;

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
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;
  constructor(
    private eventoCampaniaService:EventoCampaniaService,
    private spinner: NgxSpinnerService,
    private modal: NgbModal,
    private modalService: NgbModal,
    private loginService: LoginService,
    private permisoService: PermisoService,
  ) {
    this.permiso = new Permiso();
    this.locale = 'es';
    this.busqueda = "";
    
    this.advancePage = 1;
    this.per_page = 5;
    this.eventosCampanias = [];
   }

  ngOnInit() {
    this.spinner.show();
    let p1 = this.getEventosCampanias();
    let p2 = this.getPermiso();

    Promise.all([p1, p2])
      .then(result => this.spinner.hide())
      .catch(error => this.spinner.hide());
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

  addEvent(eventoCampania): void {
    this.events = [
      ...this.events,
      {
        title: eventoCampania.campania.nombre,
        start: startOfDay(eventoCampania.fecha_inicio),
        end: endOfDay(eventoCampania.fecha_fin),
        color: colors.red,
        draggable: false,
        resizable: {
          beforeStart: false,
          afterEnd: false,
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

  onKeyBackSpace(){
    if(this.busqueda == ''){
      this.spinner.show();
      this.getEventosCampanias().then(
        res => this.spinner.hide(),
        err => this.spinner.hide(),
      );
    }
  }

  onSearch(event:any = null){
    let qs = "";
    if(this.busqueda != ''){
      
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

  getEventosCampanias(qs: String = ""){
    return new Promise((resolve, reject) => {
      this.eventoCampaniaService.getAll(`?per_page=${this.per_page}${qs}`).subscribe(
        (res:any) => {
          
          this.eventosCampanias = res.data;
          this.events = [];
          this.eventosCampanias.forEach(eventoCampania => {
            this.events = [
              ...this.events,
              {
                title: eventoCampania.campania?eventoCampania.campania.nombre:'',
                start: startOfDay(new Date(eventoCampania.fecha_inicio)),
                end: endOfDay(new Date(eventoCampania.fecha_fin)),
                color: colors.red,
                draggable: false,
                resizable: {
                  beforeStart: false,
                  afterEnd: false,
                },
              },
            ];
          });
          this.collectionSize = res.total;
          
          
          resolve(true);
        },
        err => {
          reject();
        }
      );
    });
  }

  getPermiso(){
    let usuario:any = this.loginService.getUsuarioIdentificado();
    let rol_id = usuario.rol_id;
    let qs = "?usuario_id="+localStorage.getItem('usuario_id')+"&menu_id="+localStorage.getItem('menu_id')+"&rol_id="+rol_id;
    this.permisoService.getPermisoByFilter(qs).subscribe(
      (res:Permiso) => {
        this.permiso = res;
        
      }, 
      err => {

      }
    )
  }

  onChangePage(event){
    this.spinner.show();
    this.getEventosCampanias(event).then(
      res => this.spinner.hide(),
      err => this.spinner.hide(),
    )
  }

  onCreate(){
    const modalRef = this.modalService.open(EventoCampaniaAddModalComponent, { size: 'lg', centered: true }, );
    modalRef.componentInstance.name = 'World';
    modalRef.result.then(
      res => {
        this.onSearch();
        this.advancePage = 1;
      },
      err => {
        this.onSearch();
        this.advancePage = 1;
      }
    );
    
    
    
  }

}
