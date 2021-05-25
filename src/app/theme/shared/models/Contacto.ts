import {Injectable} from '@angular/core';
import { ContactoInteres } from './ContactoInteres';
@Injectable()
export class Contacto{
    public constructor(
        public id: string = "",
        public nombres: string = "",
        public apellidos:string = "",
     
        public celular: string = "",
        public correo: string = "",
        public seleccionado: boolean = false,
        public recomendado: boolean = false,
        public status: string = "",
        public usuario_ingresa_id: string = "",

        
        public contactointereses: Array<ContactoInteres> = [],
    ){
        this.usuario_ingresa_id = localStorage.getItem('usuario_id');
    }
    


}