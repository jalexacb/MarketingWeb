import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RolService } from 'src/app/core/services/rol.service';
import { Rol } from 'src/app/theme/shared/models/Rol';

import * as moment from 'moment';
import { Usuario } from 'src/app/theme/shared/models/Usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';
@Component({
  selector: 'app-usuario-frm',
  templateUrl: './usuario-frm.component.html',
  styleUrls: ['./usuario-frm.component.scss']
})
export class UsuarioFrmComponent implements OnInit {
  @Input() usuario: Usuario;
  @Input() is_existente: boolean;
  @Input() is_edit: boolean;
  @Output() sendImage: EventEmitter<File>= new EventEmitter<File>();
  @Output() sendExistente: EventEmitter<boolean>= new EventEmitter<boolean>();
  public fecha: any;
  public url: String;
  public  roles: Array<Rol>;
  
  public nombre_archivo: string;
  public is_permitido: boolean;
  // public is_existente: boolean;
  constructor(
    private rolService: RolService,
    private usuarioService: UsuarioService,
  ) { 
    this.roles = [];
    
    this.nombre_archivo = "";
    this.is_permitido = true;
    // this.is_existente = false;
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
        this.usuario.image = event.target.result; 
        
      } 
      this.usuario.path_logo = event.target.files[0].name;
      this.sendImage.emit(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]); 
    } 
  } 

  getImage(){
    let image = '';
    if(this.usuario.image){
      image = this.usuario.image;
    }else if(this.usuario.path_logo != ''){
      image = 'http://localhost:8000/api/usuario/get-image?imagen='+this.usuario.path_logo;
    }
    return image;
 }

  getUsuarioNombre(){
    let nombres = this.usuario.nombres.toLowerCase().split(' ');
    let apellidos = this.usuario.apellidos.toLowerCase().split(' ');
    // console.log(nombres);
    let inicialNombre2 ="";
    let usuario = '';
    if(!this.is_edit){
      if(nombres.length > 0 && apellidos.length > 0 && !this.is_permitido){
        if(nombres[1]){
          inicialNombre2 = nombres[1].charAt(0);
        }
        usuario = `${nombres[0].charAt(0)}${inicialNombre2}${apellidos[0]}`;
      }else if(nombres.length > 0 && apellidos.length > 0){
        usuario = `${nombres[0].charAt(0)}${apellidos[0]}`;
      }
      this.usuario.usuario = usuario;
    }
   
      

    
    return this.usuario.usuario;
  }

  comprobarUsuario(){
    if(this.usuario.nombres.length > 0 && this.usuario.apellidos.length > 0){
      this.usuarioService.comprobarUsuarioExistente(this.usuario.usuario).subscribe( 
        (res:any) => {
          if(!res.is_permitido){
            this.is_permitido = false;
            this.is_existente = true;
          }else if(res.is_permitido){
            this.is_existente = false;
          }
          this.sendExistente.emit(this.is_existente);
        },
        err => {
  
        }
      );
    }
   
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
