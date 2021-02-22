import {Injectable} from '@angular/core';
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

        
        
    ){
        this.usuario_ingresa_id = localStorage.getItem('usuario_id');
    }


}