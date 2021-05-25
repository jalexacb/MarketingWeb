export class Menu{
    public constructor(
        public id: string = "",

        // public id: string = "",
        public title: string = "",
        public type: 'item' | 'collapse' | 'group' = 'item',
        public translate: string = "",
        public icon: string = "",
        public hidden: boolean = false,
        public url: string ="",
        public classes: string = "",
        public exactMatch: boolean = false,
        public external: boolean = false,
        public target: boolean = false,
        public breadcrumbs: boolean = false,
        public functionM?: any,
        public badge?: {
            title?: string,
            type?: string,
        },
        public padre_id:string = "",
        public children?: Menu[],
    ){

    }
}

// export class Menu{
//     public constructor(
        
        
        
//     ){
//         // this.usuario_ingresa_id = localStorage.getItem('usuario_id');
//     }


// }