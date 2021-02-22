import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactoService } from 'src/app/core/services/contacto.service';
import { Contacto } from 'src/app/theme/shared/models/Contacto';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contacto-edit-modal',
  templateUrl: './contacto-edit-modal.component.html',
  styleUrls: ['./contacto-edit-modal.component.scss']
})
export class ContactoEditModalComponent implements OnInit {
  @Input() contacto:Contacto;
  constructor(
    public activeModal: NgbActiveModal,
    private contactoService: ContactoService,
  ) { }

  ngOnInit() {
    console.log(this.contacto);
  }

  isValidForm(){
    if(this.contacto.nombres == ''){
      return false;
    }
    if(this.contacto.apellidos == ''){
      return false;
    }
    if(this.contacto.correo == ''){
      return false;
    }
    if(this.contacto.celular == ''){
      return false;
    }
    return true;
  }

  onSubmit(){
    console.log(this.contacto);
    this.contactoService.update(this.contacto).subscribe(
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