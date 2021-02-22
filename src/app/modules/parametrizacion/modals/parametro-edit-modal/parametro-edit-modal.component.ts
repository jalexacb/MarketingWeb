import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  constructor(
    public activeModal: NgbActiveModal,
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
    this.parametroService.update(this.parametro).subscribe(
      res => {
        Swal.fire(
          'Modificado',
          'Se ha modificado con éxito',
          'success'
        )
        this.activeModal.close();
      },
      err => {

      }
    )
  }
}
