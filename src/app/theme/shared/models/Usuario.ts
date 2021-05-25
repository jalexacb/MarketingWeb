import { Rol } from "./Rol";

export class Usuario{
    public constructor(
        public id:string = "",
        public usuario:string = "",
        public password:string = "",
        public nombres: string = "",
        public rol_id: string = "",
        public getToken: boolean = false,
        public apellidos: string = "",
        public sexo: string = "",
        public fecha_nacimiento: string = "",
        public nacionalidad: string = "",
        public image: string = "",
        public path_logo: string = "",
        public status: string = "",
        public usuario_ingresa_id:string = "",

        public rol: Rol = new Rol(),
        
    ){
        this.usuario_ingresa_id = localStorage.getItem('usuario_id');
    }


}