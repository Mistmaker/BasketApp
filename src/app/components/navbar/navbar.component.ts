import { Component, OnInit } from '@angular/core';
import { CampeonatoService } from '../../services/campeonato.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  busqueda = '';

  constructor(private _camopeonatoService: CampeonatoService) { }

  ngOnInit(): void {
  }

  buscarCampeoantos() {
    console.log(this.busqueda)
    
  }

}
