import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioService } from 'src/app/core/services/usuario.service';


import { Usuario } from 'src/app/theme/shared/models/Usuario';

// import {MatSort, Sort} from '@angular/material/sort';
// import {MatTableDataSource} from '@angular/material/table';
// import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import { NgbdSortableHeader, SortEvent } from 'src/app/theme/shared/directives/sortable.directive';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioAddModalComponent } from 'src/app/modules/seguridad/modals/usuario-add-modal/usuario-add-modal.component';



import Swal from 'sweetalert2'
import { UsuarioEditModalComponent } from '../../../modals/usuario-edit-modal/usuario-edit-modal.component';
import { LoginService } from 'src/app/core/services/login.service';
import { PermisoService } from 'src/app/core/services/permiso.service';
import { Permiso } from 'src/app/theme/shared/models/Permiso';
import { MenuService } from 'src/app/core/services/menu.service';
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
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // @ViewChild(MatSort, { static: false}) sort: MatSort;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  constructor(
    private usuarioService: UsuarioService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private loginService: LoginService,
    private permisoService: PermisoService,
    private menuService: MenuService,
    // private paginatorp: MatPaginatorIntl
  ) { 
    this.permiso = new Permiso();
    this.usuarios = [];
    this.busqueda = "";
    // this.paginatorp.itemsPerPageLabel = ""
    this.advancePage = 1;
    this.per_page = 5;
    
    // this.collectionSize = 0;
    // this.paginatorp.la
  }



  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;

  // }
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
          console.log(res);
          resolve(true);
        }, 
        err => {
          reject();
        }
      )
    });
     
  }

  onClick(event){
    console.log(event);
    
  }

  onChangePage(event){
    this.spinner.show(this.spinner1);
    this.getUsuarios(event).then(
      res => this.spinner.hide(this.spinner1),
      err => this.spinner.hide(this.spinner1),
    )
  }

  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
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
    // this.spinner.show(this.spinner1);
    // this.
    // console.log("current",event);
    // qs = ;
    return new Promise((resolve, reject) => {
      this.usuarioService.getAll(`?per_page=${this.per_page}${qs}`).subscribe(
        (res:any) => {
          console.log(res);
          // this.advancePage = res.current_page;
          this.usuarios = res.data;
          // this.dataSource = new MatTableDataSource(this.usuarios);
          this.sortedData = this.usuarios.slice();
          this.collectionSize = res.total;
          console.log(this.collectionSize);
          // this.advancePage++;
          resolve(true);
            /** spinner ends after 5 seconds */
            // this.spinner.hide(this.spinner1);
          
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
    if(this.busqueda != ''){
      console.log("bus",this.busqueda);
      this.spinner.show(this.spinner1);
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
    const modalRef = this.modalService.open(UsuarioAddModalComponent, { size: 'lg' });
    modalRef.componentInstance.name = 'World';
  }

  onEdit(usuario: Usuario){
    const modalRef = this.modalService.open(UsuarioEditModalComponent, { size: 'lg' });
    modalRef.componentInstance.usuario = usuario;
    modalRef.componentInstance.sendRespuesta.subscribe(result => {
      console.log(result);
      if(result) {

      }
    });
    

  }

}

// function compare(a: number | string | String, b: number | string | String, isAsc: boolean) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }


const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
