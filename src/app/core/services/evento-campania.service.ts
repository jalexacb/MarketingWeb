import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EventoCampaniaService {
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
    return this._http.get(`${this.url}/eventoCampania${qs}`,{headers:headers});
  }

  save(eventoCampania){
    let params = eventoCampania;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    // let options = new HttpO
    return this._http.post(`${this.url}/eventoCampania/store`,params,{headers:headers});
  }

  // ejecutar(id){
  //   let params = eventoCampania;
  //   const headers = new HttpHeaders().set('Content-Type','aplication/json')
  //                                    .set('Authorization', `${this.token}`);
  //   // let options = new HttpO
  //   return this._http.post(`${this.url}/eventoCampania/ejecutar/${id}`,params,{headers:headers});
  // }

  ejecutar(id){
    let params = null;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    // let options = new HttpO
    return this._http.post(`${this.url}/eventoCampania/ejecutar/${id}`,params,{headers:headers});
  }

  savePruebas(eventoCampania){
    let params = eventoCampania;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    // let options = new HttpO
    return this._http.post(`${this.url}/eventoCampania/sms`,params,{headers:headers});
  }

  update(eventoCampania){
    let params = eventoCampania;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    // let options = new HttpO
    return this._http.post(`${this.url}/eventoCampania/${eventoCampania.id}`,params,{headers:headers});
  }

}
