import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rol } from 'src/app/theme/shared/models/Rol';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private url: string;
  public token: string;
  constructor(
    public _http: HttpClient
  ) { 
    this.url = environment.url;
    this.token = localStorage.getItem('token');
  }

  getAll(qs: string = "") {
    // let params = null;
    const headers = new HttpHeaders().set('Content-Type','aplication/json').set('Authorization', `${this.token}`);
    // headers.append('Authorization', `${this.token}`)
    // let options = new HttpO
    return this._http.get(`${this.url}/menu${qs}`,{headers:headers});
  }

  getAllPermisos(qs: string = "") {
    // let params = null;
    const headers = new HttpHeaders().set('Content-Type','aplication/json').set('Authorization', `${this.token}`);
    // headers.append('Authorization', `${this.token}`)
    // let options = new HttpO
    return this._http.get(`${this.url}/menu/permisos${qs}`,{headers:headers});
  }

  getAllMenus(qs: string = "") {
    // let params = null;
    const headers = new HttpHeaders().set('Content-Type','aplication/json').set('Authorization', `${this.token}`);
    // headers.append('Authorization', `${this.token}`)
    // let options = new HttpO
    return this._http.get(`${this.url}/menu/all${qs}`,{headers:headers});
  }

  getMenu_idActual(){
    return localStorage.getItem('menu_id');
  }

  // delete(id:string){
   
    
  //   let params = null;
  //   const headers = new HttpHeaders().set('Content-Type','aplication/json')
  //                                    .set('Authorization', `${this.token}`);
  //   // let options = new HttpO
  //   return this._http.post(`${this.url}/rol/delete/${id}`,params,{headers:headers});
  

  // }

  // save(rol: Rol){
  //   let params = rol;
  //   const headers = new HttpHeaders().set('Content-Type','aplication/json')
  //                                    .set('Authorization', `${this.token}`);
  //   // let options = new HttpO
  //   return this._http.post(`${this.url}/rol/store`,params,{headers:headers});
  // }
}

