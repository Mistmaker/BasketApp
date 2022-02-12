import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuarios.service';

@Component({
  selector: 'app-panel-coordinador',
  templateUrl: './panel-coordinador.component.html',
  styleUrls: ['./panel-coordinador.component.scss']
})
export class PanelCoordinadorComponent implements OnInit {

  constructor(private _usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  cerrarSesion() {
    this._usuarioService.logOut();
  }

}
