import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactoService } from 'src/app/core/services/contacto.service';
import { Contacto } from 'src/app/theme/shared/models/Contacto';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contacto-add-modal',
  templateUrl: './contacto-add-modal.component.html',
  styleUrls: ['./contacto-add-modal.component.scss']
})
export class ContactoAddModalComponent implements OnInit {
  public contacto: Contacto;
  constructor(
    public activeModal: NgbActiveModal,
    private contactoService: ContactoService,
  ) { 
    this.contacto = new Contacto();
  }

  ngOnInit() {
  }

  isValidForm(){
    if(this.contacto.nombres == ''){
      return false;
    }
    // if(this.contacto.apellidos == ''){
    //   return false;
    // }
    // if(this.contacto.correo == ''){
    //   return false;
    // }
    if(this.contacto.celular == ''){
      return false;
    }
    if(this.contacto.celular.length < 10){
      return false;
    }
    return true;
  }

  onSubmit(){
    
    this.contactoService.save(this.contacto).subscribe(
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
