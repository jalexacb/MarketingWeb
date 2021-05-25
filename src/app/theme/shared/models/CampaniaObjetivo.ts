import {Injectable} from '@angular/core';
import { Objetivo } from './Objetivo';
@Injectable()
export class CampaniaObjetiivo{
    public constructor(
        public id: string = "",
        public campania_id: string = "",
        public objetivo_id: string = "",
        public usuario_ingresa_id: string = "",

        public objetivo:Objetivo = new Objetivo(),
        
    ){
        this.usuario_ingresa_id = localStorage.getItem('usuario_id');
    }


}