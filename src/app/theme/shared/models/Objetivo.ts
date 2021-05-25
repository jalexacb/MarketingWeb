import {Injectable} from '@angular/core';
@Injectable()
export class Objetivo{
    public constructor(
        public id: string = "",
        public nombre: string = "",
        public status: string = "",
        public usuario_ingresa_id: string = "",
        public seleccionado: boolean = false,
        public selected: boolean = false,
        
        
    ){
        this.usuario_ingresa_id = localStorage.getItem('usuario_id');
    }


}