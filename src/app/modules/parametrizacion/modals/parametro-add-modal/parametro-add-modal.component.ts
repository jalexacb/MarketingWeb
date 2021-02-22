import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  constructor(
    public activeModal: NgbActiveModal,
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
    this.parametroService.save(this.parametro).subscribe(
      res => {
        Swal.fire(
          'Creado',
          'Se ha creado con éxito',
          'success'
        )
        this.activeModal.close();
      },
      err => {

      }
    )
  }

}
