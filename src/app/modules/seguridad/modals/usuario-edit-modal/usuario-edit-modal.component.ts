import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { RolService } from 'src/app/core/services/rol.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Usuario } from 'src/app/theme/shared/models/Usuario';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-edit-modal',
  templateUrl: './usuario-edit-modal.component.html',
  styleUrls: ['./usuario-edit-modal.component.scss']
})
export class UsuarioEditModalComponent implements OnInit {
  @Input() usuario: Usuario;
  public is_edit: boolean;
  @Output() sendRespuesta = new EventEmitter<boolean>();
  public selectedFile: File;
  public spinner1 = "";
  
  constructor(
    
    // public activeModal: NgbActiveModal,
    public bsModalRef: BsModalRef,
    private usuarioService: UsuarioService,
    private spinner: NgxSpinnerService,
  ) {
   this.is_edit = true;
   this.spinner1 = 'sp_usuario_edit';
   }

  ngOnInit() {
  
  }

  getImage(event){
    this.selectedFile = event;
    console.log("padre",this.selectedFile);
  }

  isValidForm(){

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
    this.spinner.show('sp_usuario_edit');
    this.usuarioService.update(this.usuario).subscribe(
      res => {
        Swal.fire(
          'Modificado',
          'Se ha modificado con éxito',
          'success'
        );
        if(this.selectedFile){
            
          this.usuarioService.onUpload(this.selectedFile).subscribe(
            response=>{
              // resolve(true);
              this.sendRespuesta.emit(true);
              this.spinner.hide('sp_usuario_edit');
              this.bsModalRef.hide();
            
            },
            error=>{
              this.spinner.hide('sp_usuario_edit');
              // reject();
              console.log(<any>error);
            }      
          );  
        }else{
          this.spinner.hide('sp_usuario_edit');
          // resolve(true);
          this.bsModalRef.hide();
        }
        // this.bsModalRef.hide();
      },
      err => {

      }
    )
  }

}
