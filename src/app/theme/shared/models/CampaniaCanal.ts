import {Injectable} from '@angular/core';
import { Canal } from './Canal';
@Injectable()
export class CampaniaCanal{
    public constructor(
        public id: string = "",
        public campania_id: string = "",
        public canal_id: string = "",
        public usuario_ingresa_id: string = "",

        public canal:Canal = new Canal(),
        
    ){
        this.usuario_ingresa_id = localStorage.getItem('usuario_id');
    }


}