import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rol } from 'src/app/theme/shared/models/Rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {
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
    return this._http.get(`${this.url}/rol${qs}`,{headers:headers});
  }

  getById(id, qs: string = "") {
    // let params = null;
    const headers = new HttpHeaders().set('Content-Type','aplication/json').set('Authorization', `${this.token}`);
    // headers.append('Authorization', `${this.token}`)
    // let options = new HttpO
    return this._http.get(`${this.url}/rol/${id}${qs}`,{headers:headers});
  }

  delete(id:string){
   
    
    let params = null;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    // let options = new HttpO
    return this._http.post(`${this.url}/rol/delete/${id}`,params,{headers:headers});
  

  }

  save(rol: Rol){
    let params = rol;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    // let options = new HttpO
    return this._http.post(`${this.url}/rol/store`,params,{headers:headers});
  }

  update(rol){
    let params = rol;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    // let options = new HttpO
    return this._http.post(`${this.url}/rol/${rol.id}`,params,{headers:headers});
  }
}
