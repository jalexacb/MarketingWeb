import {Injectable} from '@angular/core';
import { Interes } from './Interes';

@Injectable()
export class ContactoInteres{
    public constructor(
        public id: string = "",
        public contacto_id: string = "",
        public interes_id: string = "",
        public usuario_ingresa_id: string = "",

        public interes:Interes = new Interes(),
        
    ){
        this.usuario_ingresa_id = localStorage.getItem('usuario_id');
    }


}