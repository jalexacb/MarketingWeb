import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Usuario } from 'src/app/theme/shared/models/Usuario';
import { NgbdSortableHeader, SortEvent } from 'src/app/theme/shared/directives/sortable.directive';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioAddModalComponent } from 'src/app/modules/seguridad/modals/usuario-add-modal/usuario-add-modal.component';
import Swal from 'sweetalert2'
import { UsuarioEditModalComponent } from '../../../modals/usuario-edit-modal/usuario-edit-modal.component';
import { LoginService } from 'src/app/core/services/login.service';
import { PermisoService } from 'src/app/core/services/permiso.service';
import { Permiso } from 'src/app/theme/shared/models/Permiso';
import { MenuService } from 'src/app/core/services/menu.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})

export class UsuarioListComponent implements OnInit {
  public usuarios: Array<Usuario>;
  sortedData: Usuario[];
  public permiso: Permiso;
  public busqueda: String;
  public advancePage: number;
  public collectionSize: number;
  public per_page: number;
  public currentPage: number;
  spinner1 = 'sp_page';
  bsModalRef: BsModalRef;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  constructor(
    private usuarioService: UsuarioService,
    private spinner: NgxSpinnerService,
    
    private loginService: LoginService,
    private permisoService: PermisoService,
    private menuService: MenuService,

    private modalService: BsModalService,
    
  ) { 
    this.permiso = new Permiso();
    this.usuarios = [];
    this.busqueda = "";
    
    this.advancePage = 1;
    this.per_page = 5;
  }

  ngOnInit() {
    this.spinner.show(this.spinner1);
    let p1 = this.getUsuarios();
    let p2 = this.getPermiso();

    Promise.all([p1, p2])
      .then(result => this.spinner.hide(this.spinner1))
      .catch(error => this.spinner.hide(this.spinner1));
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

  onChangePage(event){
    this.onSearch(event);
  }

  onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    if (direction === '' || column === '') {
      this.usuarios = this.usuarios;
    } else {
      this.usuarios = [...this.usuarios].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  getUsuarios(qs: String = "") {
    return new Promise((resolve, reject) => {
      this.usuarioService.getAll(`?per_page=${this.per_page}${qs}`).subscribe(
        (res:any) => {
          this.usuarios = res.data;
          
          this.sortedData = this.usuarios.slice();
          this.collectionSize = res.total;
          resolve(true);
        },
        err => {
          reject();
        }
      );
    });
    
  }

  onKeyBackSpace(){
    if(this.busqueda == ''){
      this.spinner.show(this.spinner1);
      this.getUsuarios().then(
        res => this.spinner.hide(this.spinner1),
        err => this.spinner.hide(this.spinner1),
      );
    }
  }

  onSearch(event:any = null){
    let qs = "";
    this.spinner.show(this.spinner1);
    if(this.busqueda != ''){
      qs += `&busqueda=${this.busqueda}`;
    }
    if (event != null) {
      qs += `&page=${event}`;
    }

    this.getUsuarios(qs).then(
      res => this.spinner.hide(this.spinner1),
      err => this.spinner.hide(this.spinner1),
    );
  }


  onActivar(usuario){
    Swal.fire({
      title: '¿Está seguro de activar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Activar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show(this.spinner1);
        this.usuarioService.delete(usuario.id).subscribe(
          (res: Array<any>) => {
            usuario.status = 'A';
            this.spinner.hide(this.spinner1);
            Swal.fire(
              '¡Activado!',
              'El usuario ha sido activado',
              'success'
            )
            
          }
          ,err => {
    
          }
        );
       
      }
    });
  }
  onDelete(usuario: Usuario) {
    Swal.fire({
      title: '¿Está seguro de eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show(this.spinner1);
        this.usuarioService.delete(usuario.id).subscribe(
          (res: Array<any>) => {
            usuario.status = 'I';
            this.spinner.hide(this.spinner1);
            Swal.fire(
              '¡Eliminado!',
              'El usuario ha sido eliminado',
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
    const initialState = {
    };
    this.bsModalRef = this.modalService.show(UsuarioAddModalComponent, {initialState, class: 'modal-lg', backdrop: 'static'});
  }

  onEdit(usuario: Usuario){
    const initialState = { 
      usuario: usuario
    };
    this.bsModalRef = this.modalService.show(UsuarioEditModalComponent, {initialState, class: 'modal-lg', backdrop: 'static'});
    this.bsModalRef.content.sendRespuesta.subscribe(res =>{
      this.getUsuarios();
        
        this.advancePage = 1;
    });
    

  }

}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
