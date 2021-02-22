import {Injectable} from '@angular/core';
@Injectable()
export class Parametro{
    public constructor(
        public id: string = "",
        public nombre: string = "",
        public valor: string = "",
        public status: string = "",
        public usuario_ingresa_id: string = "",

        
        
    ){
        this.usuario_ingresa_id = localStorage.getItem('usuario_id');
    }


}