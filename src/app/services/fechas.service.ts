import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './Global'
import { Fechas } from '../models/Fechas';
import { FechaElimDoble } from '../models/FechaElimDoble';

@Injectable({
  providedIn: 'root'
})
export class FechasService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  // eliminatoria directa o solo de ida
  create(data: Fechas): Observable<Fechas> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<Fechas>(this.url + 'fechas', params, { headers: headers });
  }

  getall(idcampeonato: string): Observable<any> {
    return this._http.get(this.url + 'fechas/' + idcampeonato);
  }

  getautomatico(idcampeonato: string): Observable<any> {
    return this._http.get(this.url + 'fechas/automatico/' + idcampeonato);
  }

  getone(id: string): Observable<any> {
    return this._http.get(this.url + 'fechas/one/' + id);
  }

  delete(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'fechas/' + id, { headers: headers });
  }

  update(data: Fechas): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'fechas', params, { headers: headers });
  }

  // Eliminatorias de ida y vuelta

  createElimDoble(data: FechaElimDoble): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'fechaeliminatoriadoble', params, { headers: headers });
  }

  getallEliminDoble(idcampeonato: string): Observable<any> {
    return this._http.get(this.url + 'fechaeliminatoriadoble/' + idcampeonato);
  }

  getoneElimDoble(id: string): Observable<any> {
    return this._http.get(this.url + 'fechaeliminatoriadoble/one/' + id);
  }

  updateElimDoble(data: FechaElimDoble): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'fechaeliminatoriadoble', params, { headers: headers });
  }

  deleteElimDoble(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'fechaeliminatoriadoble/' + id, { headers: headers });
  }
}
