import { Menu } from "./Menu";
import { Rol } from "./Rol";
import { Usuario } from "./Usuario";

export class Registro{
    public constructor(
        public id:string = "",
    
        public tipo: string = "",
        public nombre: string = "",
        public menu_id: string = "",
        public usuario_ingresa_id:string = "",
        public fecha_ingresa: any = null,
        public menu: Menu = new Menu(),
        public usuario:Usuario = new Usuario(),  
    ){}


}