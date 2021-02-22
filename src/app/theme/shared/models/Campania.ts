import {Injectable} from '@angular/core';
import { CampaniaCanal } from './CampaniaCanal';
import { CampaniaContacto } from './CampaniaContacto';
import { CampaniaInteres } from './CampaniaInteres';
import { Canal } from './Canal';
import { Contacto } from './Contacto';
import { Interes } from './Interes';
@Injectable()
export class Campania{
    public constructor(
        public id: string = "",
        public nombre: string = "",
        public mensaje: string = "",
        public tipo: string = "",
        public url: string = "",
        public url_media: string = "",
        public status: string = "",
        public nombre_archivo:string = "",
        public usuario_ingresa_id: string = "",

        public campania_contactos: Array<CampaniaContacto> = [],
        public campania_canales: Array<CampaniaCanal> = [],
        public campania_intereses: Array<CampaniaInteres> = [],

        public contactos: Array<Contacto> = [],
        public canales: Array<Canal> = [],
        public intereses: Array<Interes> = [],
        
    ){
        this.usuario_ingresa_id = localStorage.getItem('usuario_id');
    }


}