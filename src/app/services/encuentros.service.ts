import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './Global'
import { Encuentros } from '../models/Encuentros';
import { EncuentrosDoble } from '../models/Encuentrosdoble';

@Injectable({
  providedIn: 'root'
})
export class EncuentrosService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  // eliminatoria directa
  create(data: Encuentros): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'encuentros', params, { headers: headers });
  }

  createAutomatico(data: Encuentros): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'encuentros/automatico', params, { headers: headers });
  }

  getone(idfecha: string): Observable<any> {
    return this._http.get(this.url + 'encuentros/' + idfecha);
  }

  getoneEncuentro(id: string): Observable<any> {
    return this._http.get(this.url + 'encuentros/one/' + id);
  }

  getverificar(idcampeonato: string): Observable<any> {
    return this._http.get(this.url + 'encuentros/verificar/' + idcampeonato);
  }

  delete(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'encuentros/' + id, { headers: headers });
  }

  update(data: Encuentros): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'encuentros', params, { headers: headers });
  }
  
  updateGoles(data: Encuentros): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'encuentros/goles', params, { headers: headers });
  }

  aumentarResultado1(idencuentro: string, resultado1: number): Observable<any> {
    let params = JSON.stringify({ "idencuentro": idencuentro, "resultado1": resultado1 });
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'encuentros/aumentoresultado1/', params, { headers: headers });
  }

  aumentarResultado2(idencuentro: string, resultado2: number): Observable<any> {
    let params = JSON.stringify({ "idencuentro": idencuentro, "resultado2": resultado2 });
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'encuentros/aumentoresultado2/', params, { headers: headers });
  }

  relleno(idencuentro: string, estado: boolean): Observable<any> {
    let params = JSON.stringify({ "idencuentro": idencuentro, "estado": estado });
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'encuentros/relleno/', params, { headers: headers });
  }

  // eliminatoria de ida y vuelta
  createDoble(data: EncuentrosDoble): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'encuentrosdoble', params, { headers: headers });
  }

  getoneEncuentroDoble(id: string): Observable<any> {
    return this._http.get(this.url + 'encuentrosdoble/one/' + id);
  }

  updateEncuentroDoble(data: EncuentrosDoble): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'encuentrosdoble', params, { headers: headers });
  }

  deleteEncuentroDoble(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'encuentrosdoble/' + id, { headers: headers });
  }

  createAutomaticoDoble(data: EncuentrosDoble): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'encuentrosdoble/automatico', params, { headers: headers });
  }

  encerarMarcador(idencuentro: string): Observable<any> {
    return this._http.put(this.url + `encuentros/encerar/${idencuentro}`, {});
  }

}
