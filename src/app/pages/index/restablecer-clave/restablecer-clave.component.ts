import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-restablecer-clave',
  templateUrl: './restablecer-clave.component.html',
  styleUrls: ['./restablecer-clave.component.scss']
})
export class RestablecerClaveComponent implements OnInit {

  public correo: string = '';
  public emailExiste: boolean = true;

  constructor(
    private _userService: UsuarioService,
    private spinner: NgxSpinnerService,
    private _router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  verificarEmailExistente(): void {
    this.spinner.show();
    this._userService.verificarEmailExistente(this.correo).subscribe(
      response => {
        this.spinner.hide();
        if (response.response == 'existe') {
          this.emailExiste = true;
          this.restablecerClave();
        } else if (response.response == 'noexiste') {
          this.emailExiste = false;
        }
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

  restablecerClave(): void {
    this.spinner.show();
    this._userService.restablecer(this.correo).subscribe(
      response => {
        this.spinner.hide();
        if (response.response == 'enviado' && response.usuario) {
          this.toastr.success('', 'Se ha enviado una nueva contraseña a tu correo electronico!!');
          setTimeout(() => {
            this._router.navigate(['/login']);
          }, 1000);
        }
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

}
