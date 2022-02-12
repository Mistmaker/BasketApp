import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './Global'
import { Usuario } from '../models/Usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url: string;

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {
    this.url = Global.url;
  }

  create(data: Usuario): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'usuarios', params, { headers: headers });
  }

  verificarEmail(email: string): Observable<any> {
    let params = JSON.stringify({ "email": email });
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'usuarios/verificaremail', params, { headers: headers });
  }

  verificarEmailExistente(correo: string): Observable<any> {
    let params = JSON.stringify({ "correo": correo });
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'usuarios/emailexistente', params, { headers: headers });
  }

  login(correo: string, password: string): Observable<any> {
    let params = JSON.stringify({ "correo": correo, "password": password });
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'usuarios/login', params, { headers: headers });
  }

  restablecer(email: string): Observable<any> {
    let params = JSON.stringify({ "email": email });
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'usuarios/restablecerpass', params, { headers: headers });
  }

  logOut() {
    localStorage.removeItem('_id');
    localStorage.removeItem('nombre');
    localStorage.removeItem('correo');
    localStorage.removeItem('idequipo');
    localStorage.removeItem('nombre_equipo');
    localStorage.removeItem('idcampeonato');
    this._router.navigate(['/']);
  }

  sesionIniciada() {
    if (localStorage.getItem('_id')) {
      return true;
    } else {
      return false;
    }
  }

}
