import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Step, StepperProgressBarController } from 'stepper-progress-bar';
// import { StepProgressBarComponent } from 'step-progress-bar/lib/step-progress-bar/step-progress-bar.component';
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
import { resolve } from 'url';
// import MediumEditor from 'medium-editor';
@Component({
  selector: 'app-campania-add-modal',
  templateUrl: './campania-add-modal.component.html',
  styleUrls: ['./campania-add-modal.component.scss'],
  // animations: [
  //   trigger(
  //     'enterAnimation', [
  //       transition(':enter', [
  //         style({transform: 'translateX(100%)', opacity: 0}),
  //         animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
  //       ]),
  //       transition(':leave', [
  //         style({transform: 'translateX(0)', opacity: 1}),
  //         animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
  //       ])
  //     ]
  //   )
  // ],
})
export class CampaniaAddModalComponent implements OnInit {
  // @ViewChild('editable', { static: true }) editable: ElementRef;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {}
  // editor: any;
  public step: number;
  public canales: Array<Canal>;
  public contactos:Array<Contacto>;
  public intereses: Array<Interes>;
  public canalesSeleccionados: Array<Canal>;
  public contactosSeleccionados:Array<Contacto>;
  public interesesSeleccionados: Array<Interes>;
  public campania: Campania;
  public settings={};
  public contactosSettings={};
  public interesesSettings={};
  // public isSelectedAll: boolean;
  public nombre_archivo: string;
  public nombre: string = '';
  public spinner1: string = 'sp_campania_edit'; 
  public path_logo = '';
  public link = '';
  public is_permitido: boolean;
//   ,'paragraphFormat','alert'
// ,'paragraphFormat','alert'
// ,'paragraphFormat','alert'
// ,'paragraphFormat','alert'
  // public froala_options: Object = {
  //   charCounterCount: false,
  //   toolbarButtons: ['bold', 'italic','strikeThrough'],
  //   toolbarButtonsXS: ['bold', 'italic','strikeThrough'],
  //   toolbarButtonsSM: ['bold', 'italic','strikeThrough'],
  //   toolbarButtonsMD: ['bold', 'italic','strikeThrough'],
  //   pluginsEnabled: [], 

  // }
  public selectedFile: File;
  constructor(
    private spinner: NgxSpinnerService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private canalService: CanalService,
    private contactoService: ContactoService,
    private interesService: InteresService,
    private campaniaService: CampaniaService,
  ) { 
    this.step = 1;
    this.canales = [];
    this.intereses = [];
    this.contactos = [];
    this.canalesSeleccionados = [];
    this.interesesSeleccionados = [];
    this.contactosSeleccionados = [];
    this.campania = new Campania();
    this.nombre_archivo = "";
    this.is_permitido = false;
    // this.isSelectedAll = false;
  }

  
  // ngAfterViewInit(): void {
  //   this.editor = new MediumEditor(this.editable.nativeElement);
  // }

  ngOnInit() {
    this.spinner.show(this.spinner1);
    let p1 = this.getCanales();
    let p2 = this.getContactos();
    let p3 = this.getIntereses();

    Promise.all([p1,p2,p3])
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
      // this.settings = {
      //   singleSelection: false,
      //   idField: 'id',
      //   textField: 'nombre',
      //   selectAllText: 'Seleccione todo',
      //   unSelectAllText: 'Deseleccione todo',
      //   itemsShowLimit: 3,
      //   // allowSearchFilter: true
      // };
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

      // var cadena = "Test abc test test abc test test test abc test test abc";
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
    this.saveCampania().then(
      res =>{
        Swal.fire(
          'Creado',
          'Se ha creado con éxito',
          'success'
        )
        this.activeModal.close();
      }
    )
    
  }
  
  onSubmitEjecutar(){
    this.convertirAWhatsAppText();
    this.saveCampania().then(
      res => {
        this.ejecutarCampania().then(
          res => {
            Swal.fire(
              'Ejecutada',
              'Se ha ejecutado con éxito',
              'success'
            );
            this.activeModal.close();
          }
        )
      }
    )
    
  }
  saveCampania(){
    if(this.selectedFile){
      return new Promise((resolve, reject)=>{
        this.campaniaService.onUpload(this.selectedFile).subscribe(
          response=>{
             if(response.status=='success'){
               this.campaniaService.save(this.campania).subscribe(
                (res:any) => {
                  this.campania = res;
                  resolve(true);
                  
                },
                err => {
                  reject();
                }
              );
             }
             resolve(true);
          },
          error=>{
            reject();
            console.log(<any>error);
          }
        );
        
      });
    }else {
      return new Promise((resolve, reject)=>{
      this.campaniaService.save(this.campania).subscribe(
        (res:any) => {
          this.campania = res;
          resolve(true);
          
        },
        err => {
          reject();
        }
      );
      });
    }
    
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
