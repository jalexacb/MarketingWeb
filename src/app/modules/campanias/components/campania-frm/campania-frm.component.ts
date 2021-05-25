import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CampaniaService } from 'src/app/core/services/campania.service';
import { CanalService } from 'src/app/core/services/canal.service';
import { ContactoService } from 'src/app/core/services/contacto.service';
import { InteresService } from 'src/app/core/services/interes.service';
import { Campania } from 'src/app/theme/shared/models/Campania';
import { Canal } from 'src/app/theme/shared/models/Canal';
import { Contacto } from 'src/app/theme/shared/models/Contacto';
import { Interes } from 'src/app/theme/shared/models/Interes';
import { Objetivo } from 'src/app/theme/shared/models/Objetivo';
// import 'froala-editor/js/languages/es';
// import 'node_modules/froala-editor/js/languages/es.js';
@Component({
  selector: 'app-campania-frm',
  templateUrl: './campania-frm.component.html',
  styleUrls: ['./campania-frm.component.scss']
})
export class CampaniaFrmComponent implements OnInit {
  @Input() campania: Campania;
  @Input() step: number;
  @Input() objetivos: Array<Objetivo>;
  @Input() canales: Array<Canal>;
  @Input() contactos:Array<Contacto>;
  @Input() intereses: Array<Interes>;
  @Output() sendImage: EventEmitter<File>= new EventEmitter<File>();
  public settingsSelect: {

    // allowSearchFilter: true
  };
  public froala_options: Object = {
    language: 'es',
    emoticonsUseImage: false,
    // emoticonsUseImage: true,
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic','strikeThrough','emoticons'],
    toolbarButtonsSM: ['bold', 'italic','strikeThrough','emoticons' ],
    toolbarButtonsMD: ['bold', 'italic','strikeThrough','emoticons'],
    // toolbarButtons: ['fontAwesome'],
    plugins: ['emoticons'],
    emoticonsStep: 8,
    emoticonsSet: [
      {code: '1f600', desc: 'Grinning face'},
      {code: '1f601', desc: 'Grinning face with smiling eyes'},
      {code: '1f602', desc: 'Face with tears of joy'},
      {code: '1f603', desc: 'Smiling face with open mouth'},
      {code: '1f604', desc: 'Smiling face with open mouth and smiling eyes'},
      {code: '1f605', desc: 'Smiling face with open mouth and cold sweat'},
      {code: '1f606', desc: 'Smiling face with open mouth and tightly-closed eyes'},
      {code: '1f607', desc: 'Smiling face with halo'},

      {code: '1f608', desc: 'Smiling face with horns'},
      {code: '1f609', desc: 'Winking face'},
      {code: '1f60a', desc: 'Smiling face with smiling eyes'},
      {code: '1f60b', desc: 'Face savoring delicious food'},
      {code: '1f60c', desc: 'Relieved face'},
      {code: '1f60d', desc: 'Smiling face with heart-shaped eyes'},
      {code: '1f60e', desc: 'Smiling face with sunglasses'},
      {code: '1f60f', desc: 'Smirking face'},

      {code: '1f610', desc: 'Neutral face'},
      {code: '1f611', desc: 'Expressionless face'},
      {code: '1f612', desc: 'Unamused face'},
      {code: '1f613', desc: 'Face with cold sweat'},
      {code: '1f614', desc: 'Pensive face'},
      {code: '1f615', desc: 'Confused face'},
      {code: '1f616', desc: 'Confounded face'},
      {code: '1f617', desc: 'Kissing face'},

      {code: '1f618', desc: 'Face throwing a kiss'},
      {code: '1f619', desc: 'Kissing face with smiling eyes'},
      {code: '1f61a', desc: 'Kissing face with closed eyes'},
      {code: '1f61b', desc: 'Face with stuck out tongue'},
      {code: '1f61c', desc: 'Face with stuck out tongue and winking eye'},
      {code: '1f61d', desc: 'Face with stuck out tongue and tightly-closed eyes'},
      {code: '1f61e', desc: 'Disappointed face'},
      {code: '1f61f', desc: 'Worried face'},

      {code: '1f620', desc: 'Angry face'},
      {code: '1f621', desc: 'Pouting face'},
      {code: '1f622', desc: 'Crying face'},
      {code: '1f623', desc: 'Persevering face'},
      {code: '1f624', desc: 'Face with look of triumph'},
      {code: '1f625', desc: 'Disappointed but relieved face'},
      {code: '1f626', desc: 'Frowning face with open mouth'},
      {code: '1f627', desc: 'Anguished face'},

      {code: '1f628', desc: 'Fearful face'},
      {code: '1f629', desc: 'Weary face'},
      {code: '1f62a', desc: 'Sleepy face'},
      {code: '1f62b', desc: 'Tired face'},
      {code: '1f62c', desc: 'Grimacing face'},
      {code: '1f62d', desc: 'Loudly crying face'},
      {code: '1f62e', desc: 'Face with open mouth'},
      {code: '1f62f', desc: 'Hushed face'},

      {code: '1f630', desc: 'Face with open mouth and cold sweat'},
      {code: '1f631', desc: 'Face screaming in fear'},
      {code: '1f632', desc: 'Astonished face'},
      {code: '1f633', desc: 'Flushed face'},
      {code: '1f634', desc: 'Sleeping face'},
      {code: '1f635', desc: 'Dizzy face'},
      {code: '1f636', desc: 'Face without mouth'},
      {code: '1f637', desc: 'Face with medical mask'},

      {code: '1f44b', desc: 'Waving Hand'},
      {code: '1f91a', desc: 'Raised Back of Hand'},
      {code: '1f590', desc: 'Hand With Fingers Splayed'},
      {code: '270b', desc: 'Raised hand'},
      {code: '1f596', desc: 'Vulcan Salute'},
      {code: '1f44c', desc: 'Ok Hand'},
      {code: '270c', desc: 'Victory Hand'},
      {code: '1f91e', desc: 'Crossed Fingers'},
      {code: '1f91f', desc: 'Love-You Gesture'},
      {code: '1f918', desc: 'Sign Of The Horns'},
      {code: '1f919', desc: 'Call Me Hand'},
      {code: '1f448', desc: 'Backhand Index Pointing Left'},
      {code: '1f449', desc: 'Backhand Index Pointing Right'},
      {code: '1f446', desc: 'Backhand Index Pointing Up'},
      {code: '1f595', desc: 'Middle Finger'},
      {code: '1f447', desc: 'Backhand Index Pointing Down'},
      {code: '261d', desc: 'Index Pointing Up'},
      {code: '1f44d', desc: 'Thumbs Up'},
      {code: '1f44e', desc: 'Thumbs Down'},
      {code: '270a', desc: 'Raised Fist'},
      {code: '1f44a', desc: 'Oncoming Fist'},

      { code: '1F435', desc: 'Monkey Face' },
      { code: '1F412', desc: 'Monkey' },
      { code: '1F436', desc: 'Dog Face' },
      { code: '1F415', desc: 'Dog' },
      { code: '1F429', desc: 'Poodle' },
      { code: '1F43A', desc: 'Wolf Face' },
      { code: '1F431', desc: 'Cat Face' },
      { code: '1F408', desc: 'Cat' },
      { code: '1F42F', desc: 'Tiger Face' },
      { code: '1F405', desc: 'Tiger' },
      { code: '1F406', desc: 'Leopard' },
      { code: '1F434', desc: 'Horse Face' },
      { code: '1F40E', desc: 'Horse' },
      { code: '1F42E', desc: 'Cow Face' },
      { code: '1F402', desc: 'Ox' },
      { code: '1F403', desc: 'Water Buffalo' }, 
    ]

  };
  public spinner1: string = 'sp_campania_add';
  public spinner2 = 'sp_contacto';
  public isSelectedAll: boolean;

  constructor(
    private spinner: NgxSpinnerService,
    private canalService: CanalService,
    private contactoService: ContactoService,
    private interesService: InteresService,
    private campaniaService: CampaniaService,
  ) {

    // this.canales = [];
    // this.contactos = [];
    // this.intereses = [];
    this.isSelectedAll = false;

  }

  ngOnInit() {
    //  this.spinner.show(this.spinner1);
    // let p1 = this.getCanales();
    // let p2 = this.getContactos();
    // let p3 = this.getIntereses();

    // Promise.all([p1,p2,p3])
    //   .then(result => this.spinner.hide(this.spinner1))
    //   .catch(error => this.spinner.hide(this.spinner1));

      this.settingsSelect = {
        singleSelection: false,
        idField: 'id',
        textField: 'nombre',
        selectAllText: 'Seleccione todo',
        unSelectAllText: 'Deseleccione todo',
        itemsShowLimit: 3,
      };

      let intereses = [];
      this.campania.intereses.forEach(interes => {
        intereses.push(interes.nombre);
      });
      this.getRecomendacion(intereses);

       

        console.log("obfrm",this.campania.objetivos);
  }

  getNombresDetalle(arreglo){
    let nombres = [];
    let str_nombre = "";
    arreglo.forEach(el => {
      nombres.push(el.nombre);
    });
    str_nombre = nombres.join(', ');
    return str_nombre;
  }

  getImage(){
    let image = '';
    if(this.campania.url_logo){
      image = this.campania.url_logo;
    }else if(this.campania.url_media != ''){
      image = 'http://localhost:8000/api/campania/get-image?imagen='+this.campania.url_media;
    }
    return image;
 }


  onItemSelect(item: any) {
    console.log(item);
    let intereses = [];
    this.campania.intereses.forEach(interes => {
      intereses.push(interes.nombre);
    });

    this.getRecomendacion(intereses);
  }

  onInteresDeSelect(item: any) {
    // this.onSearch();
    let intereses = [];
    this.campania.intereses.forEach(interes => {
      intereses.push(interes.nombre);
    });

    this.getRecomendacion(intereses);
    console.log(item);
  //  et intereses = [];
  //   this.campania.intereses.forEach(interes => {
  //     intereses.push(interes.nombre);
  //   });

  //   this.getRecomendacion(int lereses);
  }

  onDeSelectAllIntereses(){
    this.contactos.forEach(contacto => {
     contacto.recomendado = false;

      // this.campania.contactos.push(contactoRecomendado);
    });
  }

  getRecomendacion(intereses){
    console.log("int",intereses);
    this.spinner.show(this.spinner2);
    this.contactoService.getRecomendacion(intereses).subscribe(
      (res:any) =>{
        console.log("recomendación1",res);
        let contactosRecomendados:any = Object.values(res); // valores = ["Scott", "Negro", true, 5];
        // console.log("recomendacion2",contactosRecomendados);
        // for(let i=0; i< contactosRecomendados.length; i++){
        //   console.log("recomendacion3",contactosRecomendados[i]);
        // }
        // this.campania.contactos = [];
        this.contactos.forEach(contacto => {
          let contactoRecomendado = contactosRecomendados.filter(contactoR=>contacto.nombres === contactoR.nombre)[0];
          // contactoRecomendado.seleccionado = true;
          if(contactoRecomendado){
            contacto.recomendado = true;
          }else{
            contacto.recomendado = false;
          }

          // this.campania.contactos.push(contactoRecomendado);
        });
        // this.isSelectedAll = true;
        this.campania.contactos.forEach(contacto => {
          console.log("co", this.contactos);
          let contactoSeleccionado = this.contactos.filter(c=> c.id === contacto.id)[0];
          if(contactoSeleccionado){
            contactoSeleccionado.seleccionado = true;
          } 
          // else {
          //   this.isSelectedAll = false;
          // }

        });
        console.log(this.campania.contactos);
        // this.contactos.forEach(contacto => {
        //   if(contacto.nombres === res.nombre)
        // });
        this.spinner.hide(this.spinner2);

      }
    )
  }

  onSelectAll(items: any) {
    console.log(items);
    let intereses = [];
    this.campania.intereses = items;
    this.campania.intereses.forEach(interes => {
      intereses.push(interes.nombre);
    });

    this.getRecomendacion(intereses);

  }

  addObjetivo(objetivo:Objetivo, i:number=null){
    // let contactoSeleccionado = this.contactos.filter((c)=> c.id === contacto.id)[0];
    // if(contactoSeleccionado.seleccionado){
    //   this.campania.contactos.push(contacto);
    // }else{
    //   this.campania.contactos.splice(i, 1);
    // }
    // this.isSelectedAllObjetivos = true;
    this.campania.objetivos = [];
    this.objetivos.forEach(o=>{
      if(o.seleccionado){
        this.campania.objetivos.push(o);
      }
    });



  }

  addContacto(contacto:Contacto, i:number=null){
    // let contactoSeleccionado = this.contactos.filter((c)=> c.id === contacto.id)[0];
    // if(contactoSeleccionado.seleccionado){
    //   this.campania.contactos.push(contacto);
    // }else{
    //   this.campania.contactos.splice(i, 1);
    // }
    this.isSelectedAll = true;
    this.campania.contactos = [];
    this.contactos.forEach(c=>{
      if(c.seleccionado){
        this.campania.contactos.push(c);
      }else{
        this.isSelectedAll = false;
      }

    });



  }

  addAllContacto(){
    this.campania.contactos = [];
    this.contactos.forEach(contacto=>{
      contacto.seleccionado = this.isSelectedAll;
      if(this.isSelectedAll){

        this.campania.contactos.push(contacto);
      }
    });
  }

  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event:any) => {
        this.campania.url_logo = event.target.result;

      }
      this.campania.url_media = event.target.files[0].name;
      this.sendImage.emit(event.target.files[0]);
      // this.selectedFile=event.target.files[0];
      // console.log(this.selectedFile);
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  verificarURL(){

    // let re = `(http|ftp|https)://[\w-]+(\.[\w-]+)*([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?`;
    // let regex = new RegExp(re, 'mg');
  //   let urlexp = new RegExp( '(http|ftp|https)://[\\w-]+(\\.[\\w-]+)+([\\w-.,@?^=%&:/~+#-]*[\\w@?^=%&;/~+#-])?' );
  // //  let urlexp = /([a-z]+\:\/+)([^\/\s]*)([a-z0-9\-@\^=%&;\/~\+]*)[\?]?([^ \#]*)#?([^ \#]*)/ig;
  //   let urlexp1 = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);
    let expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    let regex = new RegExp(expression);
    const match = this.campania.url.match(regex);
    // const match1 = this.link.match(regex);
    // console.log(match);
      // const matchFinal = this.campania.body.match(regInicio);
      if(!match ) return false;
      if(match) return true;

    return;
  }

  getmessage(event){
    console.log("con", event);
  }


}
