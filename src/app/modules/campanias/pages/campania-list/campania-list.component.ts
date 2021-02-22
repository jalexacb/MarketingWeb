import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/core/services/login.service';
import { PermisoService } from 'src/app/core/services/permiso.service';
import { Permiso } from 'src/app/theme/shared/models/Permiso';
import { CampaniaAddModalComponent } from '../../modals/campania-add-modal/campania-add-modal.component';
// import { Echo } '../../../../../../node_modules/laravel-echo/dist/echo';
// import * as io from 'socket.io-client';
import Echo from "laravel-echo";
import { SocketService } from 'src/app/core/services/socket.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Campania } from 'src/app/theme/shared/models/Campania';
import { trim } from 'jquery';
import { CampaniaService } from 'src/app/core/services/campania.service';

import Swal from 'sweetalert2';
import { CampaniaEditModalComponent } from '../../modals/campania-edit-modal/campania-edit-modal.component';
// // declare global {
// //   interface Window { io: any; }
// //   interface Window { Echo: any; }
// // }

// // declare var Echo: any;

// // window.io = window.io || require('socket.io-client');
// // window.Echo = window.Echo || {};


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
  // socket: any;
  // readonly url: string = "http:localhost:6001";
  echo: Echo = null;
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
    // // this.spinner.show(this.spinner1);
    // // this.spinner.hide();
    // this.socketService.listen();
    // this.socket = io(this.url);
    // this.getPermiso();
    // this.echo = new Echo({
    //   broadcaster: 'socket.io',
    //   host: 'http://localhost:6001',

    // });

    // window['echo'] = this.echo;
    // this.listen();
   
    // window.Echo.channel('testt')
    //     .listen('.channelEvent', (data) => {
    //       console.log('From laravel echo: ', data);
    //     });

  //   window.Echo = new window.LaravelEcho({
  //     broadcaster: 'socket.io',
  //     host: window.location.hostname + ':3000'
  // });
  // // I use different types of `listen` for testing
  // Echo.channel("model.ANNOUNCEMENT.2")
  //     .listen(".*", function(e) {
  //         console.log(e);
  //     })
  //     .listen("*", function(e) {
  //         console.log(e);
  //     })
  //     .listen("FieldWasUpdated", function(e) {
  //         console.log(e);
  //     })
  //     .listen(".FieldWasUpdated", function(e) {
  //         console.log(e);
  //     })
   }

   getCampaniasTipo(tipo){
     return this.campanias.filter(campania => trim(campania.tipo) == trim(tipo));
   }


  getPermiso(){
    let usuario:any = this.loginService.getUsuarioIdentificado();
          let rol_id = usuario.rol_id;
          // let qs = "?
    let qs = "?usuario_id="+localStorage.getItem('usuario_id')+"&menu_id=17"+"&rol_id="+rol_id;
    return new Promise((resolve, reject)=>{
      this.permisoService.getPermisoByFilter(qs).subscribe(
        (res:Permiso) => {
          this.permiso = res;
          console.log(res);
          resolve(true);
        }, 
        err => {
          reject();
        }
      )
    });
  }

  getCampanias(qs: String = ""){
    return new Promise((resolve, reject) => {
      this.campaniaService.getAll().subscribe(
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

  listen(){
    this.echo.private('test-channel')
      .listen('.CompaniaCreadaEvent', (e)=>{
        console.log(e);
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
      // this.spinner.show();
      // this.getUsuarios().then(
      //   res => this.spinner.hide(),
      //   err => this.spinner.hide(),
      // );
    }
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

    this.getCampanias(qs).then(
      res => this.spinner.hide(),
      err => this.spinner.hide(),
    );
  }
  ejecutarCampania(id){
    this.campaniaService.ejecutar(id).subscribe(
      res => {
        console.log(res);
        Swal.fire(
          'Ejecutada',
          'Se ha ejecutado con éxito',
          'success'
        );
           
      }, 
      err => {

      }
    )
  }

}
