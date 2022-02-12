import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './Global'
import { Ciudad } from '../models/Ciudad';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  create(data: Ciudad): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'ciudades', params, { headers: headers });
  }

  getall(codigo_prov: string): Observable<any> {
    return this._http.get(this.url + 'ciudades/' + codigo_prov);
  }
  
}
