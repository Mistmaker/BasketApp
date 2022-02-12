import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuarios.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _usuarioService: UsuarioService, private router: Router, private toastr: ToastrService) { }

  canActivate(): boolean {
    if (!this._usuarioService.sesionIniciada()) { this.router.navigateByUrl('login'); this.toastr.error('', 'Sesion no válida, por favor vuelva a ingresar'); return false; }
    return true;
  }

}
