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
      console.log("Bloqueado por inicio", usuario_bloqueado);
      // let hora_final = 
      
      this.esperadesbloqueoUsuario(usuario_bloqueado)
    }

  }

  esperadesbloqueoUsuario(usuario_bloqueado){
      
      console.log("1",usuario_bloqueado);
      // let tiempo_bloqueo = 
      
      let now = moment();
      let hora_final = moment(usuario_bloqueado.fecha_bloqueado);
      let diferencia = hora_final.diff(now);
      console.log(now.format('HH:mm:ss'));
      console.log(diferencia);
      this.usuario_bloqueado = usuario_bloqueado;
      // let hora_actual = moment.duration(now, "HH:mm");
      // let hora_final = moment.duration(usuario_bloqueado.fecha_bloqueado, "HH:mm"),
      // diff = end.subtract(start);
      this.is_bloqueado = true;
      setTimeout(() => {
        
        this.desbloquearUsuario(usuario_bloqueado);
        
      }, diferencia);
  }

  desbloquearUsuario(usuario_bloqueado){
    this.usuarioService.desbloqueoUsuario(usuario_bloqueado.config_usuario_bloqueado_id).subscribe(
      res => {
         console.log("Desbloqueado");
         localStorage.removeItem('usuario_bloqueado');
         this.is_bloqueado = false;
      },
      err => {
        this.status = 'error';
      }
    );
  }

  



  EnterSubmit(event, form) { 
    //keycode for
    if (event.keyCode === 13) {
      // alert('Enter key is pressed, form will be submitted'); 
  //calling submit method if key pressed is Enter.
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

          console.log('success',res);
          this.status = 'success';
          this.token = res;
          

          this.usuarioService.login(this.usuario, true).subscribe(
            res => {
              
              this.identity = res;
              this.is_cargando = false;
              //Guardar datos de usuario identificado
              // localStorage.setItem('hola1','johanna');
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));
              localStorage.setItem('usuario_id', this.identity.sub);
              // localStorage.setItem('imagen', this.usuario.path_logo);
              this.router.navigate(['/reporteria/tablero']); 
              // console.log(this.identity);
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
            console.log("Bloqueado por submit",this.usuario_bloqueado);
            if (!usuario_bloqueado) {
              this.is_bloqueado = true;
              this.is_advertencia = false;
              console.log("Nuevo bloqueo",this.usuario_bloqueado);
              localStorage.setItem('usuario_bloqueado', JSON.stringify(this.usuario_bloqueado));
              this.mensajeError = "Ha superado el límite de intentos. Para proteger sus datos, ha sido bloqueado. Inténtelo más tarde.";
              this.esperadesbloqueoUsuario(this.usuario_bloqueado);
            }else if(usuario_bloqueado && this.is_bloqueado) {
              console.log("Ya existe bloqueo",usuario_bloqueado);
              this.mensajeError = `Su cuenta se encuentra bloqueada temporalmente por ${ this.usuario_bloqueado.tiempo_espera_login } min.`;
              // this.esperadesbloqueoUsuario(usuario_bloqueado);
              
            }
            
            // console.log(res);
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
