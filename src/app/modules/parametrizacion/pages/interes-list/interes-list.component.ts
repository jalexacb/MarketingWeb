import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { InteresService } from 'src/app/core/services/interes.service';
import { LoginService } from 'src/app/core/services/login.service';
import { PermisoService } from 'src/app/core/services/permiso.service';
import { Interes } from 'src/app/theme/shared/models/Interes';
import { Permiso } from 'src/app/theme/shared/models/Permiso';
import Swal from 'sweetalert2';
import { InteresAddModalComponent } from '../../modals/interes-add-modal/interes-add-modal.component';
import { InteresEditModalComponent } from '../../modals/interes-edit-modal/interes-edit-modal.component';
@Component({
  selector: 'app-interes-list',
  templateUrl: './interes-list.component.html',
  styleUrls: ['./interes-list.component.scss']
})
export class InteresListComponent implements OnInit {
  public intereses: Array<Interes>;
  public permiso: Permiso;
  public busqueda: String;
  public advancePage: number;
  public collectionSize: number;
  public per_page: number;
  public currentPage: number;
  spinner1 = 'sp_page';
  bsModalRef: BsModalRef;
  constructor(
    
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private interesService: InteresService,
    
    private loginService: LoginService,
    private permisoService: PermisoService,
  ) {
    this.intereses = [];
    this.permiso = new Permiso();
    
    this.busqueda = "";
    
    this.advancePage = 1;
    this.per_page = 5;
   }

  ngOnInit() {

    this.spinner.show(this.spinner1);
    let p1 = this.getInteres();
    let p2 = this.getPermiso();

    Promise.all([p1, p2])
      .then(result => this.spinner.hide(this.spinner1))
      .catch(error => this.spinner.hide(this.spinner1));
  }

  onKeyBackSpace(){
    if(this.busqueda == ''){
      this.spinner.show(this.spinner1);
      this.getInteres().then(
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

    this.getInteres(qs).then(
      res => this.spinner.hide(this.spinner1),
      err => this.spinner.hide(this.spinner1),
    );
  }

  getInteres(qs: String = ""){
    return new Promise((resolve, reject) => {
      this.interesService.getAll(`?per_page=${this.per_page}${qs}`).subscribe(
        (res:any) => {
          this.intereses = res.data;
          this.collectionSize = res.total;
          resolve(true);
        },
        err => {
          reject();
        }
      );
    });
  }

  onActivar(interes){
    Swal.fire({
      title: '¿Está seguro de activar este interes?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Activar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show(this.spinner1);
        this.interesService.delete(interes.id).subscribe(
          (res: Array<any>) => {
            interes.status = 'A';
            this.spinner.hide(this.spinner1);
            Swal.fire(
              '¡Activado!',
              'El interes ha sido activado',
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
      }, 
      err => {
      }
    )
  }

  onChangePage(event){
    this.onSearch();
  }

  onDelete(interes: Interes) {
    Swal.fire({
      title: '¿Está seguro de eliminar este interes?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show(this.spinner1);
        this.interesService.delete(interes.id).subscribe(
          (res: Array<any>) => {
            interes.status = 'I';
            this.spinner.hide(this.spinner1);
            Swal.fire(
              '¡Eliminado!',
              'El interes ha sido eliminado',
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
    this.bsModalRef = this.modalService.show(InteresAddModalComponent, {initialState, class: 'modal-sm', backdrop: 'static'});
    this.bsModalRef.content.sendRespuesta.subscribe(res =>{
      this.getInteres();
      this.advancePage = 1;
      

    });
  }

  onEdit(interes: Interes){
    const initialState = { 
      interes: interes
    };
    this.bsModalRef = this.modalService.show(InteresEditModalComponent, {initialState, class: 'modal-sm', backdrop: 'static'});
    this.bsModalRef.content.sendRespuesta.subscribe(res =>{
        this.getInteres();
        this.advancePage = 1;
      }
    
    );
  }
}
