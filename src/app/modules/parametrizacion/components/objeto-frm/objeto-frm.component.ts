import { Component, Input, OnInit } from '@angular/core';
import { Canal } from 'src/app/theme/shared/models/Canal';
import { Interes } from 'src/app/theme/shared/models/Interes';

@Component({
  selector: 'app-objeto-frm',
  templateUrl: './objeto-frm.component.html',
  styleUrls: ['./objeto-frm.component.scss']
})
export class ObjetoFrmComponent implements OnInit {
  @Input() objeto: Canal | Interes;
  constructor() { }

  ngOnInit() {
  }

}
