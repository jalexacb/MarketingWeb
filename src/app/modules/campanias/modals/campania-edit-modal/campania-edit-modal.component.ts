import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CampaniaService } from 'src/app/core/services/campania.service';
import { CanalService } from 'src/app/core/services/canal.service';
import { ContactoService } from 'src/app/core/services/contacto.service';
import { InteresService } from 'src/app/core/services/interes.service';
import { Campania } from 'src/app/theme/shared/models/Campania';
import { Canal } from 'src/app/theme/shared/models/Canal';
import { Contacto } from 'src/app/theme/shared/models/Contacto';
import { Interes } from 'src/app/theme/shared/models/Interes';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-campania-edit-modal',
  templateUrl: './campania-edit-modal.component.html',
  styleUrls: ['./campania-edit-modal.component.scss']
})
export class CampaniaEditModalComponent implements OnInit {
  public canales: Array<Canal>;
  public contactos:Array<Contacto>;
  public intereses: Array<Interes>;
  @Input() campania: Campania;
  public spinner1: string = 'sp_campania_edit'; 
  public step: number;
  constructor(
    private spinner: NgxSpinnerService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private canalService: CanalService,
    private contactoService: ContactoService,
    private interesService: InteresService,
    private campaniaService: CampaniaService,
  ) { 
    
    this.canales = [];
    this.intereses = [];
    this.contactos = [];
    this.campania = new Campania();
    this.campania.contactos = [];
    this.campania.intereses = [];
    this.campania.canales = [];
    // this.campania = new Campania();
    
    this.step = 1;
  }

  ngOnInit() {
    console.log("camp",this.campania);
    this.spinner.show(this.spinner1);
    let p1 = this.getCanales();
    let p2 = this.getContactos();
    let p3 = this.getIntereses();
    

    Promise.all([p1,p2,p3])
      .then(result => {
        this.spinner.hide(this.spinner1);
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
      this.campania.contactos = [];
    this.campania.intereses = [];
    this.campania.canales = [];
    this.campania.campania_contactos.forEach(campania_contacto => {
      this.campania.contactos.push(campania_contacto.contacto);
    });
    this.campania.campania_canales.forEach(campania_canal => {
      this.campania.canales.push(campania_canal.canal);
    });
    this.campania.campania_intereses.forEach(campania_interes => {
      this.campania.intereses.push(campania_interes.interes);
    });

    console.log("c",this.campania.contactos);
  }

  next(){
    this.step += 1;
  }
  back(){
      this.step -= 1;
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

  onSubmit(){
    this.convertirAWhatsAppText();
    // this.setValues();
    console.log(this.campania);

    this.campaniaService.update(this.campania).subscribe(
      res => {
        Swal.fire(
          'Modificado',
          'Se ha modificado con éxito',
          'success'
        )
        this.activeModal.close();
      },
      err => {

      }
    );
  }

}
