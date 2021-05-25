import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ObjetivoService } from 'src/app/core/services/objetivo.service';
import { Objetivo } from 'src/app/theme/shared/models/Objetivo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-objetivo-edit-modal',
  templateUrl: './objetivo-edit-modal.component.html',
  styleUrls: ['./objetivo-edit-modal.component.scss']
})
export class ObjetivoEditModalComponent implements OnInit {
  @Input() objetivo: Objetivo;
  @Output() sendRespuesta = new EventEmitter<boolean>();
  spinner1 = 'sp_objetivo_edit';
  constructor(
    // public activeModal: NgbActiveModal,
    public bsModalRef: BsModalRef,
    private objetivoService: ObjetivoService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
  }

  isValidForm(){
    if(this.objetivo.nombre == ''){
      return false;
    }
    return true;
  }

  onSubmit(){
    
    this.spinner.show(this.spinner1);
    this.objetivoService.update(this.objetivo).subscribe(
      res => {
        Swal.fire(
          'Modificado',
          'Se ha creado con éxito',
          'success'
        );
        this.sendRespuesta.emit(true);
        this.spinner.hide(this.spinner1);
        this.bsModalRef.hide();
      },
      err => {

      }
    )
  }

}
