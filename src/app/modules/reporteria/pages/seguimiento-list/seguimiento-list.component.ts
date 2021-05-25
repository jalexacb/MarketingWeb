import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CampaniaService } from 'src/app/core/services/campania.service';
import { CanalService } from 'src/app/core/services/canal.service';
import { InteresService } from 'src/app/core/services/interes.service';
import { LoginService } from 'src/app/core/services/login.service';
import { PermisoService } from 'src/app/core/services/permiso.service';
import { Canal } from 'src/app/theme/shared/models/Canal';
import { Interes } from 'src/app/theme/shared/models/Interes';
import { Permiso } from 'src/app/theme/shared/models/Permiso';

import * as moment from 'moment';
@Component({
  selector: 'app-seguimiento-list',
  templateUrl: './seguimiento-list.component.html',
  styleUrls: ['./seguimiento-list.component.scss'],
  encapsulation: ViewEncapsulation.None // Add this line
})
export class SeguimientoListComponent implements OnInit {
  public canales: Array<Canal>;
  public intereses: Array<Interes>;
  public canalesSeleccionados: Array<Canal>;
  public interesesSeleccionados: Array<Interes>;
  public busqueda: string;
  public tipo: string;
  public advancePage: number;
  public collectionSize: number;
  public per_page: number;
  public currentPage: number;
  public permiso: Permiso;
  public fecha_inicio_seguimiento: any;
  public fecha_fin_seguimiento: any;
  public seguimientos: any;
  public settingsSelect: {
  };
  constructor(
    private campaniaService: CampaniaService,
    private canalService: CanalService,
    private interesService: InteresService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private loginService: LoginService,
    private permisoService: PermisoService,
  ) { 
    this.seguimientos = [];
    this.permiso = new Permiso();
    this.busqueda = "";
    // this.paginatorp.itemsPerPageLabel = ""
    this.advancePage = 1;
    this.per_page = 5;
    this.settingsSelect = {
      singleSelection: false,
      idField: 'id',
      textField: 'nombre',
      selectAllText: 'Seleccione todo',
      unSelectAllText: 'Deseleccione todo',
      itemsShowLimit: 3,
    };
    this.tipo = "E";
    let now = moment();
    this.interesesSeleccionados = [];
    this.canalesSeleccionados = [];
    // this.fecha_actual = 
    this.fecha_inicio_seguimiento = moment(moment().startOf('year'), moment.ISO_8601).format();
    this.fecha_fin_seguimiento = moment(now.format(), moment.ISO_8601).format();
  }

  ngOnInit() {
    this.spinner.show();
    let p1 = this.getCanales();
    let p2 = this.getIntereses();
    let p3 = this.getCampanias();

    Promise.all([p1, p2,p3])
      .then(result => {
        this.spinner.hide();
        this.onSearch();
      })
      .catch(error => this.spinner.hide());
  }

  

  getCanales(){
    return new Promise((resolve, reject) => {
      this.canalService.getAll('?status=A').subscribe(
        (res:any) => {
          console.log(res);
          this.canales = res;
          resolve(true);
        },
        err => {
          reject();
        }
      );
    });
  }

  getIntereses(qs: String = ""){
    return new Promise((resolve, reject) => {
      this.interesService.getAll('?status=A').subscribe(
        (res:any) => {
          console.log(res);
         
          this.intereses = res;
          
          resolve(true);
        },
        err => {
          reject();
        }
      );
    });
  }

  onSearch(event:any = null){
    let qs = "";
    if(this.busqueda){
      qs += "&busqueda="+this.busqueda;
    }
    if (event != null) {
      qs += `&page=${event}`;
    }
    if(this.fecha_inicio_seguimiento){
      qs += "&fecha_inicio="+moment(this.fecha_inicio_seguimiento).format('YYYY-MM-DD');
    }
    if(this.fecha_fin_seguimiento){
      qs += "&fecha_fin="+moment(this.fecha_fin_seguimiento).format('YYYY-MM-DD');
    }
    if(this.tipo){
      qs += "&tipo="+this.tipo;
    }
    if(this.canalesSeleccionados.length > 0){
      let canalesId = [];
      this.canalesSeleccionados.forEach(canal=>{
        canalesId.push(canal.id);
      });
      qs += "&canales="+canalesId.join(',');
    }
    if(this.interesesSeleccionados.length > 0){
      let interesesId = [];
      this.interesesSeleccionados.forEach(interes=>{
        interesesId.push(interes.id);
      });
      qs += "&intereses="+interesesId.join(',');
    }
    this.spinner.show();
    this.getCampanias(qs).then(
      res => this.spinner.hide(),
      err => this.spinner.hide(),
    )

  }

  onCanalSelect(item: any) {
    this.onSearch();
    console.log(item);
  //  et intereses = [];
  //   this.campania.intereses.forEach(interes => {
  //     intereses.push(interes.nombre);
  //   });

  //   this.getRecomendacion(int lereses);
  }

  onCanalDeSelect(item: any) {
    this.onSearch();
    console.log(item);
  //  et intereses = [];
  //   this.campania.intereses.forEach(interes => {
  //     intereses.push(interes.nombre);
  //   });

  //   this.getRecomendacion(int lereses);
  }

  onSelectAllCanales(items: any) {
   
    this.canalesSeleccionados = items;
    console.log(items);
    this.onSearch();
  }

  onInteresSelect(item: any) {
    this.onSearch();
    console.log(item);
  //  et intereses = [];
  //   this.campania.intereses.forEach(interes => {
  //     intereses.push(interes.nombre);
  //   });

  //   this.getRecomendacion(int lereses);
  }
  onInteresDeSelect(item: any) {
    this.onSearch();
    console.log(item);
  //  et intereses = [];
  //   this.campania.intereses.forEach(interes => {
  //     intereses.push(interes.nombre);
  //   });

  //   this.getRecomendacion(int lereses);
  }

  onSelectAllInteres(items: any) {
    
    console.log(items);
    this.interesesSeleccionados = items;
    this.onSearch();
  }

  onDeSelectAllCanales(){
    this.canalesSeleccionados = [];
    this.onSearch();
  }
  onDeSelectAllInteres(){
    this.interesesSeleccionados = [];
    this.onSearch();
  }

  getCampanias(qs: String = ""){
    return new Promise((resolve, reject) => {
      console.log(qs);
      this.campaniaService.getReporteSeguimiento(`?per_page=${this.per_page}${qs}`).subscribe(
        (res:any) => {
          console.log(res);
          this.seguimientos = res.data;
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

  getPorcentaje(dividendo:number = 0, divisor:number = 0) {
    let porcentaje = 0;
    if( divisor > 0){
      porcentaje = (dividendo / divisor)*100;
    }
    return Math.round(porcentaje * 100) / 100;;
  }

  onKeyBackSpace(){
    if(this.busqueda == ''){
      this.onSearch();
    }
  }

  // onSearch(event:any = null){
  //   let qs = "";
  //   if(this.busqueda != ''){
  //     console.log("bus",this.busqueda);
  //     this.spinner.show();
  //     qs += `&busqueda=${this.busqueda}`;
      
  //   }
  //   if (event != null) {
  //     qs += `&page=${event}`;
  //   }

  //   this.getCampanias(qs).then(
  //     res => this.spinner.hide(),
  //     err => this.spinner.hide(),
  //   );
  // }
  onChangePage(event){
    // this.spinner.show();
    this.onSearch(event);
  }

}
