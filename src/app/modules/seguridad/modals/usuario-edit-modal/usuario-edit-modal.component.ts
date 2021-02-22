import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  @Output() sendRespuesta = new EventEmitter<boolean>();
 
  constructor(
    
    public activeModal: NgbActiveModal,
   
    private usuarioService: UsuarioService,
  ) {
   
   }

  ngOnInit() {
  
  }

 
  

  onSubmit(){

    console.log(this.usuario);
    this.sendRespuesta.emit(true);
    this.usuarioService.update(this.usuario).subscribe(
      res => {
        Swal.fire(
          'Modificado',
          'Se ha modificado con éxito',
          'success'
        )
        this.activeModal.close();
      },
      err => {

      }
    )
  }

}
