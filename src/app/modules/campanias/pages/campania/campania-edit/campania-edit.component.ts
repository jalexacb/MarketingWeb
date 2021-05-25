import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CampaniaService } from 'src/app/core/services/campania.service';
import { CanalService } from 'src/app/core/services/canal.service';
import { ContactoService } from 'src/app/core/services/contacto.service';
import { InteresService } from 'src/app/core/services/interes.service';
import { ObjetivoService } from 'src/app/core/services/objetivo.service';
import { Campania } from 'src/app/theme/shared/models/Campania';
import { Canal } from 'src/app/theme/shared/models/Canal';
import { Contacto } from 'src/app/theme/shared/models/Contacto';
import { Interes } from 'src/app/theme/shared/models/Interes';
import { Objetivo } from 'src/app/theme/shared/models/Objetivo';


import Swal from 'sweetalert2';
import { CampaniaFrmComponent } from '../../../components/campania-frm/campania-frm.component';
@Component({
  selector: 'app-campania-edit',
  templateUrl: './campania-edit.component.html',
  styleUrls: ['./campania-edit.component.scss']
})
export class CampaniaEditComponent implements OnInit {
  public canales: Array<Canal>;
  @ViewChild('campaniafrm', {static:true}) campaniaFrm: CampaniaFrmComponent;
  public contactos:Array<Contacto>;
  public intereses: Array<Interes>;
  public objetivos: Array<Objetivo>;
  public campania: Campania;
  public spinner1: string = 'sp_page'; 
  public step: number;
  public id: string;
  public selectedFile: File;
  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    public router: Router,
    private objetivoService: ObjetivoService,
    private canalService: CanalService,
    private contactoService: ContactoService,
    private interesService: InteresService,
    private campaniaService: CampaniaService,
  ) { 
    
    this.canales = [];
    this.intereses = [];
    this.contactos = [];
    this.objetivos = [];
    this.campania = new Campania();
   
    // this.campania = new Campania();
    this.id = this.route.snapshot.paramMap.get("id");
    this.step = 1;
  }

  ngOnInit() {
    console.log("camp",this.campania);
    this.spinner.show(this.spinner1);
    let p1 = this.getCampaniaById();
    let p2 = this.getCanales();
    let p3 = this.getContactos();
    let p4 = this.getIntereses();
    let p5 = this.getObjetivos();


    Promise.all([p1,p2,p3,p4,p5])
      .then(result => {
        this.spinner.hide(this.spinner1);
        this.campania.objetivos.forEach(objetivo => {
          console.log("objs", this.objetivos);
          let objetivoSeleccionado = this.objetivos.filter(o=> o.id === objetivo.id)[0];
          if(objetivoSeleccionado){
            objetivoSeleccionado.seleccionado = true;
          } 
          let intereses = [];
          this.campania.intereses.forEach(interes => {
            intereses.push(interes.nombre);
          });
          this.campaniaFrm.getRecomendacion(intereses);
          // else {
          //   this.isSelectedAll = false;
          // }

        });
        // if(this.campania.mensaje != ''){
        //   this.step = 3;
        // }else if(this.canales.length == 0 || this.intereses.length == 0 || this.contactos.length == 0){
        //   this.step = 1;
        // }else {
        //   this.step = 2;
        // }
      }).catch(error => {
        // this.step = 1;
        this.spinner.hide(this.spinner1);
      });
    
    
  }

  next(){
    this.step += 1;
  }
  back(){
      this.step -= 1;
  }

  getImage(event){
    this.selectedFile = event;
    console.log("padre",this.selectedFile);
  }

  getCampaniaById(){
    return new Promise((resolve, reject) => {
      this.campaniaService.getById(this.id).subscribe(
        (res:Campania) => {
         this.campania = res;
         this.campania.contactos = [];
         this.campania.intereses = [];
         this.campania.canales = [];
         this.campania.objetivos = [];
         this.campania.campania_contactos.forEach(campania_contacto => {
          this.campania.contactos.push(campania_contacto.contacto);
        });
        this.campania.campania_canales.forEach(campania_canal => {
          this.campania.canales.push(campania_canal.canal);
        });
        this.campania.campania_intereses.forEach(campania_interes => {
          this.campania.intereses.push(campania_interes.interes);
        });
        this.campania.campania_objetivos.forEach(campania_objetivo => {
          this.campania.objetivos.push(campania_objetivo.objetivo);
        });
        
    
        console.log("c",this.campania.contactos);
        console.log("c",this.campania.objetivos);
         console.log(res);
         resolve(true);
          // this.activeModal.close();
        },
        err => {
          reject();
        }
      );
    });
  }

  getCanales(){
    return new Promise((resolve, reject) => {
      this.canalService.getAll('?status=A').subscribe(
        (res:any) => {
          console.log(res);
          this.canales = res;
          resolve(true);
        },
        err => {
          reject();
        }
      );
    });
  }

  getObjetivos(){
    return new Promise((resolve, reject) => {
      this.objetivoService.getAll('?status=A').subscribe(
        (res:any) => {
          console.log(res);
          this.objetivos = res;
          resolve(true);
        },
        err => {
          reject();
        }
      );
    });
  }

  getContactos(qs: String = ""){
    return new Promise((resolve, reject) => {
      this.contactoService.getAll('?status=A').subscribe(
        (res:any) => {
          console.log(res);
          this.contactos = res;
          resolve(true);
        },
        err => {
          reject();
        }
      );
    });
  }

  getIntereses(qs: String = ""){
    return new Promise((resolve, reject) => {
      this.interesService.getAll('?status=A').subscribe(
        (res:any) => {
          console.log(res);
         
          this.intereses = res;
          
          resolve(true);
        },
        err => {
          reject();
        }
      );
    });
  }

  isValidForm(){
    if(this.step == 1){
      if(this.canales.length === 0){
        return false;
      }
      if(this.intereses.length === 0){
        return false;
      }
      if(this.contactos.length === 0){
        return false;
      }
      if(this.objetivos.length === 0){
        return false;
      }
    }
    if(this.step == 2){
      if(this.campania.contactos.length === 0){
        return false;
      }
      if(this.campania.canales.length === 0){
        return false;
      }
      if(this.campania.intereses.length === 0){
        return false;
      }
      if(this.campania.objetivos.length === 0){
        return false;
      }
      if(this.campania.nombre.length === 0){
        return false;
      }

    }
    if(this.step == 3){
      if(this.campania.mensaje.length === 0){
        return false;
      }
    }
    return true;
  }

  convertirAWhatsAppText(){
    const whatsAppFormat = [
      { tag: 'strong', symbol: '*' },
      { tag: 'em', symbol: '_' },
      { tag: 'u', symbol: '~' },
      { tag: '`', symbol: 'code' },
    ];

    let parrafoTagInicial = new RegExp('<p>','g');
    let parrafoTagFinal = new RegExp('</p>','g');
    let tagNBSP = new RegExp('&nbsp;','g');
    let tagBr = new RegExp('<br>','g');
    this.campania.mensaje = this.campania.mensaje.replace(parrafoTagInicial, '');
    this.campania.mensaje = this.campania.mensaje.replace(parrafoTagFinal, '');
    this.campania.mensaje = this.campania.mensaje.replace(tagNBSP, '');
    this.campania.mensaje = this.campania.mensaje.replace(tagBr, '');

    whatsAppFormat.forEach(({ tag, symbol }) => {
      let tagInicial = `<${tag}>`;
      let tagFinal = `</${tag}>`;

      // var cadena = "Test abc test test abc test test test abc test test abc";
      let regInicio = new RegExp(tagInicial,'g');
      let regFin = new RegExp(tagFinal,'g');
      const matchInicio = this.campania.mensaje.match(regInicio);
      const matchFinal = this.campania.mensaje.match(regInicio);
      if(!matchInicio && !matchFinal) return;
      this.campania.mensaje = this.campania.mensaje.replace(regInicio, symbol);
      this.campania.mensaje = this.campania.mensaje.replace(regFin, symbol);

    // console.log(this.campania.mensaje);
    });
// console.log(this.campania.mensaje);
   
  }

  onSubmitGuardar(){
    this.convertirAWhatsAppText();
    // this.setValues();
    Swal.fire({
      title: '¿Está seguro de guardar esta campaña?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show(this.spinner1);
        this.updateCampania().then(
          res =>{
            
            Swal.fire(
              'Modificado',
              'Se ha modificado con éxito',
              'success'
            )
            this.spinner.hide(this.spinner1);
            this.router.navigate(['/campanias']); 
          }
        )
       
      }
    });
    console.log(this.campania);
    
    
  }

  updateCampania(){
    return new Promise((resolve, reject)=>{
      this.convertirAWhatsAppText();
      // this.setValues();
      console.log(this.campania);

      this.campaniaService.update(this.campania).subscribe(
        res => {
          if(this.selectedFile){

            this.campaniaService.onUpload(this.selectedFile).subscribe(
              response=>{
                //  if(response.status=='success'){
                  resolve(true);
                    console.log(response);
                  },
                  error=>{
                    // this.spinner.hide();
                    reject();
                    console.log(<any>error);
                  }
                );
                
          }
          resolve(true);
          // Swal.fire(
          //   'Modificado',
          //   'Se ha modificado con éxito',
          //   'success'
          // )
          // this.activeModal.close();
        },
        err => {
          reject();
        }
      );
    });
  }

  ejecutarCampania(){
    return new Promise((resolve, reject)=>{
      resolve(true);
      this.campaniaService.ejecutar(this.campania.id).subscribe(
        res => { 
          console.log(res);
          resolve(true);
          
        }, 
        err => {
          reject();
        }
      )
  
    });
  }

  onSubmitEjecutar(){
    this.convertirAWhatsAppText();
    // this.setValues();
    console.log(this.campania);
    this.spinner.show(this.spinner1);
    this.updateCampania().then(
      res => {
        console.log(this.campania.id);
        this.ejecutarCampania().then(
          res => {
            
            Swal.fire(
              'Ejecutada',
              'Se ha ejecutado con éxito',
              'success'
            );
            this.spinner.hide(this.spinner1);
            this.router.navigate(['/campanias']); 
          }
        )
      }
    )
    
  }

}
