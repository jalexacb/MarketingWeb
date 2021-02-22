import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  constructor(
    public activeModal: NgbActiveModal,
    private usuarioService: UsuarioService,
  ) { 
    this.usuario = new Usuario();
  }

  ngOnInit() {
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
    this.usuarioService.save(this.usuario).subscribe(
      res => {
        Swal.fire(
          'Creado',
          'Se ha creado con éxito',
          'success'
        )
        this.activeModal.close();
      },
      err => {

      }
    )
  }

}
