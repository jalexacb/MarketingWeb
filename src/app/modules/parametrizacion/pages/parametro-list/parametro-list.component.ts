import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/core/services/login.service';
import { ParametroService } from 'src/app/core/services/parametro.service';
import { PermisoService } from 'src/app/core/services/permiso.service';
import { Parametro } from 'src/app/theme/shared/models/Parametro';
import { Permiso } from 'src/app/theme/shared/models/Permiso';

import Swal from 'sweetalert2';
import { ParametroAddModalComponent } from '../../modals/parametro-add-modal/parametro-add-modal.component';
import { ParametroEditModalComponent } from '../../modals/parametro-edit-modal/parametro-edit-modal.component';

@Component({
  selector: 'app-parametro-list',
  templateUrl: './parametro-list.component.html',
  styleUrls: ['./parametro-list.component.scss']
})
export class ParametroListComponent implements OnInit {
  public parametros: Array<Parametro>;
  public permiso: Permiso;
  public busqueda: String;
  public advancePage: number;
  public collectionSize: number;
  public per_page: number;
  public currentPage: number;
  constructor(
    private spinner: NgxSpinnerService,
    private parametroService: ParametroService,
    private modalService: NgbModal,
    private loginService: LoginService,
    private permisoService: PermisoService,
  ) {
    this.parametros = [];
    this.permiso = new Permiso();
    
    this.busqueda = "";
    
    this.advancePage = 1;
    this.per_page = 5;
   }

  ngOnInit() {
    this.spinner.show();
    let p1 = this.getParametros();
    let p2 = this.getPermiso();

    Promise.all([p1, p2])
      .then(result => this.spinner.hide())
      .catch(error => this.spinner.hide());
  }

  onKeyBackSpace(){
    if(this.busqueda == ''){
      this.spinner.show();
      this.getParametros().then(
        res => this.spinner.hide(),
        err => this.spinner.hide(),
      );
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

    this.getParametros(qs).then(
      res => this.spinner.hide(),
      err => this.spinner.hide(),
    );
  }

  getParametros(qs: String = ""){
    return new Promise((resolve, reject) => {
      this.parametroService.getAll(`?per_page=${this.per_page}${qs}`).subscribe(
        (res:any) => {
          console.log(res);
          // this.advancePage = res.current_page;
          this.parametros = res.data;
          console.log(this.parametros);
          // this.dataSource = new MatTableDataSource(this.usuarios);
          // this.sortedData = this.usuarios.slice();
          this.collectionSize = res.total;
          console.log(this.collectionSize);
          // this.advancePage++;
          resolve(true);
            /** spinner ends after 5 seconds */
            // this.spinner.hide();
          
        },
        err => {
          reject();
        }
      );
    });
  }

  onActivar(parametro){
    Swal.fire({
      title: '¿Está seguro de activar este parametro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Activar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.parametroService.delete(parametro.id).subscribe(
          (res: Array<any>) => {
            parametro.status = 'A';
            this.spinner.hide();
            Swal.fire(
              '¡Activado!',
              'El parametro ha sido activado',
              'success'
            )
            
          }
          ,err => {
    
          }
        );
       
      }
    });
  }

  getPermiso(){
    let usuario:any = this.loginService.getUsuarioIdentificado();
    let rol_id = usuario.rol_id;
    let qs = "?usuario_id="+localStorage.getItem('usuario_id')+"&menu_id="+localStorage.getItem('menu_id')+"&rol_id="+rol_id;
    this.permisoService.getPermisoByFilter(qs).subscribe(
      (res:Permiso) => {
        this.permiso = res;
        console.log(res);
      }, 
      err => {

      }
    )
  }

  onChangePage(event){
    this.spinner.show();
    this.getParametros(event).then(
      res => this.spinner.hide(),
      err => this.spinner.hide(),
    )
  }

  onDelete(parametro: Parametro) {
    Swal.fire({
      title: '¿Está seguro de eliminar este parámetro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.parametroService.delete(parametro.id).subscribe(
          (res: Array<any>) => {
            parametro.status = 'I';
            this.spinner.hide();
            Swal.fire(
              '¡Eliminado!',
              'El parámetro ha sido eliminado',
              'success'
            )
            
          }
          ,err => {
    
          }
        );
       
      }
    });
   
  }

  onCreate(){
    const modalRef = this.modalService.open(ParametroAddModalComponent, { size: 'lg' });
    modalRef.componentInstance.name = 'World';
    modalRef.result.then(
      res => this.onSearch(),
    );
  }

  onEdit(parametro: Parametro){
    const modalRef = this.modalService.open(ParametroEditModalComponent, { size: 'lg' });
    modalRef.componentInstance.parametro = parametro;
    modalRef.componentInstance.sendRespuesta.subscribe(result => {
      console.log(result);
      if(result) {

      }
    });
    

  }


}
