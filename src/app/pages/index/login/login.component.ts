import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public passEstado: boolean = false;
  public userLogin: Usuario = new Usuario(null, '', '', '', '', '', true, false);
  public credencialesIncorrectas: boolean = false;

  constructor(
    private _userService: UsuarioService,
    private _router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    if (this._userService.sesionIniciada()) {
      this._router.navigate(['/panel/organizar-campeonatos']);
      return;
    }
  }

  iniciarSesion(): void {
    this.spinner.show();
    this._userService.login(this.userLogin.correo, this.userLogin.password).subscribe(
      response => {
        this.spinner.hide();
        if (response.response == 'correcto') {
          this.credencialesIncorrectas = false;
          localStorage.setItem('_id', response.user._id);
          localStorage.setItem('nombre', response.user.nombre);
          localStorage.setItem('correo', response.user.correo);
          this._router.navigate(['/panel/organizar-campeonatos']);
        } else {
          this.credencialesIncorrectas = true;
        }
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

  isActiveToggleTextPassword: Boolean = true;
  toggleTextPassword(): void {
    if (this.passEstado == false) {
      this.passEstado = true;
    } else if (this.passEstado == true) {
      this.passEstado = false;
    }
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
  }

  getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }

}
