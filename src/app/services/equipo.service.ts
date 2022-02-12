import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './Global'
import { Campeonato, CampeonatoPerfil } from '../models/Campeonato';
import { Equipo } from '../models/Equipo';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  create(data: Equipo): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'equipos', params, { headers: headers });
  }

  getall(idcampeonato: string): Observable<any> {
    return this._http.get(this.url + 'equipos/' + idcampeonato);
  }

  getallImage(idcampeonato: string): Observable<any> {
    return this._http.get(this.url + 'equipos/imagenes/' + idcampeonato);
  }
  
  getImage(logoEquipo: string): Observable<any> {
    return this._http.get(this.url + 'equipos/imagen/' + logoEquipo);
  }

  getone(_id: string): Observable<any> {
    return this._http.get(this.url + 'equipos/one/' + _id);
  }

  getporJugadores(equipo: string, idcampeonato: string): Observable<any> {
    return this._http.get(this.url + 'equipos/jugadores/' + equipo + '/' +idcampeonato);
  }

  getporNombre(equipo: string, idcampeonato: string): Observable<any> {
    return this._http.get(this.url + 'equipos/nombre/' + equipo + '/' +idcampeonato);
  }

  updateDatos(data: Equipo, anterior: string): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'equipos/' + anterior, params, { headers: headers });
  }

  delete(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'equipos/' + id, { headers: headers });
  }
}
