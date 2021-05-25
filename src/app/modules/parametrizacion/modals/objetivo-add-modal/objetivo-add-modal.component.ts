import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ObjetivoService } from 'src/app/core/services/objetivo.service';
import { Objetivo } from 'src/app/theme/shared/models/Objetivo';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-objetivo-add-modal',
  templateUrl: './objetivo-add-modal.component.html',
  styleUrls: ['./objetivo-add-modal.component.scss']
})
export class ObjetivoAddModalComponent implements OnInit {
  public objetivo: Objetivo;
  @Output() sendRespuesta = new EventEmitter<boolean>();
  spinner1 = 'sp_objetivo_add';
  constructor(
    // public activeModal: NgbActiveModal,
    private objetivoService: ObjetivoService,
    private spinner: NgxSpinnerService,
    public bsModalRef: BsModalRef,
  ) { 
    this.objetivo = new Objetivo();
  }

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
    this.objetivoService.save(this.objetivo).subscribe(
      res => {
        Swal.fire(
          'Creado',
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
