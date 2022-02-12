import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CampeonatoService } from 'src/app/services/campeonato.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-partidos-fechas',
  templateUrl: './partidos-fechas.component.html',
  styleUrls: ['./partidos-fechas.component.scss']
})
export class PartidosFechasComponent implements OnInit {

  public filtro: string = '';
  public idcampeonato: string = '';
  public modalidad: string = '';

  constructor(
    private _campeonatoService: CampeonatoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.idcampeonato = localStorage.getItem('idcampeonato') + '';
    // this.getCampeonato();
    this.route.parent!.params.subscribe(params => {
      console.log('fechas maestro',params);
      if (Object.keys(params).length === 0) {
        this.idcampeonato = localStorage.getItem('idcampeonato') + '';
      } else {
        this.idcampeonato = params.id;
      }
      console.log(this.idcampeonato)
      this.getCampeonato();
    });
  }

  getCampeonato(): void {
    this._campeonatoService.getOne(this.idcampeonato).subscribe(
      response => {
        this.modalidad = response.campeonato.modalidad;
      }, error => {
        console.log(error);
      }
    )
  }

}
