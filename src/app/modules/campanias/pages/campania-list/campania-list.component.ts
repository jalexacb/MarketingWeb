import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/core/services/login.service';
import { PermisoService } from 'src/app/core/services/permiso.service';
import { Permiso } from 'src/app/theme/shared/models/Permiso';
import { CampaniaAddModalComponent } from '../../modals/campania-add-modal/campania-add-modal.component';
import Echo from "laravel-echo";
import { SocketService } from 'src/app/core/services/socket.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Campania } from 'src/app/theme/shared/models/Campania';
import { trim } from 'jquery';
import { CampaniaService } from 'src/app/core/services/campania.service';

import Swal from 'sweetalert2';
import { CampaniaEditModalComponent } from '../../modals/campania-edit-modal/campania-edit-modal.component';


@Component({
  selector: 'app-campania-list',
  templateUrl: './campania-list.component.html',
  styleUrls: ['./campania-list.component.scss']
})
export class CampaniaListComponent implements OnInit {
  public campanias: Array<Campania>;
  public busqueda: String;
  public permiso: Permiso;
  spinner1 = 'sp_page';
  echo: Echo = null;
  url_imagen = "";
  constructor(
    private modalService: NgbModal,
    private permisoService: PermisoService,
    private loginService: LoginService,
    private socketService: SocketService,
    private spinner: NgxSpinnerService,
    private campaniaService: CampaniaService,
  ) { 
    this.campanias = [];
  }

  ngOnInit() {
    this.spinner.show();
    let p1 = this.getCampanias();
    let p2 = this.getPermiso();

    Promise.all([p1, p2])
      .then(result => this.spinner.hide())
      .catch(error => this.spinner.hide());
   }

   getCampaniasTipo(tipo){
     return this.campanias.filter(campania => trim(campania.tipo) == trim(tipo));
   }


  getPermiso(){
    let usuario:any = this.loginService.getUsuarioIdentificado();
          let rol_id = usuario.rol_id;
          
    let qs = "?usuario_id="+localStorage.getItem('usuario_id')+"&menu_id="+localStorage.getItem('menu_id')+"&rol_id="+rol_id;
    return new Promise((resolve, reject)=>{
      this.permisoService.getPermisoByFilter(qs).subscribe(
        (res:Permiso) => {
          this.permiso = res;
          
          resolve(true);
        }, 
        err => {
          reject();
        }
      )
    });
  }

  getRecomendacion(){
    
    this.campaniaService.getRecomendacion().subscribe(
      (res:any) =>{
        
        let campaniasRecomendadas:any = Object.values(res);
        this.campanias.forEach(campania => {
          let campaniaRecomendado = campaniasRecomendadas.filter(campaniaR=>campania.id === campaniaR.id)[0];
          
          if(campaniaRecomendado){
            campania.recomendado = true;
          }else{
            campania.recomendado = false;
          }
        });
      }
    )
  }

  getHtmlFormat(string){
    
    const htmlFormat = [
      { symbol: '*', tag: 'b' },
      { symbol: '_', tag: 'em' },
      { symbol: '~', tag: 'del' },
      { symbol: '`', tag: 'code' },
    ];

    htmlFormat.forEach(({ symbol, tag }) => {
      if(!string) return;

      const regex = new RegExp(`\\${symbol}([^${symbol}]*)\\${symbol}`, 'gm');
      const match = string.match(regex);
      if(!match) return;

      match.forEach(m => {
          let formatted = m;
          for(let i=0; i<2; i++){
              formatted = formatted.replace(symbol, `<${i > 0 ? '/' : ''}${tag}>`);
          }
          string = string.replace(m, formatted);
      });
    });
    return string;
  }

  getCampanias(qs: String = ""){
    return new Promise((resolve, reject) => {
      this.campaniaService.getAll().subscribe(
        (res:any) => {
          
          this.campanias = res;
          this.getRecomendacion();
          resolve(true);
        },
        err => {
          reject();
        }
      );
    });
  }

  listen(){
    this.echo.private('test-channel')
      .listen('.CompaniaCreadaEvent', (e)=>{
        
        alert("Evento escuchado");
      });
  }

  onCreate(){
    const modalRef = this.modalService.open(CampaniaAddModalComponent, { size: 'lg' });
    modalRef.componentInstance.name = 'World';
    modalRef.result.then(
      res => this.onSearch(),
    );
  }

  onEdit(campania: Campania){
    const modalRef = this.modalService.open(CampaniaEditModalComponent, { size: 'lg' });
    modalRef.componentInstance.campania = campania;
    modalRef.result.then(
      res => this.onSearch(),
    );

  }
  onKeyBackSpace(){
    if(this.busqueda == ''){
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

    this.getCampanias(qs).then(
      res => this.spinner.hide(),
      err => this.spinner.hide(),
    );
  }
  ejecutarCampania(id){
    this.spinner.show();
    this.campaniaService.ejecutar(id).subscribe(
      res => {
        
        Swal.fire(
          'Ejecutada',
          'Se ha ejecutado con éxito',
          'success'
        );
        this.getCampanias().then(
          res => this.spinner.hide(),
          err => this.spinner.hide(),
        )  
      }, 
      err => {

      }
    )
  }

  archivarCampania(id){
    this.spinner.show();
    this.campaniaService.archivar(id).subscribe(
      res => {
        
        Swal.fire(
          'Archivada',
          'Se ha archivado con éxito',
          'success'
        );
        this.getCampanias().then(
          res => this.spinner.hide(),
          err => this.spinner.hide(),
        )   
      }, 
      err => {

      }
    )
  }

  activarCampania(id){
    this.spinner.show();
    this.campaniaService.activar(id).subscribe(
      res => {
        
       
        Swal.fire(
          'Activada',
          'Se ha activado con éxito',
          'success'
        );
        this.getCampanias().then(
          res => this.spinner.hide(),
          err => this.spinner.hide(),
        )  
      }, 
      err => {

      }
    )
  }

}
