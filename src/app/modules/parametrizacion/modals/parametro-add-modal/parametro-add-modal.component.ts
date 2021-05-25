import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ParametroService } from 'src/app/core/services/parametro.service';
import { Parametro } from 'src/app/theme/shared/models/Parametro';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-parametro-add-modal',
  templateUrl: './parametro-add-modal.component.html',
  styleUrls: ['./parametro-add-modal.component.scss']
})
export class ParametroAddModalComponent implements OnInit {
  public parametro: Parametro;
  spinner1 = 'sp_parametro_add';
  @Output() sendRespuesta = new EventEmitter<boolean>();
  constructor(
    public bsModalRef: BsModalRef,
    private spinner: NgxSpinnerService,
    private parametroService: ParametroService,
  ) { 
    this.parametro = new Parametro();
  }

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
    this.parametroService.save(this.parametro).subscribe(
      res => {
        Swal.fire(
          'Creado',
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
