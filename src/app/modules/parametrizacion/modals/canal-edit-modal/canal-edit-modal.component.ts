import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  constructor(
    public activeModal: NgbActiveModal,
    private canalService: CanalService,
  ) { }

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
    this.canalService.update(this.canal).subscribe(
      res => {
        Swal.fire(
          'Modificado',
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
