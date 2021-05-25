import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RolService } from 'src/app/core/services/rol.service';
import { Rol } from '../../models/Rol';
import Swal from 'sweetalert2';      

@Component({
  selector: 'app-rol-add-modal',
  templateUrl: './rol-add-modal.component.html',
  styleUrls: ['./rol-add-modal.component.scss']
})
export class RolAddModalComponent implements OnInit {
  public rol: Rol;
  @Output() sendRespuesta = new EventEmitter<any>();
  constructor(
    public activeModal: NgbActiveModal,
    private rolService: RolService,
  ) { 
    this.rol = new Rol();
  }

  ngOnInit() {
  }

  onSubmit(){
    this.rolService.save(this.rol).subscribe(
      res => {
        Swal.fire(
          'Guardado!',
          'Se ha guardado con éxito',
          'success'
        )
        this.sendRespuesta.emit(true);
        console.log("Se ha guardado");
        this.activeModal.close(true);
      },
      err => {

      }
    )
  }

}
