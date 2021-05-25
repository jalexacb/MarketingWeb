import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CampaniaService } from 'src/app/core/services/campania.service';
import { Campania } from 'src/app/theme/shared/models/Campania';
import { EventoCampania } from 'src/app/theme/shared/models/EventoCampania';
import * as moment from 'moment';
import { EventoCampaniaService } from 'src/app/core/services/evento-campania.service';
import { ThrowStmt } from '@angular/compiler';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-evento-campania-add-modal',
  templateUrl: './evento-campania-add-modal.component.html',
  styleUrls: ['./evento-campania-add-modal.component.scss']
})
export class EventoCampaniaAddModalComponent implements OnInit {
  public eventoCampania:EventoCampania;
  public campanias: Array<Campania>;
  public fecha_inicio: any;
  public fecha_fin: any;
  public fecha_actual: any;
  spinner1 = 'sp_evento_add';
  constructor(
    private spinner: NgxSpinnerService,
    public activeModal: NgbActiveModal,
    private campaniaService: CampaniaService,
    private eventoCampaniaService: EventoCampaniaService,
  ) { 
    this.campanias = [];
    this.eventoCampania = new EventoCampania();
    let now = moment();
    // this.fecha_actual = 
    this.fecha_inicio = moment(now.format(), moment.ISO_8601).format();
    this.fecha_fin = moment(now.format(), moment.ISO_8601).format();
    // this.fecha_inicio = moment(this.fecha_inicio);
    // this.fecha_fin = moment(this.fecha_inicio)
  }

  ngOnInit() {
    this.spinner.show(this.spinner1);
    this.getCampanias().then(
      res => this.spinner.hide(this.spinner1),
      err => this.spinner.hide(this.spinner1),
    );

  }

  getFechaActual(){
    let now = moment();
    return moment(now.format(), moment.ISO_8601).format();
  }

  

  isValidForm(){
    if(this.eventoCampania.campania_id == ''){
      return false;
    }
    if(this.fecha_inicio == ''){
      return false;
    }

    if(this.fecha_fin == ''){
      return false;
    }
    return true;
  }
  getCampanias(qs: string = ""){
    qs = "?tipo=P&status=A";
    return new Promise((resolve, reject) => {
      this.campaniaService.getAll(qs).subscribe(
        (res:any) => {
          console.log(res);
          this.campanias = res;
          // this.collectionSize = res.total;
          // console.log(this.collectionSize);
          resolve(true);
        },
        err => {
          reject();
        }
      );
    });
  }

  setValues(){
    this.eventoCampania.fecha_inicio = moment(this.fecha_inicio, moment.ISO_8601).format();
    this.eventoCampania.fecha_fin =moment(this.fecha_fin, moment.ISO_8601).format();
  }

  onChangeFechaInicio(){
    console.log("hola");
    this.fecha_fin = null;
  }

  onSubmit(){
    this.spinner.show(this.spinner1);
    this.setValues();
    console.log(this.eventoCampania.fecha_inicio);
    this.eventoCampaniaService.save(this.eventoCampania).subscribe(
      res => {
        Swal.fire(
          'Creado',
          'Se ha creado con éxito',
          'success'
        )
        this.spinner.hide(this.spinner1);
        // this.activeModal.close();
        this.activeModal.close('Close click');
      },
      err => {

      }
    )

  }

}
