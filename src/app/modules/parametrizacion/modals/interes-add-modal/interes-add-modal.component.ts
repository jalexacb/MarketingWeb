import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
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
  spinner1 = 'sp_interes_add';
  @Output() sendRespuesta = new EventEmitter<boolean>();
  constructor(
    // public activeModal: NgbActiveModal,
    public bsModalRef: BsModalRef,
    private spinner: NgxSpinnerService,
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
    
    this.spinner.show(this.spinner1);
    this.interesService.save(this.interes).subscribe(
      res => {
        Swal.fire(
          'Creado',
          'Se ha creado con éxito',
          'success'
        )
        this.sendRespuesta.emit(true);
        this.spinner.hide(this.spinner1);
        this.bsModalRef.hide();
      },
      err => {

      }
    )
  }

}