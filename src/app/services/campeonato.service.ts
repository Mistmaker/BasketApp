import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './Global'
import { Campeonato, CampeonatoPerfil } from '../models/Campeonato';

@Injectable({
  providedIn: 'root'
})
export class CampeonatoService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  create(data: Campeonato): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'campeonatos', params, { headers: headers });
  }

  getall(id_organizador: string): Observable<any> {
    return this._http.get(this.url + 'campeonatos/' + id_organizador);
  }

  getOne(_id: string): Observable<any> {
    return this._http.get(this.url + 'campeonatos/one/' + _id);
  }

  updateDatos(data: Campeonato | any): Observable<Campeonato> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put<Campeonato>(this.url + 'campeonatos', params, { headers: headers });
  }

  updateLogo(data: CampeonatoPerfil): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'campeonatos/logo', params, { headers: headers });
  }

  delete(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'campeonatos/' + id, { headers: headers });
  }
}
