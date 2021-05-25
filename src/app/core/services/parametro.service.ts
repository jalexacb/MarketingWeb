import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Permiso } from 'src/app/theme/shared/models/Permiso';
import { param } from 'jquery';
import { Parametro } from 'src/app/theme/shared/models/Parametro';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {
  private url: string;
  public token: string;
  constructor(
    public _http: HttpClient
  ) { 
    this.url = environment.url;
    this.token = localStorage.getItem('token');
  }

  getAll(qs: string = "") {
    const headers = new HttpHeaders().set('Content-Type','aplication/json').set('Authorization', `${this.token}`);
    return this._http.get(`${this.url}/parametro${qs}`,{headers:headers});
  }

  getParametrosSeguridad(qs:string = ""){
    const headers = new HttpHeaders().set('Content-Type','aplication/json').set('Authorization', `${this.token}`);
    return this._http.get(`${this.url}/parametro/seguridad${qs}`,{headers:headers});
  }

  delete(id:string, qs: string = ""){
    let params = null;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    return this._http.post(`${this.url}/parametro/delete/${id}${qs}`,params,{headers:headers});
  }

  save(parametro: Parametro){
    let params = parametro;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    return this._http.post(`${this.url}/parametro/store`,params,{headers:headers});
  }

  updateSeguridad(parametros){
    let params = parametros;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    return this._http.post(`${this.url}/parametro/seguridad`,params,{headers:headers});
  }

  update(parametros){
    let params = parametros;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    return this._http.post(`${this.url}/parametro/`,params,{headers:headers});
  }
}

