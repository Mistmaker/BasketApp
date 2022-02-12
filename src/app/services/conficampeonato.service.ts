import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './Global'
import { Fechas } from '../models/Fechas';
import { ConfiCampeonato } from '../models/ConfiCampeonato';

@Injectable({
  providedIn: 'root'
})
export class ConfiCampeonatoService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  create(data: ConfiCampeonato): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'conficampeonato', params, { headers: headers });
  }

  getone(idcampeonato: string): Observable<any> {
    return this._http.get(this.url + 'conficampeonato/one/' + idcampeonato);
  }

  update(data: ConfiCampeonato): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'conficampeonato', params, { headers: headers });
  }

}
