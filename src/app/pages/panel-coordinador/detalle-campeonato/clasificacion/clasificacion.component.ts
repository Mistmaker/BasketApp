import { Component, OnInit } from '@angular/core';
import { ResultadoService } from 'src/app/services/resultados.service';
import { logoEquipoDefault } from '../../../../../environments/environment';
import { Goleadores } from '../../../../models/interfaces';
import { EquipoService } from '../../../../services/equipo.service';
import { ActivatedRoute } from '@angular/router';
import { CampeonatoService } from '../../../../services/campeonato.service';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.component.html',
  styleUrls: ['./clasificacion.component.scss']
})
export class ClasificacionComponent implements OnInit {

  public idcampeonato: string = '';
  public resultadoClasificacion: any[] = [];
  logoEquipo = logoEquipoDefault;
  goleadores: Goleadores[] = [];
  grupos = false;

  constructor(
    private _resultadoService: ResultadoService,
    private _equipoService: EquipoService,
    private _campeonatoService: CampeonatoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.idcampeonato = localStorage.getItem('idcampeonato') + '';
    // this.getLiga();

    this.route.parent!.params.subscribe(params => {
      console.log('clasificacion', params);
      if (Object.keys(params).length === 0) {
        this.idcampeonato = localStorage.getItem('idcampeonato') + '';
      } else {
        this.idcampeonato = params.id;
      }
      this.getLiga();
    });
  }

  async getLiga() {

    const campeonato = await this._campeonatoService.getOne(this.idcampeonato).toPromise();
    if (campeonato.campeonato.modalidad == 'Grupos') { this.grupos = true }

    this._resultadoService.getoneliga(this.idcampeonato).subscribe(
      response => {
        this.resultadoClasificacion = response.response;
        console.log(this.resultadoClasificacion);
        if (!this.grupos) {
          for (const dato of this.resultadoClasificacion) {
            dato.logoEquipoMostrar = logoEquipoDefault;
            if (dato.logoEquipo != '') {
              //   dato.logoEquipoMostrar = logoEquipoDefault
              // } else {
              this._equipoService.getImage(dato.logoEquipo).subscribe(r => {
                console.log(r)
                if (r.imagen) {
                  dato.logoEquipoMostrar = r.imagen
                }
              })
            }
          }
        } else {
          for (const grupo of this.resultadoClasificacion) {
            for (const equipo of grupo.equipos) {
              equipo.logoEquipoMostrar = logoEquipoDefault;
              if (equipo.logoEquipo != '') {
                this._equipoService.getImage(equipo.logoEquipo).subscribe(r => {
                  console.log(r)
                  if (r.imagen) {
                    equipo.logoEquipoMostrar = r.imagen
                  }
                })
              }
            }
          }
        }

      }, error => {
        console.log(error);
      }
    )

    this._resultadoService.getoneligagoleadores(this.idcampeonato).subscribe(resp => {
      this.goleadores = resp;
      console.log(this.goleadores);
      for (const dato of this.goleadores) {
        dato.logoEquipoMostrar = logoEquipoDefault;
        if (dato.logoEquipo == '') {
          dato.logoEquipoMostrar = logoEquipoDefault
        } else {
          this._equipoService.getImage(dato.logoEquipo).subscribe(r => {
            console.log(r)
            if (r.imagen) {
              dato.logoEquipoMostrar = r.imagen
            }
          })
        }
      }
    })
  }

}
