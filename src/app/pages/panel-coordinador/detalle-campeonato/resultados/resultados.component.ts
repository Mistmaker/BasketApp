import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Actividades } from 'src/app/models/Actividades';
import { Amonestacion } from 'src/app/models/Amonestacion';
import { Anotacion } from 'src/app/models/Anotacion';
import { Jugador } from 'src/app/models/Jugador';
import { ActividadesService } from 'src/app/services/actividades.service';
import { AmonestacionService } from 'src/app/services/amonestacion.service';
import { AnotacionService } from 'src/app/services/anotacion.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { FechasService } from 'src/app/services/fechas.service';
import { Encuentros } from '../../../../models/Encuentros';
import { logoEquipoDefault } from '../../../../../environments/environment';
import { EncuentrosService } from '../../../../services/encuentros.service';
import { ResultadoService } from '../../../../services/resultados.service';
import { Resultado } from '../../../../models/Resultados';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { CampeonatoService } from '../../../../services/campeonato.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {

  public fechas: any[] = [];
  public idcampeonato: string = '';
  public encuentroOne: any = {};
  public resultado1: number = 0;
  public resultado2: number = 0;
  public resultadoOne: any = {};
  public anotacionCreate: Anotacion = new Anotacion('', '', 0, '', '');
  public anotaciones: any[] = [];
  public amonestacion: any[] = [];
  public actividades: any[] = [];
  public equipoSelect: string = '';
  public equipoSelectAmonestacion: string = '';
  public equipoSelectActividad: string = '';
  public jugadores: Jugador[] = [];
  public idequipo: string = '';
  public amonestacionCreate: Amonestacion = new Amonestacion('', '', '', '', '');
  public actividadCreate: Actividades = new Actividades('', '', '', 0, '');
  logoEquipo = logoEquipoDefault;
  encuentroMostrar: Encuentros = new Encuentros('', '', '', true, '', '', '', '', '');
  public resultadosEquipo1: Resultado[] = [];
  public resultadosEquipo2: Resultado[] = [];
  logoEquipo1!: string;
  logoEquipo2!: string;
  mostrarBotones = true;
  modalidadCampeonato = '';

  repEq1 = '';
  repEq2 = '';

  sumapuntosCuartosEq1 = 0;
  sumapuntosCuartosEq2 = 0;
  sumapuntosEq1 = 0;
  sumapuntosEq2 = 0;

  constructor(
    private _fechasService: FechasService,
    private _anotacionService: AnotacionService,
    private _equipoService: EquipoService,
    private toastr: ToastrService,
    private _amonestacionService: AmonestacionService,
    private _actividadService: ActividadesService,
    private _resultadosService: ResultadoService,
    private _encuentroService: EncuentrosService,
    private _campeonatoService: CampeonatoService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.idcampeonato = localStorage.getItem('idcampeonato') + '';
    // this.getFechas();
    // this.logoEquipo1 = logoEquipoDefault;
    // this.logoEquipo2 = logoEquipoDefault;

    this.route.parent!.params.subscribe(params => {
      console.log('resultados', params);
      if (Object.keys(params).length === 0) {
        this.idcampeonato = localStorage.getItem('idcampeonato') + '';
      } else {
        this.idcampeonato = params.id;
        this.mostrarBotones = false;
      }
      this.getFechas();
      this.logoEquipo1 = logoEquipoDefault;
      this.logoEquipo2 = logoEquipoDefault;
      this._campeonatoService.getOne(this.idcampeonato).subscribe(resp => {
        this.modalidadCampeonato = resp.campeonato.modalidad;
      });
    });
  }

  deleteActividad(idactividad: string): void {
    this._actividadService.delete(idactividad).subscribe(
      response => {
        this.getActividades();
        this.toastr.success('', 'Actividad eliminada correctamente!!');
      }, error => {
        console.log(error);
      }
    )
  }

  getActividades(): void {
    this._actividadService.getall(this.encuentroOne._id).subscribe(
      response => {
        this.actividades = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  guardarActividad(): void {
    if (this.actividadCreate.cantidad == 0) {
      this.toastr.warning('', 'Cantidad debe ser mayor a 0');
    } else {
      this.actividadCreate.idcampeonato = this.idcampeonato;
      this.actividadCreate.idencuentro = this.encuentroOne._id;
      this.actividadCreate.idequipo = this.idequipo;
      this._actividadService.create(this.actividadCreate).subscribe(
        response => {
          this.getActividades();
          this.toastr.success('', 'Actividad agregada correctamente!!');
          this.limpiarCamposActividad();
        }, error => {
          console.log(error);
        }
      )
    }
  }

  limpiarCamposActividad(): void {
    var dirtyFormID = 'formActividad';
    var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
    resetForm.reset();
  }

  deleteAmonestacion(idamonestacion: string): void {
    this._amonestacionService.delete(idamonestacion).subscribe(
      response => {
        this.getAmonestaciones();
        this.toastr.success('', 'Amonestación eliminada correctamente!!');
      }, error => {
        console.log(error);
      }
    )
  }

  getAmonestaciones(): void {
    this._amonestacionService.getall(this.encuentroOne._id).subscribe(
      response => {
        this.amonestacion = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  amonestacionGuardar(): void {
    this.amonestacionCreate.idcampeonato = this.idcampeonato;
    this.amonestacionCreate.idencuentro = this.encuentroOne._id;
    this.amonestacionCreate.idequipo = this.idequipo;
    this._amonestacionService.create(this.amonestacionCreate).subscribe(
      response => {
        this.getAmonestaciones();
        this.toastr.success('', 'Amonestacion guardada correctamente!!');
        this.limpiarCamposAmonestacion();
      }, error => {
        console.log(error);
      }
    )
  }

  limpiarCamposAmonestacion(): void {
    var dirtyFormID = 'formAmonestacion';
    var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
    resetForm.reset();
  }

  deleteAnotacion(idanotacion: string): void {
    this._anotacionService.delete(idanotacion).subscribe(
      response => {
        this.getAnotaciones();
        this.toastr.success('', 'Anotación eliminada correctamente!!');
      }, error => {
        console.log(error)
      }
    )
  }

  getEquipos(equipo: string): void {
    this._equipoService.getporJugadores(equipo, this.idcampeonato).subscribe(
      response => {
        this.jugadores = response.jugadores;
        this.idequipo = response.idequipo;
      }, error => {
        console.log(error);
      }
    )
  }

  guardarAnotacion(): void {
    if (this.anotacionCreate.cantidad == 0) {
      this.toastr.warning('', 'La cantidad debe ser mayor a 0');
    } else {
      this.anotacionCreate.idcampeonato = this.idcampeonato;
      this.anotacionCreate.idencuentro = this.encuentroOne._id;
      this.anotacionCreate.idequipo = this.idequipo;
      this._anotacionService.create(this.anotacionCreate).subscribe(
        response => {
          this.toastr.success('', 'Anotación agregada correctamente!!');
          this.getAnotaciones();
          this.limpiarCamposAnotacion();
        }, error => {
          console.log(error);
        }
      )
    }
  }

  limpiarCamposAnotacion(): void {
    var dirtyFormID = 'formAnotacion';
    var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
    resetForm.reset();
  }

  getAnotaciones(): void {
    this._anotacionService.getall(this.encuentroOne._id).subscribe(
      response => {
        this.anotaciones = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  getOneEncuentro(encuentro: any): void {
    this.encuentroOne = encuentro;
    this.getAnotaciones();
    this.getAmonestaciones();
    this.getActividades();
  }

  getFechas(): void {
    this.spinner.show();
    this._fechasService.getall(this.idcampeonato).subscribe(
      response => {
        this.fechas = response.response;
        console.log(this.modalidadCampeonato, this.fechas)
        this.spinner.hide();
        if (this.modalidadCampeonato != 'Grupos') {
          for (const f of this.fechas) {
            for (const encuentro of f.encuentros) {
              this._equipoService.getporNombre(encuentro.equipo1, this.idcampeonato).subscribe(eq1 => {
                encuentro.logoEquipo1 = logoEquipoDefault;
                if (eq1) {
                  if (eq1.logo_equipo == '') {
                    encuentro.logoEquipo1 = logoEquipoDefault
                  } else {
                    this._equipoService.getImage(eq1.logo_equipo).subscribe(r => {
                      if (r.imagen) {
                        encuentro.logoEquipo1 = r.imagen
                      }
                    })
                  }
                }

              });
              this._equipoService.getporNombre(encuentro.equipo2, this.idcampeonato).subscribe(eq2 => {
                encuentro.logoEquipo2 = logoEquipoDefault;
                if (eq2) {
                  if (eq2.logo_equipo == '') {
                    encuentro.logoEquipo2 = logoEquipoDefault
                  } else {
                    this._equipoService.getImage(eq2.logo_equipo).subscribe(r => {
                      if (r.imagen) {
                        encuentro.logoEquipo2 = r.imagen
                      }
                    })
                  }
                }

              });
            }
          }
        }
      }, error => {
        console.log(error);
      }
    )
  }

  tieneEncuentrosAsignados(datos: Encuentros[]): boolean {
    let encuentrosValidos = false
    for (const enc of datos) {
      if (enc.cancha != '') { encuentrosValidos = true; break; }
    }
    return encuentrosValidos;
  }

  verResultadosEncuentro(encuentro: Encuentros) {
    this.logoEquipo1 = logoEquipoDefault;
    this.logoEquipo2 = logoEquipoDefault;
    this.encuentroMostrar = encuentro;
    this._equipoService.getporNombre(encuentro.equipo1, this.idcampeonato).subscribe(
      response => {
        this._equipoService.getImage(response.logo_equipo).subscribe(r => {
          if (r.imagen) { this.logoEquipo1 = r.imagen }
        })
        this._resultadosService.getone(encuentro._id, response._id).subscribe(
          resp => {
            this.resultadosEquipo1 = resp.response;
            this.resultadosEquipo1.map(r => { r.puntos_dobles = r.puntos_dobles * 2; r.puntos_triples = r.puntos_triples * 3 })
            this.sumarPuntos();
          }, error => {
            console.log(error);
          }
        )
      }, error => {
        console.log(error);
      }
    )
    this._equipoService.getporNombre(encuentro.equipo2, this.idcampeonato).subscribe(
      response => {
        this._equipoService.getImage(response.logo_equipo).subscribe(r => {
          if (r.imagen) { this.logoEquipo2 = r.imagen }
        })
        if (response) {
          this._resultadosService.getone(encuentro._id, response._id).subscribe(
            resp => {
              this.resultadosEquipo2 = resp.response;
              this.resultadosEquipo2.map(r => { r.puntos_dobles = r.puntos_dobles * 2; r.puntos_triples = r.puntos_triples * 3 })
              this.sumarPuntos();
            }, error => {
              console.log(error);
            }
          )
        }
      }, error => {
        console.log(error);
      }
    )

    console.log(encuentro)

    this._equipoService.getporNombre(encuentro.equipo1, this.idcampeonato).subscribe(resp => {
      this.repEq1 = resp.nombre_rep;
    });
    this._equipoService.getporNombre(encuentro.equipo2, this.idcampeonato).subscribe(resp => {
      this.repEq2 = resp.nombre_rep;
    });
    // this._encuentroService.getoneEncuentro(encuentro._id).subscribe(resp => {
    //   console.log(resp, encuentro);
    // });
  }

  confirmarResultado(encuentro: Encuentros): void {
    if (encuentro.estadorelleno) { this.toastr.error('', 'Resultado ya confirmado'); return; }
    this._encuentroService.relleno(encuentro._id, true).subscribe(
      response => {
        this.toastr.success('', 'Resultado confirmado correctamente!!');
        encuentro.estadorelleno = true;
      }, error => {
        console.log(error);
      }
    )
  }

  desconfirmarResultado(encuentro: Encuentros) {
    console.log(encuentro);
    Swal.fire({
      title: 'Confirmación', html: `Desea desconfirmar este resultado? <br> Por favor ingrese el código de autorización`, icon: 'warning', showDenyButton: true, confirmButtonText: `Desconfirmar`, denyButtonText: `Cancelar`, denyButtonColor: '#3085d6', confirmButtonColor: '#d33', input: 'password', inputPlaceholder: 'Código de autorización', inputAttributes: { autocapitalize: 'off' },
      preConfirm: (codigo) => {
        if (codigo == '1234567') {
          return true;
        } else {
          Swal.showValidationMessage(`Código no válido`);
          return false;
        }
      }, allowOutsideClick: () => !Swal.isLoading(), backdrop: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._encuentroService.relleno(encuentro._id, false).subscribe(
          response => {
            this.toastr.success('', 'Resultado confirmado correctamente!!');
            encuentro.estadorelleno = false;
            Swal.fire('Exito', 'Encuentro desconfirmado con éxito', 'success');
          }, error => {
            console.log(error);
          }
        )
      }
    });
  }

  sumarPuntos() {
    this.sumapuntosEq1 = this.resultadosEquipo1.reduce((p, v) => {
      if (!v.puntos_dobles || !v.puntos_triples) { return p; }
      const r = p + (v.puntos_dobles + v.puntos_triples);
      return r;
    }, 0);

    this.sumapuntosEq2 = this.resultadosEquipo2.reduce((p, v) => {
      if (!v.puntos_dobles || !v.puntos_triples) { return p; }
      const r = p + (v.puntos_dobles + v.puntos_triples);
      return r;
    }, 0);

    this.sumapuntosCuartosEq1 = this.encuentroMostrar.cuartos_basquet.pc.equipo1 + this.encuentroMostrar.cuartos_basquet.sc.equipo1 + this.encuentroMostrar.cuartos_basquet.tc.equipo1 + this.encuentroMostrar.cuartos_basquet.cc.equipo1;
    this.sumapuntosCuartosEq2 = this.encuentroMostrar.cuartos_basquet.pc.equipo2 + this.encuentroMostrar.cuartos_basquet.sc.equipo2 + this.encuentroMostrar.cuartos_basquet.tc.equipo2 + this.encuentroMostrar.cuartos_basquet.cc.equipo2;

  }

}
