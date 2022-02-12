import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './Global'
import { Resultado } from '../models/Resultados';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  create(data: Resultado): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'resultados', params, { headers: headers });
  }

  getone(idencuentro: string, idequipo: string): Observable<any> {
    return this._http.get(this.url + 'resultados/one/' + idencuentro + '/' + idequipo);
  }

  getoneliga(idcampeonato: string): Observable<any> {
    return this._http.get(this.url + 'resultados/liga/' + idcampeonato);
  }
  
  getoneligagoleadores(idcampeonato: string): Observable<any> {
    return this._http.get(this.url + 'resultados/goleadores/liga/' + idcampeonato);
  }

  delete(idencuentro: string){
    return this._http.delete(this.url + `resultados/${idencuentro}`);
  }

}
