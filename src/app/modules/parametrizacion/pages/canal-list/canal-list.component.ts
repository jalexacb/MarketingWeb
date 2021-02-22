import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CanalService } from 'src/app/core/services/canal.service';
import { LoginService } from 'src/app/core/services/login.service';
import { PermisoService } from 'src/app/core/services/permiso.service';
import { Canal } from 'src/app/theme/shared/models/Canal';
import { Permiso } from 'src/app/theme/shared/models/Permiso';

import Swal from 'sweetalert2';
import { CanalAddModalComponent } from '../../modals/canal-add-modal/canal-add-modal.component';
import { CanalEditModalComponent } from '../../modals/canal-edit-modal/canal-edit-modal.component';

@Component({
  selector: 'app-canal-list',
  templateUrl: './canal-list.component.html',
  styleUrls: ['./canal-list.component.scss']
})
export class CanalListComponent implements OnInit {
  public canales: Array<Canal>;
  public permiso: Permiso;
  public busqueda: String;
  public advancePage: number;
  public collectionSize: number;
  public per_page: number;
  public currentPage: number;
  constructor(
    private spinner: NgxSpinnerService,
    private canalService: CanalService,
    private modalService: NgbModal,
    private loginService: LoginService,
    private permisoService: PermisoService,
  ) { 
    this.canales = [];
    this.permiso = new Permiso();
    
    this.busqueda = "";
    
    this.advancePage = 1;
    this.per_page = 5;
  }

  ngOnInit() {
    this.spinner.show();
    let p1 = this.getCanales();
    let p2 = this.getPermiso();

    Promise.all([p1, p2])
      .then(result => this.spinner.hide())
      .catch(error => this.spinner.hide());
  }

  onKeyBackSpace(){
    if(this.busqueda == ''){
      this.spinner.show();
      this.getCanales().then(
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

    this.getCanales(qs).then(
      res => this.spinner.hide(),
      err => this.spinner.hide(),
    );
  }

  getCanales(qs: String = ""){
    return new Promise((resolve, reject) => {
      this.canalService.getAll(`?per_page=${this.per_page}${qs}`).subscribe(
        (res:any) => {
          console.log(res);
          this.canales = res.data;
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

  onActivar(canal){
    Swal.fire({
      title: '¿Está seguro de activar este canal?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Activar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.canalService.delete(canal.id).subscribe(
          (res: Array<any>) => {
            canal.status = 'A';
            this.spinner.hide();
            Swal.fire(
              '¡Activado!',
              'El canal ha sido activado',
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
        console.log("permiso",res);
      }, 
      err => {

      }
    )
  }

  onChangePage(event){
    this.spinner.show();
    this.getCanales(event).then(
      res => this.spinner.hide(),
      err => this.spinner.hide(),
    )
  }

  onDelete(canal: Canal) {
    Swal.fire({
      title: '¿Está seguro de eliminar este canal?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.canalService.delete(canal.id).subscribe(
          (res: Array<any>) => {
            canal.status = 'I';
            this.spinner.hide();
            Swal.fire(
              '¡Eliminado!',
              'El canal ha sido eliminado',
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
    const modalRef = this.modalService.open(CanalAddModalComponent, { size: 'sm' });
    modalRef.componentInstance.name = 'World';
    modalRef.result.then(
      res => this.onSearch(),
    );
  }

  onEdit(canal: Canal){
    const modalRef = this.modalService.open(CanalEditModalComponent, { size: 'sm' });
    modalRef.componentInstance.canal = canal;
    modalRef.result.then(
      res => this.onSearch(),
    );
  }


}
