import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  constructor(
    public activeModal: NgbActiveModal,
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
    this.canalService.save(this.canal).subscribe(
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
