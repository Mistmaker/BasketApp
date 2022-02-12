import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './Global'
import { Amonestacion } from '../models/Amonestacion';

@Injectable({
  providedIn: 'root'
})
export class AmonestacionService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  create(data: Amonestacion): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'amonestacion', params, { headers: headers });
  }

  getall(idencuentro: string): Observable<any> {
    return this._http.get(this.url + 'amonestacion/' + idencuentro);
  }

  delete(idamonestacion: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'amonestacion/' + idamonestacion, { headers: headers });
  }

}
