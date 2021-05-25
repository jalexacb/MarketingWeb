import {Injectable} from '@angular/core';
import { Campania } from './Campania';
import { Canal } from './Canal';
@Injectable()
export class EventoCampania{
    public constructor(
        public id: string = "",
        public fecha_inicio: any = null,
        public fecha_fin: any = null,
        public status: string = "",
        public campania_id: string = "",
        public usuario_ingresa_id: string = "",

        public campania:Campania = new Campania(),
        
    ){
        this.usuario_ingresa_id = localStorage.getItem('usuario_id');
    }


}