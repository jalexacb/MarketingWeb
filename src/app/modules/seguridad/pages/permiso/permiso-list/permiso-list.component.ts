import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RolService } from 'src/app/core/services/rol.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { MenuService } from 'src/app/core/services/menu.service';
import { Rol } from 'src/app/theme/shared/models/Rol';
import { Usuario } from 'src/app/theme/shared/models/Usuario';
import { Permiso } from 'src/app/theme/shared/models/Permiso';
import { PermisoService } from 'src/app/core/services/permiso.service';
import Swal from 'sweetalert2';    
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-permiso-list',
  templateUrl: './permiso-list.component.html',
  styleUrls: ['./permiso-list.component.scss']
})
export class PermisoListComponent implements OnInit {

  public usuarios: Array<Usuario>;

  public roles: Array<Rol>;
  public menus: Array<any>;
  public usuario: Usuario;
  public rol: Rol;
  public tipo: string;
  public permisos: Array<Permiso>;
  public permiso: Permiso;
  public isEditable: boolean;
  spinner1 = 'sp_page';
  constructor(
    private modalService: NgbModal,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private menuService: MenuService,
    private permisoService: PermisoService,
    private spinner: NgxSpinnerService,
    private loginService: LoginService,
  ) {
    this.usuarios = [];
    this.menus = [];
    this.permisos = [];
    this.usuario = new Usuario();
    this.permiso = new Permiso();
    this.rol = new Rol();
    this.tipo = "";
    this.isEditable = false;
  }
  
  ngOnInit() {
    this.getPermiso();
    this.spinner.show(this.spinner1);
    let p1 = this.getUsuarios();
    let p2 = this.getRoles();
    let p3 = this.getMenus();
    let p4 = this.getPermiso();

    Promise.all([p1, p2,p3,p4])
      .then(result => this.spinner.hide(this.spinner1))
      .catch(error => this.spinner.hide(this.spinner1));
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

  onEditar(){
    this.isEditable=!this.isEditable;
    if(!this.isEditable){
      this.onChangeUsuarioRol();
    }
  }
  openModalUsuarios(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
      
    }, (reason) => {
      
    });
  }
  getUsuarios(qs: String = "") {
    
    return new Promise((resolve, reject) => {
      qs = "?status=A";
      this.usuarioService.getAll(qs).subscribe(
        (res: Array<Usuario>) => {
          this.usuarios = res;
          resolve(true);
        },
        err => {
          reject();
        }
      );
    });

  }

  onChangeUsuarioRol(){
    let qs = "?";
    this.permisos = [];
    
    this.spinner.show(this.spinner1);
    qs += (this.tipo == 'U'?`usuario_id=${this.usuario.id}`:`rol_id=${this.rol.id}`);
    return new Promise ((resolve,reject) => {

      this.permisoService.getAll(qs).subscribe(
        (res: any) => {

          this.permisos = res;
          this.spinner.hide(this.spinner1);
         
          this.setMenusPemrisos();
          
          resolve(true);
        },
        err => {
          reject();
          this.spinner.hide(this.spinner1);
        }
      );
    });
  }

  onChangeTipo(){
    this.permisos = [];
    this.usuario = new Usuario();
    this.rol = new Rol();
  }

  setMenusPemrisos(){
    if(this.permisos.length > 0){
      this.permisos.forEach(permiso =>{
        
        this.menus.forEach(menu =>{
          if(menu.id == permiso.menu_id){
            
            menu.activado = true;
            menu.ver = permiso.ver;
            menu.crear = permiso.crear;
            menu.editar = permiso.editar;
            menu.eliminar = permiso.eliminar;
            menu.todos = (menu.ver==true && menu.crear==true && menu.editar==true && menu.eliminar==true)?true:false;
          }
        });
        
      });
    }else{
      this.menus.forEach(menu =>{
        
          
          menu.activado = false;
          menu.ver = false
          menu.crear = false;
          menu.editar = false;
          menu.eliminar = false;
        
      });
    }
    
  }

  getRoles(event=1,qs: string = ""){
    return new Promise ((resolve,reject) => {
      qs = "?status=A";
      this.rolService.getAll(qs).subscribe(
        (res: any) => {

          this.roles = res;
          
          resolve(true);
        },
        err => {
          reject();
        }
      );
    });

  }

  getMenus(){
    return new Promise((resolve, reject) => {
      this.menuService.getAllMenus().subscribe( (res:any) => {
        this.menus = res;
        
        resolve(true);
      });
    });
  }

  onChange(menu,combo=null){
    if(combo == 'todos'){
      menu.crear = menu.todos;
      menu.ver = menu.todos;
      menu.editar = menu.todos;
      menu.eliminar = menu.todos;
    }else if(combo == 'ver'){
      menu.crear = !menu.ver?false:menu.crear;
      menu.editar = !menu.ver?false:menu.editar;
      menu.eliminar = !menu.ver?false:menu.eliminar;
    }else{
      menu.ver = (menu.ver||menu.crear||menu.editar||menu.eliminar)?true:false;
    }

    
    
    menu.todos = (menu.ver&&menu.crear&&menu.editar&&menu.eliminar)?true:false;
    menu.activado = (menu.ver||menu.crear || menu.editar || menu.eliminar)?true:false;
    let padre = this.menus.filter(m=>m.id == menu.padre_id)[0];
    this.switchPadre(padre,menu);
    let padrePrincipal = this.menus.filter(m=>m.id == padre.padre_id)[0];
    this.switchPadre(padrePrincipal,padre);
  }

  switchPadre(padre,menu){
    if(!padre.activado){
      padre.activado = true;
    }else if(!this.isTodosHijosMenu(menu.padre_id)){
      
      padre.activado = false;
    }
  }

  isTodosHijosMenu(padre_id){
    let isTodos = false;
    this.menus.forEach(menu=>{
      if(menu.padre_id == padre_id){
        if(((menu.todos) || (menu.ver) || (menu.crear) || (menu.editar) || (menu.eliminar)) || menu.activado){
          isTodos = true; 
        }
      }
    });
    
    return isTodos;
  }

  setValues(){
    this.permisos = [];
    this.menus.forEach(menu=>{
      if(menu.activado){
        let permiso = new Permiso();
        permiso.rol_id = this.tipo=="R"?this.rol.id:null;
        permiso.usuario_id = this.tipo=="U"?this.usuario.id:null;
        permiso.menu_id = menu.id;
        permiso.ver = menu.ver;
        permiso.crear = menu.crear;
        permiso.editar = menu.editar;
        permiso.eliminar = menu.eliminar;
        permiso.usuario_ingresa_id = localStorage.getItem('usuario_id');
        this.permisos.push(permiso);
      }
    });
    
  }

  onSubmit(){
    this.setValues();
    
    return new Promise( (resolve, reject) => {
      this.permisoService.save(this.permisos).subscribe(
        res => {
          Swal.fire(
            'Guardado!',
            'Se ha guardado con éxito',
            'success'
          )
          
          this.permisos = [];
          resolve(true);
        },
        err =>{
          reject();
        }
      )
    });

  }

}

function compare(a: number | string | String, b: number | string | String, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

