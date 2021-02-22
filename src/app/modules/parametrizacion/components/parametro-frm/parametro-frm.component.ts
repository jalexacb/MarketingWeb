import { Component, Input, OnInit } from '@angular/core';
import { Parametro } from 'src/app/theme/shared/models/Parametro';

@Component({
  selector: 'app-parametro-frm',
  templateUrl: './parametro-frm.component.html',
  styleUrls: ['./parametro-frm.component.scss']
})
export class ParametroFrmComponent implements OnInit {
  @Input() parametro: Parametro;
  constructor() { }

  ngOnInit() {
  }

}
