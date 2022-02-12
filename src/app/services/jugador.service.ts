import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './Global'
import { Jugador } from '../models/Jugador';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  create(data: Jugador): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'jugadores', params, { headers: headers });
  }

  createJugadorEquipo(idequipo: string, idcampeonato: string, correo: string): Observable<any> {
    let params = JSON.stringify({ "idequipo": idequipo, "idcampeonato": idcampeonato, "correo": correo });
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'jugadorequipo', params, { headers: headers });
  }

  quitarJugador(idequipo: string, correo: string, idjugador: string): Observable<any> {
    let params = JSON.stringify({ "idequipo": idequipo, "idjugador": idjugador, "correo": correo });
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'jugadorequipo/quitar', params, { headers: headers });
  }

  getall(idequipo: string): Observable<any> {
    return this._http.get(this.url + 'jugadorequipo/' + idequipo);
  }

  getallImgenesJugadores(idequipo: string): Observable<any> {
    return this._http.get(this.url + 'jugadorequipo/imagenes/' + idequipo);
  }

  verificarCedula(cedula: string, idcampeonato: string): Observable<any> {
    return this._http.get(this.url + 'jugadores/verificar-cedula/' + cedula + '/' + idcampeonato);
  }

  getone(_id: string): Observable<any> {
    return this._http.get(this.url + 'jugadores/id/' + _id);
  }

  getImgJugador(_id: string): Observable<any> {
    return this._http.get(this.url + 'jugadores/imagen/' + _id);
  }

  updateDatos(data: Jugador, anterior: string): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'jugadores/' + anterior, params, { headers: headers });
  }
}
