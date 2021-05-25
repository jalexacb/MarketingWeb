import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RolService } from 'src/app/core/services/rol.service';
import { Rol } from '../../../../theme/shared/models/Rol';
import Swal from 'sweetalert2';      
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-rol-add-modal',
  templateUrl: './rol-add-modal.component.html',
  styleUrls: ['./rol-add-modal.component.scss']
})
export class RolAddModalComponent implements OnInit {
  public rol: Rol;
  @Output() sendRespuesta = new EventEmitter<any>();
  public spinner1 = "";
  constructor(
    // public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private rolService: RolService,
    public bsModalRef: BsModalRef,
  ) { 
    this.rol = new Rol();
    this.spinner1 = 'sp_rol_add';
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
    this.spinner.show('sp_rol_add');
    this.rolService.save(this.rol).subscribe(
      res => {
        Swal.fire(
          'Guardado!',
          'Se ha guardado con éxito',
          'success'
        )
        this.sendRespuesta.emit(true);
        console.log("Se ha guardado");
        this.spinner.hide('sp_rol_add');
        this.bsModalRef.hide();
      },
      err => {

      }
    )
  }

}
