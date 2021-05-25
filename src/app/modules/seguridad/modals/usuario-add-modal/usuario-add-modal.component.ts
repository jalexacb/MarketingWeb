import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Usuario } from 'src/app/theme/shared/models/Usuario';


import Swal from 'sweetalert2';
@Component({
  selector: 'app-usuario-add-modal',
  templateUrl: './usuario-add-modal.component.html',
  styleUrls: ['./usuario-add-modal.component.scss']
})
export class UsuarioAddModalComponent implements OnInit {
  public usuario: Usuario;
  public selectedFile: File;
  public is_existente: boolean;
  public spinner1 = "";
  constructor(
    private usuarioService: UsuarioService,
    public bsModalRef: BsModalRef,
    private spinner: NgxSpinnerService,
  ) { 
    this.usuario = new Usuario();
    this.is_existente = false;
    this.spinner1 = 'sp_usuario_add';
  }

  ngOnInit() {
  }

  getImage(event){
    this.selectedFile = event;
    console.log("padre",this.selectedFile);
  }

  getExistente(event){
    this.is_existente = event;
  }
  
  isValidForm(){
    if(this.is_existente){
      return false;
    }

    if(this.usuario.usuario == ''){
      return false;
    }

    if(this.usuario.nombres == ''){
      return false;
    }

    if(this.usuario.password == ''){
      return false;
    }

    if(this.usuario.apellidos == ''){
      return false;
    }
    if(this.usuario.rol_id == ''){
      return false;
    }

    if(this.usuario.sexo == ''){
      return false;
    }

    return true;
  }

  onSubmit(){
    console.log(this.usuario);
    this.spinner.show('sp_usuario_add');
    return new Promise((resolve, reject)=>{
      this.usuarioService.save(this.usuario).subscribe(
        res => {
          Swal.fire(
            'Creado',
            'Se ha creado con éxito',
            'success'
          );
          if(this.selectedFile){
            
              this.usuarioService.onUpload(this.selectedFile).subscribe(
                response=>{
                  resolve(true);
                  this.spinner.hide('sp_usuario_add');
                  this.bsModalRef.hide();
                
                },
                error=>{
                  this.spinner.hide('sp_usuario_add');
                  reject();
                  console.log(<any>error);
                }      
              );  
          }else{
            this.spinner.hide('sp_usuario_add');
            resolve(true);
            this.bsModalRef.hide();
          }
        },
        err => {
          reject();
          console.log(<any>err);
        });
    });
    
  }

}
