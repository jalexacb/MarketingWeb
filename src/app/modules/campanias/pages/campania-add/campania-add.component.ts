import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Step, StepperProgressBarController } from 'stepper-progress-bar';

import { trigger, style, animate, transition } from '@angular/animations';
import { CanalService } from 'src/app/core/services/canal.service';
import { ContactoService } from 'src/app/core/services/contacto.service';
import { InteresService } from 'src/app/core/services/interes.service';
import { Canal } from 'src/app/theme/shared/models/Canal';
import { Contacto } from 'src/app/theme/shared/models/Contacto';
import { Interes } from 'src/app/theme/shared/models/Interes';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ɵELEMENT_PROBE_PROVIDERS } from '@angular/platform-browser';
import { CampaniaService } from 'src/app/core/services/campania.service';
import { Campania } from 'src/app/theme/shared/models/Campania';

import Swal from 'sweetalert2';
import { Objetivo } from 'src/app/theme/shared/models/Objetivo';
import { ObjetivoService } from 'src/app/core/services/objetivo.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-campania-add',
  templateUrl: './campania-add.component.html',
  styleUrls: ['./campania-add.component.scss']
})
export class CampaniaAddComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  public step: number;
  public objetivos: Array<Objetivo>;
  public canales: Array<Canal>;
  public contactos:Array<Contacto>;
  public intereses: Array<Interes>;
  public objetivosSeleccionados: Array<Objetivo>;
  public canalesSeleccionados: Array<Canal>;
  public contactosSeleccionados:Array<Contacto>;
  public interesesSeleccionados: Array<Interes>;
  public campania: Campania;
  public settings={};
  public contactosSettings={};
  public interesesSettings={};
  public nombre_archivo: string;
  public nombre: string = '';
  public spinner1: string = 'sp_campania_edit'; 
  public path_logo = '';
  public link = '';
  public is_permitido: boolean;
  public selectedFile: File;
  constructor(
    private spinner: NgxSpinnerService,
    private objetivoService: ObjetivoService,
    private canalService: CanalService,
    private contactoService: ContactoService,
    private interesService: InteresService,
    private campaniaService: CampaniaService,
    public router: Router,
  ) { 
    this.step = 1;
    this.objetivos = [];
    this.canales = [];
    this.intereses = [];
    this.contactos = [];
    this.objetivosSeleccionados = [];
    this.canalesSeleccionados = [];
    this.interesesSeleccionados = [];
    this.contactosSeleccionados = [];
    this.campania = new Campania();
    this.nombre_archivo = "";
    this.is_permitido = false;
    
  }
  ngOnInit() {
    this.spinner.show(this.spinner1);
    let p1 = this.getCanales();
    let p2 = this.getContactos();
    let p3 = this.getIntereses();
    let p4 = this.getObjetivos();

    Promise.all([p1,p2,p3,p4])
      .then(result => this.spinner.hide(this.spinner1))
      .catch(error => this.spinner.hide(this.spinner1));


      this.dropdownList = [
        { item_id: 1, item_text: 'Mumbai' },
        { item_id: 2, item_text: 'Bangaluru' },
        { item_id: 3, item_text: 'Pune' },
        { item_id: 4, item_text: 'Navsari' },
        { item_id: 5, item_text: 'New Delhi' }
      ];
      this.selectedItems = [
        { item_id: 3, item_text: 'Pune' },
        { item_id: 4, item_text: 'Navsari' }
      ];
      
  }

  next(){
    this.step += 1;
  }
  back(){
      this.step -= 1;
  }

    
  autoGrowTextZone(e, event) {
    var el = this;
    let height = (event.style.height).substring(0, (event.style.height).length -2);
    
    setTimeout(function(){
      if(height < 580){
        e.target.style.cssText = 'height:auto;';
        event.style.cssText = 'height:auto;';
        
        
        e.target.style.cssText = 'height:' + e.target.scrollHeight + 'px';
        event.style.cssText = 'height:' + e.target.scrollHeight + 'px';
      }
      
    },0);
    
  }

  getObjetivos(){
    return new Promise((resolve, reject) => {
      this.objetivoService.getAll('?status=A').subscribe(
        (res:any) => {
          
          this.objetivos = res;
          resolve(true);
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
          
          this.canales = res;
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
          
          this.contactos = res;
          resolve(true);
        },
        err => {
          reject();
        }
      );
    });
  }

  getImage(event){
    this.selectedFile = event;
    
  }

  getIntereses(qs: String = ""){
    return new Promise((resolve, reject) => {
      this.interesService.getAll('?status=A').subscribe(
        (res:any) => {
          
         
          this.intereses = res;
          
          resolve(true);
        },
        err => {
          reject();
        }
      );
    });
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

      
      let regInicio = new RegExp(tagInicial,'g');
      let regFin = new RegExp(tagFinal,'g');
      const matchInicio = this.campania.mensaje.match(regInicio);
      const matchFinal = this.campania.mensaje.match(regInicio);
      if(!matchInicio && !matchFinal) return;
      this.campania.mensaje = this.campania.mensaje.replace(regInicio, symbol);
      this.campania.mensaje = this.campania.mensaje.replace(regFin, symbol);

    
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

  setValues(){
    this.campania.contactos = this.contactosSeleccionados;
    this.campania.canales = this.canalesSeleccionados;
    this.campania.intereses = this.interesesSeleccionados;
  }

  onSubmitGuardar(){
    this.convertirAWhatsAppText();
    
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
        this.spinner.show();
        this.saveCampania().then(
          res =>{
            
            Swal.fire(
              'Creado',
              'Se ha creado con éxito',
              'success'
            )
            this.router.navigate(['/campanias']); 
          }
        )
       
      }
    });
    
    
    
  }
  
  onSubmitEjecutar(){
    this.convertirAWhatsAppText();
    
    
    this.spinner.show();
    this.saveCampania().then(
      res => {
        
        this.ejecutarCampania().then(
          res => {
            
            Swal.fire(
              'Ejecutada',
              'Se ha ejecutado con éxito',
              'success'
            );
            this.router.navigate(['/campanias']); 
          }
        )
      }
    )
    
  }
  saveCampania(){
    
    
      return new Promise((resolve, reject)=>{
        
        this.campaniaService.save(this.campania).subscribe(
          (res:any) => {
            
            if(this.selectedFile){

              this.campaniaService.onUpload(this.selectedFile).subscribe(
                response=>{
                  
                      
                    },
                    error=>{
                      this.spinner.hide();
                      
                    }
                  );
                  
            }
            
            this.campania = res;
            resolve(true);
            this.spinner.hide();
          },
          err => {
            reject();
            this.spinner.hide();
          }
        );
  
      });
    
  }

  ejecutarCampania(){
    return new Promise((resolve, reject)=>{
      this.campaniaService.ejecutar(this.campania.id).subscribe(
        res => { 
          
          resolve(true);
          
        }, 
        err => {
          reject();
        }
      )
  
    });
  }

  
}
