import { Component, OnInit } from '@angular/core';
import { ParametroService } from 'src/app/core/services/parametro.service';
import { Parametro } from 'src/app/theme/shared/models/Parametro';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-bloqueo',
  templateUrl: './bloqueo.component.html',
  styleUrls: ['./bloqueo.component.scss']
})
export class BloqueoComponent implements OnInit {
  public parametros: Array<Parametro>;
  public max_intentos: string;
  public max_tiempo: string;
  constructor(
    private parametroService: ParametroService,
  ) { 
    this.parametros = [];
    this.max_intentos = "";
    this.max_tiempo = "";
  }

  ngOnInit() {
    // let parametro = null;
    

  }

  setValues(){
    let parametro = new Parametro();
    parametro.id = '1';
    parametro.valor = this.max_intentos;

    this.parametros.push(parametro);
    let parametro1 = new Parametro();
    parametro1.id = '2';
    parametro1.valor = this.max_tiempo;
    this.parametros.push(parametro1);
  }

  onSubmit(){
    this.setValues();
    this.parametroService.updateSeguridad(this.parametros).subscribe(
      res => {
        Swal.fire(
          'Guardado!',
          'Se ha guardado con éxito',
          'success'
        )
        console.log("Se ha guardado");
      },
      err => {

      }
    )
  }



}
