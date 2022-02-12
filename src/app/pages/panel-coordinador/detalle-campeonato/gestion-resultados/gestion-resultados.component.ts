import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Encuentros } from 'src/app/models/Encuentros';
import { Resultado } from 'src/app/models/Resultados';
import { EncuentrosService } from 'src/app/services/encuentros.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { ResultadoService } from 'src/app/services/resultados.service';

@Component({
  selector: 'app-gestion-resultados',
  templateUrl: './gestion-resultados.component.html',
  styleUrls: ['./gestion-resultados.component.scss']
})
export class GestionResultadosComponent implements OnInit {

  public idencuentro: string = '';
  public encuentroOne: any = {};
  public resultado1: number = 0;
  public resultado2: number = 0;
  public resultadosArray1: Resultado[] = [];
  public resultadosArray2: Resultado[] = [];
  public resultadoCreate: Resultado = new Resultado('', '', '', '', 0, 0, 0, 0, '', false, false);
  public resultadoCreate2: Resultado = new Resultado('', '', '', '', 0, 0, 0, 0, '', false, false);
  public idcampeonato: string = '';
  public jugadoresEquipo1: any[] = [];
  public jugadoresEquipo2: any[] = [];
  public idequipo1: string = '';
  public idequipo2: string = '';
  public msjError: string = '';
  sumapuntosCuartosEq1 = 0;
  sumapuntosCuartosEq2 = 0;
  sumapuntosEq1 = 0;
  sumapuntosEq2 = 0;

  constructor(
    private _encuentroService: EncuentrosService,
    private _route: ActivatedRoute,
    private _resultadosService: ResultadoService,
    private _equipoService: EquipoService,
    private toastr: ToastrService,
  ) {
    this.idcampeonato = localStorage.getItem('idcampeonato') + '';
    this._route.params.subscribe((params: Params) => {
      this.idencuentro = params.idencuentro;
      this.getEncuentro();
    });
  }

  ngOnInit(): void {
  }

  confirmarResultado(): void {
    this._encuentroService.relleno(this.idencuentro, true).subscribe(
      response => {
        this.toastr.success('', 'Resultado confirmado correctamente!!');
        this.getEncuentro();
      }, error => {
        console.log(error);
      }
    )
  }

  agregarResultadosEquipo2(): void {
    this.resultadoCreate2.idcampeonato = this.idcampeonato;
    this.resultadoCreate2.idencuentro = this.idencuentro;
    this.resultadoCreate2.idequipo = this.idequipo2;
    this._resultadosService.create(this.resultadoCreate2).subscribe(
      response => {
        if (response.error) {
          this.msjError = response.error;
        } else {
          var goles = this.resultadoCreate2.goles;
          this.aumentarResultado2(this.idencuentro, goles);
          this.getResultado2(this.idequipo2);
          this.limpiarCampos2();
        }
      }, error => {
        console.log(error);
      }
    )
  }

  agregarResultadosEquipo1(): void {
    this.resultadoCreate.idcampeonato = this.idcampeonato;
    this.resultadoCreate.idencuentro = this.idencuentro;
    this.resultadoCreate.idequipo = this.idequipo1;
    this._resultadosService.create(this.resultadoCreate).subscribe(
      response => {
        if (response.error) {
          this.msjError = response.error;
        } else {
          var goles = this.resultadoCreate.goles;
          this.aumentarResultado1(this.idencuentro, goles);
          this.getResultado1(this.idequipo1);
          this.limpiarCampos1();
          this.msjError = '';
        }
      }, error => {
        console.log(error);
      }
    )
  }

  limpiarCampos1(): void {
    var dirtyFormID = 'formRe1';
    var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
    resetForm.reset();
  }

  limpiarCampos2(): void {
    var dirtyFormID = 'formRe2';
    var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
    resetForm.reset();
  }

  aumentarResultado2(idencuentro: string, resultado2: number): void {
    this._encuentroService.aumentarResultado2(idencuentro, resultado2).subscribe(
      response => {
        this.getEncuentro();
      }, error => {
        console.log(error);
      }
    )
  }

  aumentarResultado1(idencuentro: string, resultado1: number): void {
    this._encuentroService.aumentarResultado1(idencuentro, resultado1).subscribe(
      response => {
        this.getEncuentro();
      }, error => {
        console.log(error);
      }
    )
  }

  getEncuentro(): void {
    this._encuentroService.getoneEncuentro(this.idencuentro).subscribe(
      response => {
        this.encuentroOne = response.response;
        if (!this.encuentroOne.cuartos_basquet) {
          this.encuentroOne.cuartos_basquet = {
            pc: { equipo1: 0, equipo2: 0 },
            sc: { equipo1: 0, equipo2: 0 },
            tc: { equipo1: 0, equipo2: 0 },
            cc: { equipo1: 0, equipo2: 0 },
          }
        }
        console.log(this.encuentroOne)
        this.resultado1 = this.encuentroOne.resultado1;
        this.resultado2 = this.encuentroOne.resultado2;
        this.getJugadoresEquipos1(this.encuentroOne.equipo1);
        this.getJugadoresEquipos2(this.encuentroOne.equipo2);
      }, error => {
        console.log(error);
      }
    )
  }

  getJugadoresEquipos1(equipo: string): void {
    this._equipoService.getporJugadores(equipo, this.idcampeonato).subscribe(
      response => {
        this.jugadoresEquipo1 = response.jugadores;
        this.idequipo1 = response.idequipo;
        this.getResultado1(this.idequipo1);
      }, error => {
        console.log(error);
      }
    )
  }

  getJugadoresEquipos2(equipo: string): void {
    this._equipoService.getporJugadores(equipo, this.idcampeonato).subscribe(
      response => {
        this.jugadoresEquipo2 = response.jugadores;
        this.idequipo2 = response.idequipo;
        this.getResultado2(this.idequipo2);
        console.log(equipo, response)
      }, error => {
        console.log(error);
      }
    )
  }

  getResultado1(idequipo: string): void {
    this._resultadosService.getone(this.idencuentro, idequipo).subscribe(
      response => {
        this.resultadosArray1 = response.response;
        this.sumarPuntos();
      }, error => {
        console.log(error);
      }
    )
  }

  getResultado2(idequipo: string): void {
    this._resultadosService.getone(this.idencuentro, idequipo).subscribe(
      response => {
        this.resultadosArray2 = response.response;
        this.sumarPuntos();
      }, error => {
        console.log(error);
      }
    )
  }

  guardarResultados() {

    this.sumapuntosEq1 = this.resultadosArray1.reduce((p, v) => {
      // if (!v.puntos_dobles || !v.puntos_triples) { return p; }
      const r = p + ((v.puntos_dobles * 2) + (v.puntos_triples * 3));
      return r;
    }, 0);

    this.sumapuntosEq2 = this.resultadosArray2.reduce((p, v) => {
      // if (!v.puntos_dobles || !v.puntos_triples) { return p; }
      const r = p + ((v.puntos_dobles * 2) + (v.puntos_triples * 3));
      return r;
    }, 0);

    this.sumapuntosCuartosEq1 = this.encuentroOne.cuartos_basquet.pc.equipo1 + this.encuentroOne.cuartos_basquet.sc.equipo1 + this.encuentroOne.cuartos_basquet.tc.equipo1 + this.encuentroOne.cuartos_basquet.cc.equipo1;
    this.sumapuntosCuartosEq2 = this.encuentroOne.cuartos_basquet.pc.equipo2 + this.encuentroOne.cuartos_basquet.sc.equipo2 + this.encuentroOne.cuartos_basquet.tc.equipo2 + this.encuentroOne.cuartos_basquet.cc.equipo2;

    if (this.sumapuntosEq1 != this.sumapuntosCuartosEq1) { this.toastr.error('', `${this.encuentroOne.equipo1}: Los puntos de los jugadores contra los parciales de cada cuarto no son iguales`); return; }
    if (this.sumapuntosEq2 != this.sumapuntosCuartosEq2) { this.toastr.error('', `${this.encuentroOne.equipo2}: Los puntos de los jugadores contra los parciales de cada cuarto no son iguales`); return; }

    this._encuentroService.encerarMarcador(this.idencuentro).subscribe(resp => {
      this.resultado1 = 0;
      this.resultado2 = 0;

      this._resultadosService.delete(this.idencuentro).subscribe(resp2 => {
        this.resultadosArray1 = this.resultadosArray1.filter(r => (r.puntos_dobles + r.puntos_triples) > 0);
        for (const res of this.resultadosArray1) {
          res.goles = (res.puntos_dobles * 2) + (res.puntos_triples * 3);
          this._resultadosService.create(res).subscribe(
            response => {
              if (response.error) {
                this.msjError = response.error;
              } else {
                var goles = res.goles;
                // this.aumentarResultado1(this.idencuentro, goles);
                this.getEncuentro();
                this.getResultado1(this.idequipo1);
                this.limpiarCampos1();
                this.msjError = '';
              }
            }, error => {
              console.log(error);
            }
          )
        }
        this.resultadosArray2 = this.resultadosArray2.filter(r => (r.puntos_dobles + r.puntos_triples) > 0);
        for (const res of this.resultadosArray2) {
          res.goles = (res.puntos_dobles * 2) + (res.puntos_triples * 3);
          this._resultadosService.create(res).subscribe(
            response => {
              if (response.error) {
                this.msjError = response.error;
              } else {
                var goles = res.goles;
                // this.aumentarResultado2(this.idencuentro, goles);
                this.getEncuentro();
                this.getResultado2(this.idequipo1);
                this.limpiarCampos2();
                this.msjError = '';
              }
            }, error => {
              console.log(error);
            }
          )
        }

        console.log(this.resultadosArray1);
        console.log(this.resultadosArray2);

        const puntoseq1 = this.resultadosArray1.reduce((p, v) => {
          // if (!v.puntos_dobles || !v.puntos_triples) { return p; }
          const r = p + ((v.puntos_dobles * 2) + (v.puntos_triples * 3));
          return r;
        }, 0);

        console.log(puntoseq1);

        const puntoseq2 = this.resultadosArray2.reduce((p, v) => {
          // if (!v.puntos_dobles || !v.puntos_triples) { return p; }
          const r = p + ((v.puntos_dobles * 2) + (v.puntos_triples * 3));
          return r;
        }, 0);

        console.log(puntoseq2);
        const encuentroUpdate = new Encuentros(this.idencuentro, '', '', false, '', this.idcampeonato, '', '', '');
        encuentroUpdate.resultado1 = puntoseq1;
        encuentroUpdate.resultado2 = puntoseq2;
        encuentroUpdate.cuartos_basquet = this.encuentroOne.cuartos_basquet;
        this._encuentroService.updateGoles(encuentroUpdate).subscribe(resp => {
          console.log(resp);
        });

        this.toastr.success('', 'Resultados guardados con éxito!!');
      });
    });

  }

  sumarPuntos() {
    console.log('sumando puntos')
    this.sumapuntosEq1 = this.resultadosArray1.reduce((p, v) => {
      // if (!v.puntos_dobles || !v.puntos_triples) { return p; }
      const r = p + ((v.puntos_dobles * 2) + (v.puntos_triples * 3));
      return r;
    }, 0);

    this.sumapuntosEq2 = this.resultadosArray2.reduce((p, v) => {
      // if (!v.puntos_dobles || !v.puntos_triples) { return p; }
      const r = p + ((v.puntos_dobles * 2) + (v.puntos_triples * 3));
      return r;
    }, 0);

    this.sumapuntosCuartosEq1 = this.encuentroOne.cuartos_basquet.pc.equipo1 + this.encuentroOne.cuartos_basquet.sc.equipo1 + this.encuentroOne.cuartos_basquet.tc.equipo1 + this.encuentroOne.cuartos_basquet.cc.equipo1;
    this.sumapuntosCuartosEq2 = this.encuentroOne.cuartos_basquet.pc.equipo2 + this.encuentroOne.cuartos_basquet.sc.equipo2 + this.encuentroOne.cuartos_basquet.tc.equipo2 + this.encuentroOne.cuartos_basquet.cc.equipo2;

  }

  agregarNuevoDato(resultados: Resultado[], idequipo: string) {
    const nuevoResult = new Resultado('', '', '', '', 0, 0, 0, 0, '', false, false);
    nuevoResult.idcampeonato = this.idcampeonato;
    nuevoResult.idencuentro = this.idencuentro;
    nuevoResult.idequipo = idequipo;
    resultados.push(nuevoResult);
  }

  quitarDato(resultados: Resultado[], index: number) {
    resultados.splice(index, 1);
  }

}
