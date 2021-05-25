import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    const headers = new HttpHeaders().set('Content-Type','aplication/json').set('Authorization', `${this.token}`);
    return this._http.get(`${this.url}/campania${qs}`,{headers:headers});
  }

  getById(id,qs: string = "") {
    const headers = new HttpHeaders().set('Content-Type','aplication/json').set('Authorization', `${this.token}`);
    return this._http.get(`${this.url}/campania/${id}${qs}`,{headers:headers});
  }

  getAllSeguimiento(qs: string = "") {
    const headers = new HttpHeaders().set('Content-Type','aplication/json').set('Authorization', `${this.token}`);
    return this._http.get(`${this.url}/campania/seguimientos${qs}`,{headers:headers});
  }
  getUltimaCampania(qs: string = "") {
    const headers = new HttpHeaders().set('Content-Type','aplication/json').set('Authorization', `${this.token}`);
    return this._http.get(`${this.url}/campania/ultimacampania${qs}`,{headers:headers});
  }

  getReporteSeguimiento(qs: string = "") {
    const headers = new HttpHeaders().set('Content-Type','aplication/json').set('Authorization', `${this.token}`);
    return this._http.get(`${this.url}/campania/reporteseguimiento${qs}`,{headers:headers});
  }
  getTotales(qs: string = ""){
    const headers = new HttpHeaders().set('Content-Type','aplication/json').set('Authorization', `${this.token}`);
    return this._http.get(`${this.url}/campania/totales${qs}`,{headers:headers});
  }

  save(campania){
    let params = campania;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    
    return this._http.post(`${this.url}/campania/store`,params,{headers:headers});
  }

  ejecutar(id){
    let params = null;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    return this._http.post(`${this.url}/campania/ejecutar/${id}`,params,{headers:headers});
  }

  onUpload(image: any):Observable<any> {
    let form = new FormData();
    form.append('image', image);
    let headers=new HttpHeaders().set('Authorization', `${this.token}`);
    return this._http.post(`${this.url}/campania/add-image`,form,{headers: headers});
  }

  getImage(qs: string = "") {
    const headers = new HttpHeaders().set('Content-Type','aplication/json').set('Authorization', `${this.token}`);
    return this._http.get(`${this.url}/campania/get-image${qs}`,{headers:headers});
  }

  getRecomendacion(qs: string = "") {
    const headers = new HttpHeaders().set('Content-Type','aplication/json').set('Authorization', `${this.token}`);
    return this._http.get(`${this.url}/campania/recomendados/${qs}`,{headers:headers});
  }

  archivar(id){
    let params = null;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    
    return this._http.post(`${this.url}/campania/archivar/${id}`,params,{headers:headers});
  }

  activar(id){
    let params = null;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    
    return this._http.post(`${this.url}/campania/activar/${id}`,params,{headers:headers});
  }

  savePruebas(campania){
    let params = campania;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    
    return this._http.post(`${this.url}/campania/sms`,params,{headers:headers});
  }

  update(campania){
    let params = campania;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    
    return this._http.post(`${this.url}/campania/${campania.id}`,params,{headers:headers});
  }

}