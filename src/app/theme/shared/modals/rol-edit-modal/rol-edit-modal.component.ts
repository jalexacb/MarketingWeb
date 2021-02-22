import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RolService } from 'src/app/core/services/rol.service';
import { Rol } from '../../models/Rol';
import Swal from 'sweetalert2';      

@Component({
  selector: 'app-rol-edit-modal',
  templateUrl: './rol-edit-modal.component.html',
  styleUrls: ['./rol-edit-modal.component.scss']
})
export class RolEditModalComponent implements OnInit {
  @Input() public rol: Rol;
  constructor(
    public activeModal: NgbActiveModal,
    private rolService: RolService,
  ) { 
    this.rol = new Rol();
  }

  ngOnInit() {
  }

  onSubmit(){
    this.rolService.update(this.rol).subscribe(
      res => {
        Swal.fire(
          'Modificado',
          'Se ha modificado con éxito',
          'success'
        )
        this.activeModal.close();
      }, err => {
        console.log(err);
      }
    )
  }

}
