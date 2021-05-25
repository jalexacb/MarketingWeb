import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContactoService } from 'src/app/core/services/contacto.service';
import { Contacto } from 'src/app/theme/shared/models/Contacto';
import { Permiso } from 'src/app/theme/shared/models/Permiso';
import * as moment from 'moment';
import { InteresService } from 'src/app/core/services/interes.service';
import { CanalService } from 'src/app/core/services/canal.service';
import { Canal } from 'src/app/theme/shared/models/Canal';
import { Interes } from 'src/app/theme/shared/models/Interes';
@Component({
  selector: 'app-comportamiento-clientes-list',
  templateUrl: './comportamiento-clientes-list.component.html',
  styleUrls: ['./comportamiento-clientes-list.component.scss']
})
export class ComportamientoClientesListComponent implements OnInit {
  public settingsSelect: {
  };
  public canales: Array<Canal>;
  public intereses: Array<Interes>;
  public canalesSeleccionados: Array<Canal>;
  public interesesSeleccionados: Array<Interes>;
  public contactos: Array<any>;
  public finalL = [];
  public busqueda: string;
  public advancePage: number;
  public collectionSize: number;
  public per_page: number;
  public currentPage: number;
  public permiso: Permiso;
  public fecha_inicio_seguimiento: any;
  public fecha_fin_seguimiento: any;
  public canal_id:string;
  public canalesNombres: Array<string>;
  constructor(
    private contactoService: ContactoService,
    private spinner: NgxSpinnerService,
    private canalService: CanalService,
    private interesService: InteresService,
  ) { 
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

    this.finalL = [
      ["Team1", "Description1", "Application1"],
      ["Team1", "Description2", "Application2"],
      ["Team1", "Description3", "Application3"],
      ["Team2", "Description1", "Application1"],
      ["Team2", "Description2", "Application2"],
      ["Team2", "Description3", "Application3"],
    ];
    
    this.contactos = [];
    let now = moment();
    this.canal_id = "";
    this.canalesSeleccionados = [];
    this.interesesSeleccionados = []; 
    // this.fecha_actual = 
    this.fecha_inicio_seguimiento = moment(moment().startOf('year'), moment.ISO_8601).format();
    this.fecha_fin_seguimiento = moment(now.format(), moment.ISO_8601).format();
  }

  ngOnInit() {
    this.spinner.show();
    let p1 = this.getCanales();
    let p2 = this.getIntereses();
    let p3 = this.getContactos();

    Promise.all([p1, p2,p3])
      .then(result => {
        this.spinner.hide();
        this.onSearch();
      })
      .catch(error => this.spinner.hide());
  }

  getNombresIntereses(contactoIntereses){
    let intereses = [];
    contactoIntereses.forEach(contactoInteres => {
      let interesExistente = intereses.filter(interes=> interes==contactoInteres.interes.nombre)[0];
      if(!interesExistente){
        intereses.push(contactoInteres.interes.nombre);
      }
     
    });
    return intereses.join(", ");
  }

  getNombresCanales(){
    let canales = [];
    if(this.canalesSeleccionados.length > 0){
      this.canalesSeleccionados.forEach(canal => {
        let canalExistente = canales.filter(interes=> interes==canal.nombre)[0];
        if(!canalExistente){
          canales.push(canal.nombre);
        }
      });
    }
    

    return canales.join(", ");
  }

  data() {
    // First find distinct teams and then filter information about him
    return this.finalL.map(x => x[0])
      .filter((v, i, a) => a.indexOf(v) === i)
      .map(x => ({ 
        name: x, 
        data: this.finalL.filter(y => y[0] === x)
      }));
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
    // if(this.canalesSeleccionados){
    //   let canalesId = [];
    //   this.canalesSeleccionados.forEach(canal=>{
    //     canalesId.push(canal.id);
    //   });
    //   qs += "&canal_id="+canalesId.join(',');
    // }

    // if(this.canal_id){
    //   qs += "&canal_id="+this.canal_id;
    // }
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
    this.getContactos(qs).then(
      res => this.spinner.hide(),
      err => this.spinner.hide(),
    )

  }

  getCanales(){
    return new Promise((resolve, reject) => {
      this.canalService.getAll('?status=A').subscribe(
        (res:any) => {
          console.log(res);
          this.canales = res;
          this.canalesSeleccionados = this.canales;
          // this.canal_id = this.canales[0].id;
          resolve(true);
        },
        err => {
          reject();
        }
      );
    });
  }

  onChangeCanal(event){
    console.log(event);
    // this.canalesNombres.push()
    this.onSearch();
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

  getContactos(qs: String = ""){
    return new Promise((resolve, reject) => {
      console.log(qs);
      this.contactoService.getReporteComportamiento(`?per_page=${this.per_page}${qs}`).subscribe(
        (res:any) => {
          console.log(res);
          this.contactos = res.data;
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

  onCanalSelect(item: any) {
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
    this.onSearch();
    console.log(items);
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
  onCanalDeSelect(item: any) {
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

  onDeSelectAllCanales(){
    this.canalesSeleccionados = [];
    this.onSearch();
  }
  onDeSelectAllInteres(){
    this.interesesSeleccionados = [];
    this.onSearch();
  }

  onSelectAllInteres(items: any) {
    this.interesesSeleccionados = [];
    this.onSearch();
    console.log(items);
  }

  onKeyBackSpace(){
    if(this.busqueda == ''){
      this.onSearch();
    }
  }

  onChangePage(event){
    // this.spinner.show();
    this.onSearch(event);
  }



}
