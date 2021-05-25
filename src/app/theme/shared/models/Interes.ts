import {Injectable} from '@angular/core';
@Injectable()
export class Interes{
    public constructor(
        public id: string = "",
        public nombre: string = "",
        public status: string = "",
        public usuario_ingresa_id: string = "",

        
        
    ){
        this.usuario_ingresa_id = localStorage.getItem('usuario_id');
    }


}