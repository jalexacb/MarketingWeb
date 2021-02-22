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
  // sortedData: Usuario[];
  // public busqueda: String;
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // @ViewChild(MatSort, { static: false}) sort: MatSort;
  constructor(
    private modalService: NgbModal,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private menuService: MenuService,
    private permisoService: PermisoService,
    private spinner: NgxSpinnerService,
    
    private loginService: LoginService,

    // private usuarioService: UsuarioService,
    // private spinner: NgxSpinnerService,
    // private paginatorp: MatPaginatorIntl
  ) {
    this.usuarios = [];
    this.menus = [];
    this.permisos = [];
    this.usuario = new Usuario();
    this.permiso = new Permiso();
    this.rol = new Rol();
    this.tipo = "";
    this.isEditable = false;
    // this.busqueda = "";
    // this.paginatorp.itemsPerPageLabel = ""
    // this.paginatorp.la
  }



  // // ngAfterViewInit() {
  // //   this.dataSource.sort = this.sort;

  // // }
  ngOnInit() {
    // this.spinner.show();
    this.getUsuarios();
    this.getRoles();
    this.getMenus();
    this.getPermiso();
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
        console.log("permiso",res);
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
      // this.closeResult = `Closed with: ${result}`;
      console.log("cerrado");
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getUsuarios(qs: String = "") {
    // this.spinner.show();
    return new Promise((resolve, reject) => {
      qs = "?status=A";
      this.usuarioService.getAll(qs).subscribe(
        (res: Array<Usuario>) => {
          console.log(res);
          this.usuarios = res;
          // this.dataSource = new MatTableDataSource(this.usuarios);
          // this.sortedData = this.usuarios.slice();
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

  onChangeUsuarioRol(){
    let qs = "?";
    this.spinner.show();
    qs += (this.tipo == 'U'?`usuario_id=${this.usuario.id}`:`rol_id=${this.rol.id}`);
    return new Promise ((resolve,reject) => {

      this.permisoService.getAll(qs).subscribe(
        (res: any) => {

          this.permisos = res;
          this.spinner.hide();
         
          this.setMenusPemrisos();
          // this.advancePage++;
          resolve(true);
        },
        err => {
          this.spinner.hide();
        }
      );
    });
  }

  setMenusPemrisos(){
    if(this.permisos.length > 0){
      this.permisos.forEach(permiso =>{
        // let menu:any = this.menus.filter(m => m.id == permiso.menu_id);
        this.menus.forEach(menu =>{
          if(menu.id == permiso.menu_id){
            console.log(menu);
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
        // if(menu.id == permiso.menu_id){
          console.log(menu);
          menu.activado = false;
          menu.ver = false
          menu.crear = false;
          menu.editar = false;
          menu.eliminar = false;
        // }
      });
    }
    
  }

  getRoles(event=1,qs: string = ""){
    return new Promise ((resolve,reject) => {
      qs = "?status=A";
      this.rolService.getAll(qs).subscribe(
        (res: any) => {

          this.roles = res;
          console.log(res);
          // this.advancePage = res.current_page;
          // this.usuarios = res.data;
          // this.dataSource = new MatTableDataSource(this.usuarios);
          // this.sortedData = this.usuarios.slice();

          // this.advancePage++;
          resolve(true);
        },
        err => {

        }
      );
    });

  }

  getMenus(){
    return new Promise((resolve, reject) => {
      this.menuService.getAllMenus().subscribe( (res:any) => {
        this.menus = res;
        console.log(res);
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

    console.log("debug",menu.ver);
    // menu.ver = (menu.crear||menu.editar||menu.eliminar)?true:false;
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
      console.log("desactivar padre");
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
        console.log(permiso);
        console.log(menu);
        this.permisos.push(permiso);
      }
    });
    
  }

  onSubmit(){
    this.setValues();
    console.log(this.permisos);
    return new Promise( (resolve, reject) => {
      this.permisoService.save(this.permisos).subscribe(
        res => {
          Swal.fire(
            'Guardado!',
            'Se ha guardado con éxito',
            'success'
          )
          console.log("Se ha guardado");
          this.permisos = [];
        },
        err =>{

        }
      )
    });

  }


  // sortData(sort: Sort) {
  //   const data = this.usuarios.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.sortedData = data;
  //     return;
  //   }
  //   console.log(sort);
  //   this.sortedData = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       // case 'usuario': return compare(a.usuario, b.usuario, isAsc);
  //       case 'usuario': return compare(a.usuario, b.usuario, isAsc);
  //       case 'rol': return compare(a.rol.nombre, b.rol.nombre, isAsc);
  //       case 'nombres': return compare(a.nombres, b.nombres, isAsc);
  //       // case 'nombres': return compare(a.nombres, b.nombres, isAsc);
  //       case 'apellidos': return compare(a.apellidos, b.apellidos, isAsc);
  //       // case 'fat': return compare(a.fat, b.fat, isAsc);
  //       // case 'carbs': return compare(a.carbs, b.carbs, isAsc);
  //       // case 'protein': return compare(a.protein, b.protein, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }

  // onEdit() {

  // }


  // onKeyBackSpace(){
  //   if(this.busqueda == ''){
  //     this.spinner.show();
  //     this.getUsuarios().then(
  //       res => this.spinner.hide(),
  //       err => this.spinner.hide(),
  //     );
  //   }
  // }

  // onSearch($event: KeyboardEvent){
  //   let qs = "";
  //   if(this.busqueda != ''){
  //     this.spinner.show();
  //     qs = `?busqueda=${this.busqueda}`;
  //     this.getUsuarios(qs).then(
  //       res => this.spinner.hide(),
  //       err => this.spinner.hide(),
  //     );
  //   }
  //   if (this.busqueda== '') {
  //     // On 'Shift+Enter' do this...
  //   }


  // }

  // onDelete(id: number) {

  //   this.usuarioService.delete(id).subscribe(
  //     (res: Array<any>) => {
  //       this.spinner.show();
  //       this.getUsuarios().then(
  //         res => this.spinner.hide(),
  //         err => this.spinner.hide(),
  //       );
  //     }
  //     ,err => {

  //     }
  //   );
  // }

}

function compare(a: number | string | String, b: number | string | String, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

