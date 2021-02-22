import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InteresService } from 'src/app/core/services/interes.service';
import { Interes } from 'src/app/theme/shared/models/Interes';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-interes-add-modal',
  templateUrl: './interes-add-modal.component.html',
  styleUrls: ['./interes-add-modal.component.scss']
})
export class InteresAddModalComponent implements OnInit {
  public interes: Interes;
  constructor(
    public activeModal: NgbActiveModal,
    private interesService: InteresService,
  ) { 
    this.interes = new Interes();
  }

  ngOnInit() {
  }

  isValidForm(){
    if(this.interes.nombre == ''){
      return false;
    }
    return true;
  }

  onSubmit(){
    console.log(this.interes);
    this.interesService.save(this.interes).subscribe(
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