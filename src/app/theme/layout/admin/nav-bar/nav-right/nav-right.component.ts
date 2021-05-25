import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
// import { Usuario } from 'src/app/theme/shared/models/Usuario';
import { LoginService } from 'src/app/core/services/login.service';
import { RolService } from 'src/app/core/services/rol.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Rol } from 'src/app/theme/shared/models/Rol';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig,LoginService]
})
export class NavRightComponent implements OnInit {
  public usuario: any;
  public rol: Rol;
  constructor(
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    public router: Router,
    
  ) { 
    this.usuario = {};
    this.rol = new Rol();
  }

  ngOnInit() {
    this.getUsuarioIdentificado();
    
    
    // Promise.all([p1]);
   }

  getUsuarioIdentificado(){
    this.usuario = this.loginService.getUsuarioIdentificado();
    this.getRolById();
    this.getUsuarioById();
  }

  getUsuarioById(){
    return new Promise((resolve, reject) => {
      this.usuarioService.getById(this.usuario.sub).subscribe(
        (res:any) => {
          this.usuario = res;
          resolve(true);
        },
        err => {
          reject();
        }
      )
    });
  }

  getRolById(){
    return new Promise((resolve, reject) => {
      this.rolService.getById(this.usuario.rol_id).subscribe(
        (res:any) => {
          this.rol = res;
          resolve(true);
        },
        err => {
          reject();
        }
      )
    });
  }

  removeIdentidicacion(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.removeItem('menu_id');
    localStorage.removeItem('usuario_id');

    // localStorage.clear();
  }

  logout(){
    // let 
    // this.route.params.subscribe(
    //   params => {
    //     let logout = +params['sure'];
    //     if(logout == 1) {
          

          // this.usuario = null;
          // this.token = null;

          // this.router.navigate(['/auth/signin']);
          return '/auth/login';
    //     }
    //   }
    // )
  }
}
