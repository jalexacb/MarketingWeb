import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/theme/shared/models/Usuario';
import { LoginService } from 'src/app/core/services/login.service';
import * as moment from 'moment';


@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss'],
  // providers: [
  //   LoginService,
  // ],
})
export class AuthSigninComponent implements OnInit {
  public usuario: Usuario;
  public status: String;
  public token: string;
  public identity: any;
  private usuario_bloqueado: any;
  public is_bloqueado: boolean;
  public is_advertencia: boolean;
  public is_cargando:boolean;
  public mensajeError: string = "";
  constructor(
    private usuarioService: LoginService,
    public router: Router,
  ) { 
    this.usuario = new Usuario();
    this.status = "";
    this.token = "";
    this.identity = null;
    this.is_advertencia = false;
    // this.usuario_bloqueado_id ;
  }

  ngOnInit() {
    localStorage.setItem('hola','johanna');
    let usuario_bloqueado:any = localStorage.getItem('usuario_bloqueado');
    usuario_bloqueado = JSON.parse(usuario_bloqueado);
    
    this.is_bloqueado = false;
    if( usuario_bloqueado ) {
      this.esperadesbloqueoUsuario(usuario_bloqueado)
    }

  }

  esperadesbloqueoUsuario(usuario_bloqueado){
      let now = moment();
      let hora_final = moment(usuario_bloqueado.fecha_bloqueado);
      let diferencia = hora_final.diff(now);
      this.usuario_bloqueado = usuario_bloqueado;
      this.is_bloqueado = true;
      setTimeout(() => {
        this.desbloquearUsuario(usuario_bloqueado);
      }, diferencia);
  }

  desbloquearUsuario(usuario_bloqueado){
    this.usuarioService.desbloqueoUsuario(usuario_bloqueado.config_usuario_bloqueado_id).subscribe(
      res => {
         localStorage.removeItem('usuario_bloqueado');
         this.is_bloqueado = false;
      },
      err => {
        this.status = 'error';
      }
    );
  }

  



  EnterSubmit(event, form) { 
    if (event.keyCode === 13) {
      this.onSubmit(); 
    }
  } 

  onClick(event){
    if(event.type=='password')
      event.type = "text";
    else
      event.type = 'password';
  }

  setValues(){
    this.usuario.usuario = this.usuario.usuario.trim();
    this.usuario.password = this.usuario.password.trim();
  }

  onSubmit(){
    this.setValues();
    this.is_advertencia = false;
    if(this.usuario.usuario == '' || this.usuario.password == ''){
      this.is_advertencia = true;
      this.mensajeError = "Rellene los campos correctamente."
      return false;
    }
    this.is_cargando = true;
    this.usuarioService.login(this.usuario).subscribe(
      res => {
        if( res.status != 'error' ){
          this.status = 'success';
          this.token = res;
          this.usuarioService.login(this.usuario, true).subscribe(
            res => {
              this.identity = res;
              this.is_cargando = false;
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));
              localStorage.setItem('usuario_id', this.identity.sub);
              this.router.navigate(['/reporteria/tablero']); 
            }, 
            err => {
              this.status = 'error';
              
            }
          )
        }else if( res.status == 'error') {
          if(res.message == 'Bloqueado'){
            this.status = 'error';
            this.usuario_bloqueado = res.info;
            let usuario_bloqueado = localStorage.getItem('usuario_bloqueado');
            usuario_bloqueado = JSON.parse(usuario_bloqueado);
            if (!usuario_bloqueado) {
              this.is_bloqueado = true;
              this.is_advertencia = false;
              localStorage.setItem('usuario_bloqueado', JSON.stringify(this.usuario_bloqueado));
              this.mensajeError = "Ha superado el límite de intentos. Para proteger sus datos, ha sido bloqueado. Inténtelo más tarde.";
              this.esperadesbloqueoUsuario(this.usuario_bloqueado);
            }else if(usuario_bloqueado && this.is_bloqueado) {
              this.mensajeError = `Su cuenta se encuentra bloqueada temporalmente por ${ this.usuario_bloqueado.tiempo_espera_login } min.`;
            }
          }else if (res.message == 'Advertencia') {
            this.is_advertencia = true;
            this.mensajeError = "La contraseña es incorrecta. Vuelva a intentarlo.";
          }
          this.is_cargando = false;
        }
      },
      err => {
        this.status = 'error';
      }
    )
  }

}
