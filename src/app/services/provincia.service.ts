import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './Global'
import { Provincia } from '../models/Provincia';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  create(data: Provincia): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'provincias', params, { headers: headers });
  }

  getall(): Observable<any> {
    return this._http.get(this.url + 'provincias');
  }

}
