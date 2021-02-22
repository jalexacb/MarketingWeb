import { Component, Input, OnInit } from '@angular/core';
import { RolService } from 'src/app/core/services/rol.service';
import { Rol } from 'src/app/theme/shared/models/Rol';

import * as moment from 'moment';
import { Usuario } from 'src/app/theme/shared/models/Usuario';
@Component({
  selector: 'app-usuario-frm',
  templateUrl: './usuario-frm.component.html',
  styleUrls: ['./usuario-frm.component.scss']
})
export class UsuarioFrmComponent implements OnInit {
  @Input() usuario: Usuario;
  public fecha: any;
  public url: String;
  public  roles: Array<Rol>;
  
  public nombre_archivo: string;
  constructor(
    private rolService: RolService,
  ) { 
    this.roles = [];
    
    this.nombre_archivo = "";
  }

  ngOnInit() {
    // this.usuario = new Usuario();
    this.fecha = moment();
    this.getRoles();
  }

  readUrl(event:any) { 
    if (event.target.files && event.target.files[0]) { 
      var reader = new FileReader(); 

      reader.onload = (event:any) => { 
        this.usuario.path_logo = event.target.result; 
        
      } 
      this.nombre_archivo = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]); 
    } 
  } 

  getUsuario(){
    let nombres = this.usuario.nombres.toLowerCase().split(' ');
    let apellidos = this.usuario.apellidos.toLowerCase().split(' ');
    // console.log(nombres);
    let usuario = '';
    if(nombres.length > 0 && apellidos.length > 0)
      usuario = `${nombres[0].charAt(0)}${apellidos[0]}`;

    this.usuario.usuario = usuario;
    return usuario;
  }

  onClick(event){
    if(event.type=='password')
      event.type = "text";
    else
      event.type = 'password';
  }

  getRoles(){
    this.rolService.getAll().subscribe(
      (res:any) => {
        this.roles = res;
        console.log(this.roles);
      },
      err => {

      }
    )
  }

}
