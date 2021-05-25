import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contacto } from 'src/app/theme/shared/models/Contacto';
@Injectable({
  providedIn: 'root'
})
export class RegistroService {
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
    return this._http.get(`${this.url}/registro${qs}`,{headers:headers});
  }

}


