import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/core/services/login.service';
import { PermisoService } from 'src/app/core/services/permiso.service';
import { RegistroService } from 'src/app/core/services/registro.service';
import { Permiso } from 'src/app/theme/shared/models/Permiso';
import { Registro } from 'src/app/theme/shared/models/Registro';
@Component({
  selector: 'app-registro-list',
  templateUrl: './registro-list.component.html',
  styleUrls: ['./registro-list.component.scss']
})
export class RegistroListComponent implements OnInit {
  public registros: Array<Registro>;
  public busqueda: String;
  public advancePage: number;
  public collectionSize: number;
  public per_page: number;
  public currentPage: number;
  public permiso: Permiso;

  spinner1 = 'sp_page';
  constructor(
    private registroService: RegistroService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private loginService: LoginService,
    private permisoService: PermisoService,
  ) { 
    this.permiso = new Permiso();
    this.busqueda = "";
    
    this.advancePage = 1;
    this.per_page = 5;
  }

  ngOnInit() {
    this.spinner.show(this.spinner1);
    let p1 = this.getRegistros();
    let p2 = this.getPermiso();

    Promise.all([p1, p2])
      .then(result => this.spinner.hide(this.spinner1))
      .catch(error => this.spinner.hide(this.spinner1));
  }

  onKeyBackSpace(){
    if(this.busqueda == ''){
      this.spinner.show(this.spinner1);
      this.getRegistros().then(
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

    this.getRegistros(qs).then(
      res => this.spinner.hide(this.spinner1),
      err => this.spinner.hide(this.spinner1),
    );
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

  getRegistros(qs: String = ""){
    return new Promise((resolve, reject) => {
      this.registroService.getAll(`?per_page=${this.per_page}${qs}`).subscribe(
        (res:any) => {
          this.registros = res.data;
          this.collectionSize = res.total;
          resolve(true);
        },
        err => {
          reject();
        }
      );
    });
  }

  getTipo(tipo){
    let t = "";
    if(tipo == 'G'){
      t = "Guardar";
    }
    if(tipo == "M"){
      t = "Modificar";
    }
    if(tipo == "E"){
      t = "Eliminar";
    }
    if(tipo == "A"){
      t = "Activar";
    }
    return t;
  }

  onChangePage(event){
    
    this.onSearch(event);
  }

}
