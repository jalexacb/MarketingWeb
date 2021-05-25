import {Injectable} from '@angular/core';
import { Contacto } from './Contacto';
@Injectable()
export class CampaniaContacto{
    public constructor(
        public id: string = "",
        public campania_id: string = "",
        public contacto_id: string = "",
        public usuario_ingresa_id: string = "",

        public contacto:Contacto = new Contacto(),
        
    ){
        this.usuario_ingresa_id = localStorage.getItem('usuario_id');
    }


}