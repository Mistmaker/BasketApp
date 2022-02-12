import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './Global'
import { Cancha } from '../models/Cancha';

@Injectable({
  providedIn: 'root'
})
export class CanchaService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  create(data: Cancha): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'cancha', params, { headers: headers });
  }

  getone(idcampeonato: string): Observable<any> {
    return this._http.get(this.url + 'cancha/' + idcampeonato);
  }

  getoneId(id: string): Observable<any> {
    return this._http.get(this.url + 'cancha/one/' + id);
  }

  update(data: Cancha): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'cancha', params, { headers: headers });
  }

  delete(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'cancha/' + id, { headers: headers });
  }

}
