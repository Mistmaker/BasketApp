import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss']
})
export class RegistrarseComponent implements OnInit {

  public passEstado: boolean = false;
  public UserCreate: Usuario = new Usuario(null, '', '', '', 'ADMIN_ROLE', '', true, false);
  public emailExiste: boolean = false;

  constructor(
    private _userService: UsuarioService,
    private _router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  verificarEmailExistente(): void {
    this.spinner.show();
    this._userService.verificarEmailExistente(this.UserCreate.correo).subscribe(
      response => {
        this.spinner.hide();
        if (response.response == 'existe') {
          this.emailExiste = true;
        } else if (response.response == 'noexiste') {
          this.emailExiste = false;
          localStorage.setItem('nombre_c', this.UserCreate.nombre);
          localStorage.setItem('correo_c', this.UserCreate.correo);
          localStorage.setItem('clave_c', this.UserCreate.password);
          this._router.navigate(['/confirmar-codigo']);
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
