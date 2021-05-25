import {Injectable} from '@angular/core';
import { CampaniaCanal } from './CampaniaCanal';
import { CampaniaContacto } from './CampaniaContacto';
import { CampaniaInteres } from './CampaniaInteres';
import { CampaniaObjetiivo } from './CampaniaObjetivo';
import { Canal } from './Canal';
import { Contacto } from './Contacto';
import { Interes } from './Interes';
import { Objetivo } from './Objetivo';
@Injectable()
export class Campania{
    public constructor(
        public id: string = "",
        public nombre: string = "",
        public descripcion:string = "",
        public mensaje: string = "",
        public tipo: string = "",
        public url: string = "",
        public url_media: string = "",
        public url_logo: string = "",
        public status: string = "",
        public nombre_archivo:string = "",
        public usuario_ingresa_id: string = "",
        public recomendado: boolean = false,
        public campania_contactos: Array<CampaniaContacto> = [],
        public campania_objetivos: Array<CampaniaObjetiivo> = [],
        public campania_canales: Array<CampaniaCanal> = [],
        public campania_intereses: Array<CampaniaInteres> = [],
        public objetivos: Array<Objetivo> = [],
        public contactos: Array<Contacto> = [],
        public canales: Array<Canal> = [],
        public intereses: Array<Interes> = [],
        
    ){
        this.usuario_ingresa_id = localStorage.getItem('usuario_id');
    }


}