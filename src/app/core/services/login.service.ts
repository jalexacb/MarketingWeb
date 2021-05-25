
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../theme/shared/models/Usuario';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url: string;
  public identity: string;
  public token: string;
  constructor(
    public _http: HttpClient
  ) { 
    this.url = environment.url;
  }

  register(usuario: Usuario): Observable<any>{
    
    let params = usuario;
    const headers = new HttpHeaders().set('Content-Type','aplication/json');
    // headers.append('Authorization', `Bearer ${this.token}`)
    // let options = new HttpO
    return this._http.post(`${this.url}/register`,params,{headers:headers});
  }

  login(usuario, getToken = null): Observable<any> {
    if( getToken !=null ){
      usuario.getToken = true;
    }
    console.log(getToken);
    let params = usuario;
    const headers = new HttpHeaders().set('Content-Type','aplication/json');
    return this._http.post(`${this.url}/login`, params, {headers});
  }

  

  desbloqueoUsuario(id){
    let params = null;
    const headers = new HttpHeaders().set('Content-Type','aplication/json')
                                    //  .set('Authorization', `${this.token}`);
    // let options = new HttpO
    return this._http.post(`${this.url}/usuario/desbloqueoUsuario/${id}`,params,{headers:headers});
  }

  getUsuarioIdentificado(){
    let identity = JSON.parse(localStorage.getItem('identity'));

    if( identity && identity !='undefined' ) {
      this.identity = identity;
    }else {
      this.identity = null;
    }

    return this.identity;
  }

  getToken(){
    let token = localStorage.getItem('token');

    if( token != 'undefined' ) {
      this.token = token;
    }else {
      this.token = null;
    }

    return this.token;
  }

  // isLogged(){
  //   let token = localStorage.getItem('token');
  //   let isLogged = false;
  //   if( token != 'undefined' ) {
  //     isLogged = true;
  //   }else {
  //     isLogged = false;
  //   }

  //   return isLogged;
  // }
}
