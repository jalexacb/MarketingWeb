import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InteresService } from 'src/app/core/services/interes.service';
import { Interes } from 'src/app/theme/shared/models/Interes';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-interes-edit-modal',
  templateUrl: './interes-edit-modal.component.html',
  styleUrls: ['./interes-edit-modal.component.scss']
})
export class InteresEditModalComponent implements OnInit {
  @Input() interes: Interes;
  constructor(
    public activeModal: NgbActiveModal,
    private interesService: InteresService,
  ) { }

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
    this.interesService.update(this.interes).subscribe(
      res => {
        Swal.fire(
          'Modificado',
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
