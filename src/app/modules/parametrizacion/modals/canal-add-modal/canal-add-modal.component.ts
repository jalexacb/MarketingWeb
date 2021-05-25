import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { CanalService } from 'src/app/core/services/canal.service';
import { Canal } from 'src/app/theme/shared/models/Canal';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-canal-add-modal',
  templateUrl: './canal-add-modal.component.html',
  styleUrls: ['./canal-add-modal.component.scss']
})
export class CanalAddModalComponent implements OnInit {
  public canal: Canal;
  spinner1 = 'sp_canal_add';
  @Output() sendRespuesta = new EventEmitter<boolean>();
  constructor(
    public bsModalRef: BsModalRef,
    private spinner: NgxSpinnerService,
    // public activeModal: NgbActiveModal,
    private canalService: CanalService,
  ) { 
    this.canal = new Canal();
  }

  ngOnInit() {
  }

  isValidForm(){
    if(this.canal.nombre == ''){
      return false;
    }
    return true;
  }

  onSubmit(){
    console.log(this.canal);
    this.spinner.show(this.spinner1);
    this.canalService.save(this.canal).subscribe(
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
