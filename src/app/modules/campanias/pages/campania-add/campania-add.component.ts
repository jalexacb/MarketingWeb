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
import { Objetivo } from 'src/app/theme/shared/models/Objetivo';
import { ObjetivoService } from 'src/app/core/services/objetivo.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-campania-add',
  templateUrl: './campania-add.component.html',
  styleUrls: ['./campania-add.component.scss']
})
export class CampaniaAddComponent implements OnInit {
  // @ViewChild('editable', { static: true }) editable: ElementRef;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {}
  // editor: any;
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

 //...
  // addAllContacto(){
  //   this.contactosSeleccionados = [];
  //   this.contactos.forEach(contacto=>{
  //     contacto.seleccionado = this.isSelectedAll;
  //     if(this.isSelectedAll){
        
  //       this.contactosSeleccionados.push(contacto);
  //     }
  //   });
  // }

  // addContacto(contacto:Contacto, i:number=null){
  //   let contactoSeleccionado = this.contactos.filter((c)=> c.id === contacto.id)[0];
  //   if(contactoSeleccionado.seleccionado){
  //     this.contactosSeleccionados.push(contacto);
  //   }else{
  //     this.contactosSeleccionados.splice(i, 1);
  //   }
    
  // }
  // onItemSelect(item: any) {
  //   console.log(item);
  //   let intereses = [];
  //   this.interesesSeleccionados.forEach(interes => {
  //     intereses.push(interes.nombre);
  //   });
    
  //   this.contactoService.getRecomendacion(intereses).subscribe(
  //     (res:any) =>{
  //       console.log("recomendación",res);
  //       let contactosRecomendados = res;
  //       this.contactosSeleccionados = [];
  //       contactosRecomendados.forEach(contactoR => {
  //         let contactoRecomendado = this.contactos.filter(contacto=>contacto.nombres === contactoR.nombre)[0];
  //         contactoRecomendado.seleccionado = true;
  //         this.contactosSeleccionados.push(contactoRecomendado);
  //       });
  //       console.log(this.contactosSeleccionados);
  //       // this.contactos.forEach(contacto => {
  //       //   if(contacto.nombres === res.nombre)
  //       // });
        
  //     }
  //   )
  // }
  // onSelectAll(items: any) {
  //   console.log(items);
  // }
    
    //...
    next(){
      this.step += 1;
    }
    back(){
        this.step -= 1;
    }

    
  autoGrowTextZone(e, event) {
    // e.target.style.height = "0px";
    // e.target.style.height = (e.target.scrollHeight + 25)+"px";

    // e.target.style.overflow = 'hidden';
    // e.target.style.height = 0;
    // e.target.style.height = e.target.scrollHeight + 'px';
    // console.log(event);
    var el = this;
    let height = (event.style.height).substring(0, (event.style.height).length -2);
    // console.log(height);
    setTimeout(function(){
      if(height < 580){
        e.target.style.cssText = 'height:auto;';
        event.style.cssText = 'height:auto;';
        // for box-sizing other than "content-box" use:
        // e.target.style.cssText = '-moz-box-sizing:content-box';
        e.target.style.cssText = 'height:' + e.target.scrollHeight + 'px';
        event.style.cssText = 'height:' + e.target.scrollHeight + 'px';
      }
      
    },0);

    // if( !e.target.classList.contains('autoExpand') || e.target.nodeName != 'TEXTAREA' ) return
  
    // var minRows = e.target.getAttribute('data-min-rows')|0, rows;
    // !e.target._baseScrollHeight && this.getScrollHeight(e.target)
  
    // e.target.rows = minRows
    // rows = Math.ceil((e.target.scrollHeight - e.target._baseScrollHeight) / 16)
    // e.target.rows = minRows + rows
  }

  // getScrollHeight(elm){
  //   let savedValue = elm.value
  //   elm.value = ''
  //   elm._baseScrollHeight = elm.scrollHeight
  //   elm.value = savedValue
  // }

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

  getImage(event){
    this.selectedFile = event;
    console.log("padre",this.selectedFile);
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
  // readUrl(event:any) { 
  //   if (event.target.files && event.target.files[0]) { 
  //     var reader = new FileReader(); 

  //     reader.onload = (event:any) => { 
  //       this.path_logo = event.target.result; 
        
  //     } 
  //     this.campania.nombre_archivo = event.target.files[0].name;
  //     reader.readAsDataURL(event.target.files[0]); 
  //   } 
  // } 

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

  // verificarURL(){

  //   // let re = `(http|ftp|https)://[\w-]+(\.[\w-]+)*([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?`;
  //   // let regex = new RegExp(re, 'mg');
  // //   let urlexp = new RegExp( '(http|ftp|https)://[\\w-]+(\\.[\\w-]+)+([\\w-.,@?^=%&:/~+#-]*[\\w@?^=%&;/~+#-])?' );
  // // //  let urlexp = /([a-z]+\:\/+)([^\/\s]*)([a-z0-9\-@\^=%&;\/~\+]*)[\?]?([^ \#]*)#?([^ \#]*)/ig; 
  // //   let urlexp1 = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi); 
  //   let expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  //   let regex = new RegExp(expression);
  //   const match = this.campania.url.match(regex);
  //   // const match1 = this.link.match(regex);
  //   // console.log(match);
  //     // const matchFinal = this.campania.body.match(regInicio);
  //     if(!match ) return false;
  //     if(match) return true;

  //   return;
  // }
  setValues(){
    this.campania.contactos = this.contactosSeleccionados;
    this.campania.canales = this.canalesSeleccionados;
    this.campania.intereses = this.interesesSeleccionados;
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
    console.log(this.campania);
    
    
  }
  
  onSubmitEjecutar(){
    this.convertirAWhatsAppText();
    // this.setValues();
    console.log(this.campania);
    this.spinner.show();
    this.saveCampania().then(
      res => {
        console.log(this.campania.id);
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
                  //  if(response.status=='success'){
                      console.log(response);
                    },
                    error=>{
                      this.spinner.hide();
                      console.log(<any>error);
                    }
                  );
                  
            }
            console.log("res",res);
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
    // }else {
    //   return new Promise((resolve, reject)=>{
    //   this.campaniaService.save(this.campania).subscribe(
    //     (res:any) => {
    //       this.campania = res;
    //       resolve(true);
    //       this.spinner.hide();
    //     },
    //     err => {
    //       reject();
    //       this.spinner.hide();
    //     }
    //   );
    //   });
    // }
    
  }

  ejecutarCampania(){
    return new Promise((resolve, reject)=>{
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

  
}
