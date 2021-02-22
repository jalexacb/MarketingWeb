import { Component, Input, OnInit } from '@angular/core';
import { Contacto } from 'src/app/theme/shared/models/Contacto';
@Component({
  selector: 'app-contacto-frm',
  templateUrl: './contacto-frm.component.html',
  styleUrls: ['./contacto-frm.component.scss']
})
export class ContactoFrmComponent implements OnInit {
  @Input() contacto: Contacto;
 

  constructor() { }

  ngOnInit() {
    console.log(this.contacto);
  }

}
