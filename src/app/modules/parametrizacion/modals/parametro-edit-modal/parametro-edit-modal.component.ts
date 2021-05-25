import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ParametroService } from 'src/app/core/services/parametro.service';
import { Parametro } from 'src/app/theme/shared/models/Parametro';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-parametro-edit-modal',
  templateUrl: './parametro-edit-modal.component.html',
  styleUrls: ['./parametro-edit-modal.component.scss']
})
export class ParametroEditModalComponent implements OnInit {
  @Input() parametro:Parametro;
  @Output() sendRespuesta = new EventEmitter<boolean>();
  spinner1 = 'sp_parametro_edit';
  constructor(
    // public activeModal: NgbActiveModal,
    public bsModalRef: BsModalRef,
    private spinner: NgxSpinnerService,
    private parametroService: ParametroService,
  ) { }

  ngOnInit() {
  }

  isValidForm(){
    if(this.parametro.nombre == ''){
      return false;
    }
    if(this.parametro.valor == ''){
      return false;
    }
    return true;
  }

  onSubmit(){
    console.log(this.parametro);
    this.spinner.show(this.spinner1);
    this.parametroService.update(this.parametro).subscribe(
      res => {
        Swal.fire(
          'Modificado',
          'Se ha modificado con éxito',
          'success'
        )
        this.spinner.hide(this.spinner1);
        this.bsModalRef.hide();
      },
      err => {

      }
    )
  }
}
