import { Component, Input, OnInit } from '@angular/core';
import { Contacto } from 'src/app/theme/shared/models/Contacto';
@Component({
  selector: 'app-contacto-frm',
  templateUrl: './contacto-frm.component.html',
  styleUrls: ['./contacto-frm.component.scss']
})
export class ContactoFrmComponent implements OnInit {
  @Input() contacto: Contacto;
  public hasError: boolean;

  constructor() {
    this.hasError = true;
  }

  ngOnInit() {
    console.log(this.contacto);
  }

  getNumber(event){
    this.contacto.celular = event;
  }

  validaNumericos(event) {
    if((event.charCode == 43) || (event.charCode >= 48 && event.charCode <= 57 )){
     
        return true;
      // return true;
     }
     return false;        
  }

}
