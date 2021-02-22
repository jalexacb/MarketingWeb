import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CampaniaService } from 'src/app/core/services/campania.service';
import { CanalService } from 'src/app/core/services/canal.service';
import { ContactoService } from 'src/app/core/services/contacto.service';
import { InteresService } from 'src/app/core/services/interes.service';
import { Campania } from 'src/app/theme/shared/models/Campania';
import { Canal } from 'src/app/theme/shared/models/Canal';
import { Contacto } from 'src/app/theme/shared/models/Contacto';
import { Interes } from 'src/app/theme/shared/models/Interes';

@Component({
  selector: 'app-campania-frm',
  templateUrl: './campania-frm.component.html',
  styleUrls: ['./campania-frm.component.scss']
})
export class CampaniaFrmComponent implements OnInit {
  @Input() campania: Campania;
  @Input() step: number;
  @Input() canales: Array<Canal>;
  @Input() contactos:Array<Contacto>;
  @Input() intereses: Array<Interes>;
  public settingsSelect: {
    
    // allowSearchFilter: true
  };
  public froala_options: Object = {
    charCounterCount: false,
    toolbarButtons: ['bold', 'italic','strikeThrough'],
    toolbarButtonsXS: ['bold', 'italic','strikeThrough'],
    toolbarButtonsSM: ['bold', 'italic','strikeThrough'],
    toolbarButtonsMD: ['bold', 'italic','strikeThrough'],
    pluginsEnabled: [], 

  };
  public spinner1: string = 'sp_campania_add'; 
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

      
  }

  

  onItemSelect(item: any) {
    console.log(item);
    let intereses = [];
    this.campania.intereses.forEach(interes => {
      intereses.push(interes.nombre);
    });
    
    this.getRecomendacion(intereses);
  }

  getRecomendacion(intereses){
    console.log("int",intereses);
    this.contactoService.getRecomendacion(intereses).subscribe(
      (res:any) =>{
        console.log("recomendación",res);
        let contactosRecomendados = res;
        // this.campania.contactos = [];
        contactosRecomendados.forEach(contactoR => {
          let contactoRecomendado = this.contactos.filter(contacto=>contacto.nombres === contactoR.nombre)[0];
          // contactoRecomendado.seleccionado = true;
          if(contactoRecomendado){
            contactoRecomendado.recomendado = true;
          }
          
          // this.campania.contactos.push(contactoRecomendado);
        });
        this.isSelectedAll = true;
        this.campania.contactos.forEach(contacto => {
          console.log("co", this.contactos);
          let contactoSeleccionado = this.contactos.filter(c=> c.id === contacto.id)[0];
          if(contactoSeleccionado){
            contactoSeleccionado.seleccionado = true;
          } else {
            this.isSelectedAll = false;
          }
           
        });
        console.log(this.campania.contactos);
        // this.contactos.forEach(contacto => {
        //   if(contacto.nombres === res.nombre)
        // });
        
      }
    )
  }

  onSelectAll(items: any) {
    console.log(items);
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
        this.campania.url_media = event.target.result; 
        
      } 
      this.campania.nombre_archivo = event.target.files[0].name;
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
}
