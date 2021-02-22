import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/core/services/login.service';
import { PermisoService } from 'src/app/core/services/permiso.service';
import { RolService } from 'src/app/core/services/rol.service';
import { RolAddModalComponent } from 'src/app/theme/shared/modals/rol-add-modal/rol-add-modal.component';
import { RolEditModalComponent } from 'src/app/theme/shared/modals/rol-edit-modal/rol-edit-modal.component';
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
  constructor(
    private rolService: RolService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
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
    
    this.spinner.show();
    this.getRoles().then(
      res => this.spinner.hide(),
      err => this.spinner.hide(),
    );
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
      this.spinner.show();
      this.getRoles().then(
        res => this.spinner.hide(),
        err => this.spinner.hide(),
      );
    }
  }

  onSearch($event: KeyboardEvent){
    let qs = "";
    if(this.busqueda != ''){
      this.spinner.show();
      qs = `&busqueda=${this.busqueda}`;
      this.getRoles(1,qs).then(
        res => this.spinner.hide(),
        err => this.spinner.hide(),
      );
    }
    if (this.busqueda== '') {
      // On 'Shift+Enter' do this...
    }

    
  }


  getRoles(event=1,qs: string = ""){
    return new Promise ((resolve,reject) => {
      qs = `?page=${event}&per_page=${this.per_page}`;
      this.rolService.getAll(qs).subscribe(
        (res: any) => {
          console.log(res);
          this.roles = res.data;
          console.log(res);
          // this.advancePage = res.current_page;
          // this.usuarios = res.data;
          // this.dataSource = new MatTableDataSource(this.usuarios);
          // this.sortedData = this.usuarios.slice();
          this.collectionSize = res.total;
          console.log(this.collectionSize);
          // this.advancePage++;
          resolve(true);
        },
        err => {
  
        }
      );
    });
    
  }

  onChangePage(event){
    this.spinner.show();
    this.getRoles(event).then(
      res => this.spinner.hide(),
      err => this.spinner.hide(),
    )
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
        this.spinner.show();
        this.rolService.delete(rol.id).subscribe(
          (res: Array<any>) => {
            rol.status = 'A';
            this.spinner.hide();
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
        this.spinner.show();
        this.rolService.delete(rol.id).subscribe(
          (res: Array<any>) => {
            rol.status = 'I';
            this.spinner.hide();
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

  onEdit(rol){
    const modalRef = this.modalService.open(RolEditModalComponent);
    modalRef.componentInstance.rol = rol;
    modalRef.componentInstance.sendRespuesta.subscribe(result => {
      console.log(result);
      if(result) {
        this.getRoles();
      }
    });
  }
  onCreate(){
    const modalRef = this.modalService.open(RolAddModalComponent);
  }
  
}
