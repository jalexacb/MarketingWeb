import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Interes } from 'src/app/theme/shared/models/Interes';

@Injectable({
  providedIn: 'root'
})
export class InteresService {
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
    return this._http.get(`${this.url}/interes${qs}`,{headers:headers});
  }

  getById(id, qs: string = "") {
    const headers = new HttpHeaders().set('Content-Type','aplication/json').set('Authorization', `${this.token}`);
    return this._http.get(`${this.url}/interes/${id}${qs}`,{headers:headers});
  }

  getInteresesPorcentaje(qs: string = "") {
    // let params = null;
    const headers = new HttpHeaders().set('Content-Type','aplication/json').set('Authorization', `${this.token}`);
    // headers.append('Authorization', `${this.token}`)
    // let options = new HttpO
    return this._http.get(`${this.url}/interes/interesesporcentaje${qs}`,{headers:headers});
  }

  delete(id:string){
   
    
    let params = null;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    return this._http.post(`${this.url}/interes/delete/${id}`,params,{headers:headers});
  

  }

  save(interes: Interes){
    let params = interes;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    return this._http.post(`${this.url}/interes/store`,params,{headers:headers});
  }

  update(interes){
    let params = interes;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    return this._http.post(`${this.url}/interes/${interes.id}`,params,{headers:headers});
  }
}



