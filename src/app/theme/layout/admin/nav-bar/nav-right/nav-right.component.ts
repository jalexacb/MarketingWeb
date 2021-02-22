import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
// import { Usuario } from 'src/app/theme/shared/models/Usuario';
import { LoginService } from 'src/app/core/services/login.service';
import { RolService } from 'src/app/core/services/rol.service';
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
    private usuarioService: LoginService,
    private rolService: RolService,
    public router: Router,
    
  ) { 
    this.usuario = null;
    this.rol = new Rol();
  }

  ngOnInit() {
    this.getUsuarioIdentificado();
   }

  getUsuarioIdentificado(){
    this.usuario = this.usuarioService.getUsuarioIdentificado();
    this.getRolById();
  }

  getRolById(){
    this.rolService.getById(this.usuario.rol_id).subscribe(
      (res:any) => {
        this.rol = res;
      },
      err => {

      }
    )
  }

  removeIdentidicacion(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
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
          return '/auth/signin';
    //     }
    //   }
    // )
  }
}
