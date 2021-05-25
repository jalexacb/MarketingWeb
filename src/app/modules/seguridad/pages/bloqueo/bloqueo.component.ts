import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
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
  spinner1 = 'sp_page';
  constructor(
    private parametroService: ParametroService,
    private spinner: NgxSpinnerService,
  ) { 
    this.parametros = [];
    this.max_intentos = "";
    this.max_tiempo = "";
  }

  ngOnInit() {
    // let parametro = null;
    this.getParametrosSeguridad();

  }

  getParametrosSeguridad(){
    this.parametroService.getParametrosSeguridad().subscribe(
      (res:any) => {
        console.log(res);
        if(res[0].id == "1" ){
          this.max_intentos = res[0].valor;
        }
        if( res[1].id == "2"){
          this.max_tiempo = res[1].valor;
        }
        
        
        console.log("Paráemtrps");
      },
      err => {

      }
    )
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
    this.spinner.show(this.spinner1);
    this.parametroService.updateSeguridad(this.parametros).subscribe(
      res => {
        Swal.fire(
          'Guardado!',
          'Se ha guardado con éxito',
          'success'
        );
        this.spinner.hide(this.spinner1);
        console.log("Se ha guardado");
      },
      err => {

      }
    )
  }

   validaNumericos(event) {
    if(event.charCode >= 48 && event.charCode <= 57 ){
      if(this.max_tiempo.length <=3 || this.max_intentos.length <=3 ){
        return true;
       }
      // return true;
     }
     
     return false;        
  }

isValid(){
  if(this.max_intentos == ''){
    return false;
  }
  if(this.max_tiempo == ''){
    return false;
  }
  return true;
}


}
