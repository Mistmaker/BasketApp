import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './Global'
import { Actividades } from '../models/Actividades';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  create(data: Actividades): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'actividades', params, { headers: headers });
  }

  getall(idencuentro: string): Observable<any> {
    return this._http.get(this.url + 'actividades/' + idencuentro);
  }

  delete(idactividad: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'actividades/' + idactividad, { headers: headers });
  }

}
