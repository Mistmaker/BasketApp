import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './Global'
import { Grupos } from '../models/Grupos';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  create(data: Grupos): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'grupos', params, { headers: headers });
  }

  getone(idcampeonato: string): Observable<any> {
    return this._http.get(this.url + 'grupos/' + idcampeonato);
  }

  getoneId(id: string): Observable<any> {
    return this._http.get(this.url + 'grupos/one/' + id);
  }

  update(data: Grupos): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'grupos', params, { headers: headers });
  }

  delete(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'grupos/' + id, { headers: headers });
  }

  //grupo

  createEquipo(idgrupo: string, idequipo: string, equipo: string, idcampeonato: string): Observable<any> {
    let params = JSON.stringify({ "idgrupo": idgrupo, "idequipo": idequipo, "equipo": equipo, "idcampeonato": idcampeonato });
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'grupoequipo', params, { headers: headers });
  }

  deleteEquipo(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'grupoequipo/' + id, { headers: headers });
  }

  //generarEncuentros automaticos

  createAutomatico(idcampeonato: string): Observable<any> {
    let params = JSON.stringify({"idcampeonato": idcampeonato});
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'grupoequipo/automatico/', params, { headers: headers });
  }

  getEncuntros(idcampeonato: string): Observable<any> {
    return this._http.get(this.url + 'grupoequipo/getencuntros/' + idcampeonato);
  }


}
