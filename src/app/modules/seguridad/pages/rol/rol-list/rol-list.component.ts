import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/core/services/login.service';
import { PermisoService } from 'src/app/core/services/permiso.service';
import { RolService } from 'src/app/core/services/rol.service';
import { RolAddModalComponent } from 'src/app/modules/seguridad/modals/rol-add-modal/rol-add-modal.component';
import { RolEditModalComponent } from 'src/app/modules/seguridad/modals/rol-edit-modal/rol-edit-modal.component';
import { Permiso } from 'src/app/theme/shared/models/Permiso';
import { Rol } from 'src/app/theme/shared/models/Rol';

import Swal from 'sweetalert2'
@Component({
  selector: 'app-rol-list',
  templateUrl: './rol-list.component.html',
  styleUrls: ['./rol-list.component.scss'],
  providers: [RolService]
})
export class RolListComponent implements OnInit {
  public roles: Array<any>;
  public permiso: Permiso;
  // sortedData: Usuario[];
  public busqueda: String;
  public advancePage: number;
  public collectionSize: number;
  public per_page: number;
  public currentPage: number;
  bsModalRef: BsModalRef;
  spinner1 = 'sp_page';
  constructor(
    private rolService: RolService,
    private spinner: NgxSpinnerService,
    // private modalService: NgbModal,
    private modalService: BsModalService,
    private loginService: LoginService,
    private permisoService: PermisoService,

  ) { 
    this.roles = [];
    this.busqueda = "";
    this.permiso = new Permiso();
    this.advancePage = 1;
    this.per_page = 5;
  }

  ngOnInit() {
    
    this.spinner.show(this.spinner1);
    let p1 = this.getRoles();
    let p2 = this.getPermiso();

    Promise.all([p1, p2])
      .then(result => this.spinner.hide(this.spinner1))
      .catch(error => this.spinner.hide(this.spinner1));
    // this.getPermiso();
    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);
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

  onKeyBackSpace(){
    if(this.busqueda == ''){
      this.spinner.show(this.spinner1);
      this.getRoles().then(
        res => this.spinner.hide(this.spinner1),
        err => this.spinner.hide(this.spinner1),
      );
    }
  }

  onSearch(event:any = null){
    let qs = "";
    this.spinner.show(this.spinner1);
    if(this.busqueda != ''){
      console.log("bus",this.busqueda);
      // this.spinner.show();
      qs += `&busqueda=${this.busqueda}`;
      
    }
    if (event != null) {
      qs += `&page=${event}`;
    }

    this.getRoles(qs).then(
      res => this.spinner.hide(this.spinner1),
      err => this.spinner.hide(this.spinner1),
    );
  }


  getRoles(qs: String = ""){
    // this.spinner.show(this.spinner1);
    return new Promise((resolve, reject) => {
      this.rolService.getAll(`?per_page=${this.per_page}${qs}`).subscribe(
        (res:any) => {
          console.log(res);
          this.roles = res.data;
          this.collectionSize = res.total;
          console.log(this.collectionSize);
          
          resolve(true);
        },
        err => {
          // this.spinner.hide(this.spinner1);
          reject();
        }
      );
    });
  }

  onChangePage(event){
    this.onSearch(event);
  }

  onActivar(rol){
    Swal.fire({
      title: '¿Está seguro de activar este rol?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Activar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show(this.spinner1);
        this.rolService.delete(rol.id).subscribe(
          (res: Array<any>) => {
            rol.status = 'A';
            this.spinner.hide(this.spinner1);
            Swal.fire(
              '¡Activado!',
              'El rol ha sido activado',
              'success'
            )
            
          }
          ,err => {
    
          }
        );
       
      }
    });
  }

  onDelete(rol: Rol) {
    Swal.fire({
      title: '¿Está seguro de eliminar este rol?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show(this.spinner1);
        this.rolService.delete(rol.id).subscribe(
          (res: Array<any>) => {
            rol.status = 'I';
            this.spinner.hide(this.spinner1);
            Swal.fire(
              '¡Eliminado!',
              'El rol ha sido eliminado',
              'success'
            )
            
          }
          ,err => {
    
          }
        );
       
      }
    });
   
  }

  onEdit(rol: Rol){
    const initialState = { 
      rol: rol
    };
    this.bsModalRef = this.modalService.show(RolEditModalComponent, Object.assign({initialState, class: 'modal-sm', backdrop: 'static'}));
    this.bsModalRef.content.sendRespuesta.subscribe(res =>{
        this.getRoles();
        console.log("res",res);
      }
    
    );
  }

  // onEdit(rol){
  //   const modalRef = this.modalService.open(RolEditModalComponent);
  //   modalRef.componentInstance.rol = rol;
  //   modalRef.componentInstance.sendRespuesta.subscribe(result => {
  //     console.log(result);
  //     if(result) {
  //       this.getRoles();
  //     }
  //   });
  // }
  onCreate(){
    // const modalRef = this.modalService.open(UsuarioAddModalComponent, { size: 'lg' });
    // modalRef.componentInstance.name = 'World';

    const initialState = {
    };
    this.bsModalRef = this.modalService.show(RolAddModalComponent, {initialState, class: 'modal-sm', backdrop: 'static'});
    this.bsModalRef.content.sendRespuesta.subscribe(res =>{
      this.getRoles();
      console.log("res",res);
      this.advancePage = 1;
    }
  
  );
  }
  
}
