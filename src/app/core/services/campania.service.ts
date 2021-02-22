import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CampaniaService {
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
    return this._http.get(`${this.url}/campania${qs}`,{headers:headers});
  }

  save(campania){
    let params = campania;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    // let options = new HttpO
    return this._http.post(`${this.url}/campania/store`,params,{headers:headers});
  }

  // ejecutar(id){
  //   let params = campania;
  //   const headers = new HttpHeaders().set('Content-Type','aplication/json')
  //                                    .set('Authorization', `${this.token}`);
  //   // let options = new HttpO
  //   return this._http.post(`${this.url}/campania/ejecutar/${id}`,params,{headers:headers});
  // }

  ejecutar(id){
    let params = null;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    // let options = new HttpO
    return this._http.post(`${this.url}/campania/ejecutar/${id}`,params,{headers:headers});
  }

  savePruebas(campania){
    let params = campania;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    // let options = new HttpO
    return this._http.post(`${this.url}/campania/sms`,params,{headers:headers});
  }

  update(campania){
    let params = campania;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    // let options = new HttpO
    return this._http.post(`${this.url}/campania/${campania.id}`,params,{headers:headers});
  }

}