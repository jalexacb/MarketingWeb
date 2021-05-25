import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
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
  @Output() sendRespuesta = new EventEmitter<boolean>();
  spinner1 = 'sp_interes_edit';
  constructor(
    // public activeModal: NgbActiveModal,
    public bsModalRef: BsModalRef,
    private spinner: NgxSpinnerService,
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
    
    this.spinner.show(this.spinner1);
    this.interesService.update(this.interes).subscribe(
      res => {
        Swal.fire(
          'Modificado',
          'Se ha creado con éxito',
          'success'
        )
        // this.activeModal.close();
        this.sendRespuesta.emit(true);
        this.spinner.hide(this.spinner1);
        this.bsModalRef.hide();
      },
      err => {

      }
    )
  }

}
