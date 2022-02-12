import { Component, OnInit } from '@angular/core';
import { Campeonato } from '../../models/Campeonato';
import { ActivatedRoute } from '@angular/router';
import { CampeonatoService } from '../../services/campeonato.service';

@Component({
  selector: 'app-campeonato',
  templateUrl: './campeonato.component.html',
  styleUrls: ['./campeonato.component.scss']
})
export class CampeonatoComponent implements OnInit {

  campeonato: Campeonato = new Campeonato('', '', '', '', '', '', '', '', '', null, '');
  imagePerfil: string = '';
  idCampeonato = '';
  mostrarLogo = true;

  constructor(private route: ActivatedRoute, private campeonatoService: CampeonatoService) { }

  ngOnInit(): void {
    this.idCampeonato = this.route.snapshot.paramMap.get('id')!;
    console.log(this.idCampeonato)
    this.campeonatoService.getOne(this.idCampeonato).subscribe(resp => {
      this.campeonato = resp.campeonato;
      if (resp.imagen != null) {
        this.imagePerfil = resp.imagen.imagen
      }
    })
    console.log(window.innerWidth);
    if (window.innerWidth <= 991) {
      this.mostrarLogo = false;
    }
  }

}
