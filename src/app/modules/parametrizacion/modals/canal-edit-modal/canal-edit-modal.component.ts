import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { CanalService } from 'src/app/core/services/canal.service';
import { Canal } from 'src/app/theme/shared/models/Canal';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-canal-edit-modal',
  templateUrl: './canal-edit-modal.component.html',
  styleUrls: ['./canal-edit-modal.component.scss']
})
export class CanalEditModalComponent implements OnInit {
  @Input() canal: Canal;

  @Output() sendRespuesta = new EventEmitter<boolean>();
  spinner1 = 'sp_canal_edit';
  constructor(
    public bsModalRef: BsModalRef,
    private spinner: NgxSpinnerService,
    private canalService: CanalService,
  ) {
    // this.spinner1 = 'sp_canal_edit';
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
    this.spinner.show(this.spinner1);
    console.log(this.canal);
    this.canalService.update(this.canal).subscribe(
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
