import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RolService } from 'src/app/core/services/rol.service';
import { Rol } from '../../../../theme/shared/models/Rol';
import Swal from 'sweetalert2';      
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-rol-edit-modal',
  templateUrl: './rol-edit-modal.component.html',
  styleUrls: ['./rol-edit-modal.component.scss']
})
export class RolEditModalComponent implements OnInit {
  @Input() rol: Rol;
  @Output() sendRespuesta: EventEmitter<boolean> = new EventEmitter();
  public spinner1 = "";
  constructor(
    // public activeModal: NgbActiveModal,
    public bsModalRef: BsModalRef,
    private spinner: NgxSpinnerService,
    private rolService: RolService,
  ) { 
    this.rol = new Rol();
    this.spinner1 = 'sp_rol_edit';
  }

  ngOnInit() {
  }

  isValidForm(){
    if(this.rol.nombre == ''){
      return false;
    }
    return true;
  }

  onSubmit(){
    this.spinner.show('sp_rol_edit');
    this.rolService.update(this.rol).subscribe(
      res => {
        this.sendRespuesta.emit(true);
        Swal.fire(
          'Modificado',
          'Se ha modificado con éxito',
          'success'
        );
        this.spinner.hide('sp_rol_edit');
        this.bsModalRef.hide();
      }, err => {
        console.log(err);
      }
    )
  }

}
