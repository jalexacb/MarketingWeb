import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/core/services/login.service';
import { ObjetivoService } from 'src/app/core/services/objetivo.service';
import { PermisoService } from 'src/app/core/services/permiso.service';
import { Objetivo } from 'src/app/theme/shared/models/Objetivo';
import { Permiso } from 'src/app/theme/shared/models/Permiso';
import { ObjetivoAddModalComponent } from '../../modals/objetivo-add-modal/objetivo-add-modal.component';
import { ObjetivoEditModalComponent } from '../../modals/objetivo-edit-modal/objetivo-edit-modal.component';
import Swal from 'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-objetivo-list',
  templateUrl: './objetivo-list.component.html',
  styleUrls: ['./objetivo-list.component.scss']
})
export class ObjetivoListComponent implements OnInit {
  public objetivos: Array<Objetivo>;
  public permiso: Permiso;
  public busqueda: String;
  public advancePage: number;
  public collectionSize: number;
  public per_page: number;
  public currentPage: number;
  bsModalRef: BsModalRef;
  spinner1 = 'sp_page';
  constructor(
    private spinner: NgxSpinnerService,
    private objetivoService: ObjetivoService,
    
    private loginService: LoginService,
    private permisoService: PermisoService,
    private modalService: BsModalService,
  ) { 
    this.objetivos = [];
    this.permiso = new Permiso();
    
    this.busqueda = "";
    
    this.advancePage = 1;
    this.per_page = 5;
  }

  ngOnInit() {
    this.spinner.show(this.spinner1);
    let p1 = this.getObjetivos();
    let p2 = this.getPermiso();

    Promise.all([p1, p2])
      .then(result => this.spinner.hide(this.spinner1))
      .catch(error => this.spinner.hide(this.spinner1));
  }

  onKeyBackSpace(){
    if(this.busqueda == ''){
      this.spinner.show(this.spinner1);
      this.getObjetivos().then(
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

    this.getObjetivos(qs).then(
      res => this.spinner.hide(this.spinner1),
      err => this.spinner.hide(this.spinner1),
    );
  }

  getObjetivos(qs: String = ""){
    return new Promise((resolve, reject) => {
      this.objetivoService.getAll(`?per_page=${this.per_page}${qs}`).subscribe(
        (res:any) => {
          
          this.objetivos = res.data;
          this.collectionSize = res.total;
          
          resolve(true);
        },
        err => {
          reject();
        }
      );
    });
  }

  onActivar(objetivo){
    Swal.fire({
      title: '¿Está seguro de activar este objetivo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Activar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show(this.spinner1);
        this.objetivoService.delete(objetivo.id).subscribe(
          (res: Array<any>) => {
            objetivo.status = 'A';
            this.spinner.hide(this.spinner1);
            Swal.fire(
              '¡Activado!',
              'El objetivo ha sido activado',
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
    this.onSearch(event);
  }

  onDelete(objetivo: Objetivo) {
    Swal.fire({
      title: '¿Está seguro de eliminar este objetivo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show(this.spinner1);
        this.objetivoService.delete(objetivo.id).subscribe(
          (res: Array<any>) => {
            objetivo.status = 'I';
            this.spinner.hide(this.spinner1);
            Swal.fire(
              '¡Eliminado!',
              'El objetivo ha sido eliminado',
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
    this.bsModalRef = this.modalService.show(ObjetivoAddModalComponent, {initialState, class: 'modal-sm', backdrop: 'static'});
    this.bsModalRef.content.sendRespuesta.subscribe(res =>{
      this.getObjetivos();
      this.advancePage = 1;
    });
  }

  onEdit(objetivo: Objetivo){
    const initialState = { 
      objetivo: objetivo
    };
    this.bsModalRef = this.modalService.show(ObjetivoEditModalComponent, {initialState, class: 'modal-sm', backdrop: 'static'});
    this.bsModalRef.content.sendRespuesta.subscribe(res =>{
      this.getObjetivos();
      this.advancePage = 1;
        
    }
    
    );
  }
}

