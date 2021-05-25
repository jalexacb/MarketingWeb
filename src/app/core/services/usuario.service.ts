import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../theme/shared/models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url: string;
  public token: string;
  constructor(
    public _http: HttpClient
  ) { 
    this.url = environment.url;
    this.token = localStorage.getItem('token');
  }

  getAll(qs:String = "") {
    // let params = null;
    const headers = new HttpHeaders().set('Content-Type','aplication/json').set('Authorization', `${this.token}`);
    // headers.append('Authorization', `${this.token}`)
    // let options = new HttpO
    return this._http.get(`${this.url}/usuario${qs}`,{headers:headers});
  }

  getById(id, qs: string = "") {
    // let params = null;
    const headers = new HttpHeaders().set('Content-Type','aplication/json').set('Authorization', `${this.token}`);
    // headers.append('Authorization', `${this.token}`)
    // let options = new HttpO
    return this._http.get(`${this.url}/usuario/${id}${qs}`,{headers:headers});
  }

  comprobarUsuarioExistente(usuario:string, qs: string = "") {
    // let params = null;
    const headers = new HttpHeaders().set('Content-Type','aplication/json').set('Authorization', `${this.token}`);
    // headers.append('Authorization', `${this.token}`)
    // let options = new HttpO
    return this._http.get(`${this.url}/usuario/comprobar/${usuario}${qs}`,{headers:headers});
  }
  save(usuario: Usuario){
    let params = usuario;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    // let options = new HttpO
    return this._http.post(`${this.url}/usuario/register`,params,{headers:headers});
  }

  delete(id:string){
   
    
    let params = null;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    // let options = new HttpO
    return this._http.post(`${this.url}/usuario/delete/${id}`,params,{headers:headers});
  

  }

  update(usuario){
    let params = usuario;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                     .set('Authorization', `${this.token}`);
    // let options = new HttpO
    return this._http.post(`${this.url}/usuario/${usuario.id}`,params,{headers:headers});
  }

  onUpload(image: any):Observable<any> {
    let form = new FormData();
    form.append('image', image);
    let headers=new HttpHeaders().set('Authorization', `${this.token}`);
    return this._http.post(`${this.url}/usuario/add-image`,form,{headers: headers});
  }

  getImage(qs: string = "") {
    // let params = null;
    const headers = new HttpHeaders().set('Content-Type','aplication/json').set('Authorization', `${this.token}`);
    // headers.append('Authorization', `${this.token}`)
    // let options = new HttpO
    return this._http.get(`${this.url}/usuario/get-image${qs}`,{headers:headers});
  }
}
