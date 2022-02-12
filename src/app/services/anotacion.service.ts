import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './Global'
import { Anotacion } from '../models/Anotacion';

@Injectable({
  providedIn: 'root'
})
export class AnotacionService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  create(data: Anotacion): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'anotaciones', params, { headers: headers });
  }

  getall(idencuentro: string): Observable<any> {
    return this._http.get(this.url + 'anotaciones/' + idencuentro);
  }

  delete(idanotacion: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'anotaciones/' + idanotacion, { headers: headers });
  }

}
