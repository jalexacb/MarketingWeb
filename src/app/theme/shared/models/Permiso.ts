import { Menu } from "./Menu";
import { Rol } from "./Rol";
import { Usuario } from "./Usuario";

export class Permiso{
    public constructor(
        public id:string = "",
    
        public rol_id: string = "",
        public usuario_id: string = "",
        public menu_id: string = "",
        public ver: boolean = false,
        public crear: boolean = false,
        public editar: boolean = false,
        public eliminar: boolean = false,
        public usuario_ingresa_id:string = "",

        public menu: Menu = new Menu(),
        public usuario:Usuario = new Usuario(),
        public rol: Rol = new Rol()
        
    ){}


}