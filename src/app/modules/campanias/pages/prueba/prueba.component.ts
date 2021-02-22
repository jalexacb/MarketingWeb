import { Component, OnInit } from '@angular/core';
import { CampaniaService } from 'src/app/core/services/campania.service';
import { LoginService } from 'src/app/core/services/login.service';
import { SocketService } from 'src/app/core/services/socket.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent implements OnInit {
  public campania;
  public status: string;
  public froala_options: Object = {
    charCounterCount: false,
    toolbarButtons: ['bold', 'italic','underline'],
    toolbarButtonsXS: ['bold', 'italic','underline'],
    toolbarButtonsSM: ['bold', 'italic','underline'],
    toolbarButtonsMD: ['bold', 'italic','underline'],
    pluginsEnabled: [], 

  }
  constructor(
    private campaniaService: CampaniaService,
    private socketService: SocketService,
  ) {
    this.campania = {
      body: "",
      to: "",
      name: "",
    };
    this.status = "";
   }

  ngOnInit() {
    this.socketService.listen().listen('.test', (data) => {
        console.log(data);
        if(data.message=='sent'){
          this.status = 'Enviado'
        }else if(data.message == 'failed'){
          this.status = 'Fallo'
        }else if(data.message == 'delivered'){
          this.status = 'Entregado'
        }else if(data.message == 'read'){
          this.status = 'Leído';
        }
        console.log("status", this.status);
      });
    
  }

  onChangeCategoria(event){
    console.log(event.target.value);
  }

  sendMessage(){
    this.convertirAWhatsAppText();
    this.campaniaService.savePruebas(this.campania).subscribe(
      res => {

      },
      err => {

      }
    )
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
    this.campania.body = this.campania.body.replace(parrafoTagInicial, '');
    this.campania.body = this.campania.body.replace(parrafoTagFinal, '');
    this.campania.body = this.campania.body.replace(tagNBSP, '');
    this.campania.body = this.campania.body.replace(tagBr, '');

    whatsAppFormat.forEach(({ tag, symbol }) => {
      let tagInicial = `<${tag}>`;
      let tagFinal = `</${tag}>`;

      // var cadena = "Test abc test test abc test test test abc test test abc";
      let regInicio = new RegExp(tagInicial,'g');
      let regFin = new RegExp(tagFinal,'g');
      const matchInicio = this.campania.body.match(regInicio);
      const matchFinal = this.campania.body.match(regInicio);
      if(!matchInicio && !matchFinal) return;
      this.campania.body = this.campania.body.replace(regInicio, symbol);
      this.campania.body = this.campania.body.replace(regFin, symbol);

    // console.log(this.campania.body);
    });
// console.log(this.campania.body);
   
  }

  convertirAHtmlText(){
    // const htmlFormat = [
     //     { symbol: '*', tag: 'strong' },
     //     { symbol: '_', tag: 'em' },
     //     { symbol: '~', tag: 'u' },
     //     { symbol: '`', tag: 'code' },
     // ];
     // console.log("hola");
 
     // htmlFormat.forEach(({ symbol, tag }) => {
     //     if(!this.campania.body) return;
 
     //     const regex = new RegExp(`\\${symbol}([^${symbol}]*)\\${symbol}`, 'gm');
     //     const match = this.campania.body.match(regex);
     //     if(!match) return;
 
     //     match.forEach(m => {
     //         let formatted = m;
     //         for(let i=0; i<2; i++){
     //             formatted = formatted.replace(symbol, `<${i > 0 ? '/' : ''}${tag}>`);
     //         }
     //         this.campania.body = this.campania.body.replace(m, formatted);
     //     });
     // });
 
     // console.log(this.campania.body); 
 }
}

