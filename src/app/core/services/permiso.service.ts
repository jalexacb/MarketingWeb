import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Permiso } from 'src/app/theme/shared/models/Permiso';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {
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
    return this._http.get(`${this.url}/permiso${qs}`,{headers:headers});
  }

  getPermisoByFilter(qs: string = "") {
    // let params = null;
    const headers = new HttpHeaders().set('Content-Type','aplication/json').set('Authorization', `${this.token}`);
    // headers.append('Authorization', `${this.token}`)
    // let options = new HttpO
    return this._http.get(`${this.url}/permiso/filter${qs}`,{headers:headers});
  }

  save(permisos: Array<Permiso>){
    let params = permisos;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    // let options = new HttpO
    return this._http.post(`${this.url}/permiso/store`,params,{headers:headers});
  }
}

