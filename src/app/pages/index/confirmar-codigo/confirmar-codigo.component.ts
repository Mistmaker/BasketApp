import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-confirmar-codigo',
  templateUrl: './confirmar-codigo.component.html',
  styleUrls: ['./confirmar-codigo.component.scss']
})
export class ConfirmarCodigoComponent implements OnInit {

  public codigo: string = '';
  public codigoEstado: boolean = true;
  public codigoRecibido: string = '';
  public UserCreate: Usuario = new Usuario(null, '', '', '', 'ADMIN_ROLE', '', true, false);

  constructor(
    private _userService: UsuarioService,
    private _router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.UserCreate = new Usuario(null, localStorage.getItem('nombre_c') + '', localStorage.getItem('correo_c') + '', localStorage.getItem('clave_c') + '', 'ADMIN_ROLE', '', true, false);
    localStorage.removeItem('nombre_c');
    localStorage.removeItem('correo_c');
    localStorage.removeItem('clave_c');
  }

  ngOnInit(): void {
    this.verificarEmailUser();
  }

  verificarEmailUser(): void {
    this._userService.verificarEmail(this.UserCreate.correo).subscribe(
      response => {
        if (response.response == 'enviado') {
          this.codigoRecibido = response.codigo;
        }
      }, error => {
        console.log(error);
      }
    )
  }

  saveUser(): void {
    if (this.codigo == this.codigoRecibido) {
      this.codigoEstado = true;
      this.spinner.show();
      this._userService.create(this.UserCreate).subscribe(
        response => {
          this.spinner.hide();
          if (response.usuario) {
            localStorage.setItem('_id', response.usuario._id);
            localStorage.setItem('nombre', response.usuario.nombre);
            localStorage.setItem('correo', response.usuario.correo);
            this._router.navigate(['/panel']);
          }
        }, error => {
          this.spinner.hide();
          console.log(error);
        }
      )
    } else {
      this.codigoEstado = false;
    }
  }

}
