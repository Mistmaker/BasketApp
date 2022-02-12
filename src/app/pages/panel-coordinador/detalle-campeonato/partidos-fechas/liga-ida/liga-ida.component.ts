import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Cancha } from 'src/app/models/Cancha';
import { Encuentros } from 'src/app/models/Encuentros';
import { Equipo } from 'src/app/models/Equipo';
import { Fechas } from 'src/app/models/Fechas';
import { CanchaService } from 'src/app/services/cancha.service';
import { EncuentrosService } from 'src/app/services/encuentros.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { FechasService } from 'src/app/services/fechas.service';
import { FechasPredefinidas } from '../../../../../services/Global';
import { CampeonatoService } from '../../../../../services/campeonato.service';
import { Campeonato } from '../../../../../models/Campeonato';
import { logoEquipoDefault } from '../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-liga-ida',
  templateUrl: './liga-ida.component.html',
  styleUrls: ['./liga-ida.component.scss']
})
export class LigaIdaComponent implements OnInit {
  @Input() modalidad: string = '';
  public fechas: any[] = [];
  public idcampeonato: string = '';
  public equipos: Equipo[] = [];
  public equiposShow: Equipo[] = [];
  public cantidadEquipos: number = 0;
  public listaAleatoria: number[] = [];
  public encuentroCreate: Encuentros = new Encuentros('', '', '', true, '', '', '', '', '',);
  public canchas: Cancha[] = [];
  public fechasCreate: Fechas = new Fechas('', '', '', true);
  public fechasUpdate: Fechas = new Fechas('', '', '', true);
  public idfecha: string = '';
  public encuentroOne: Encuentros = new Encuentros('', '', '', true, '', '', '', '', '');
  public arrayUltimos: any[] = [];
  public equiposJugar: Equipo[] = [];
  mostrarBotonesManuales = true;
  mostrarBotonEditar = true;
  logoEquipo = logoEquipoDefault;

  constructor(
    private _equipoService: EquipoService,
    private _encuentroService: EncuentrosService,
    private _canchaService: CanchaService,
    private _fechasService: FechasService,
    private _campeonatoService: CampeonatoService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // this.spinner.show();
    // this.idcampeonato = localStorage.getItem('idcampeonato') + '';
    // this._campeonatoService.getOne(this.idcampeonato).subscribe(resp => {
    //   this.mostrarBotonesManuales = resp.campeonato.tipo_fechas == 'A' ? false : true;
    // });
    // this.getFechas();
    // this.getEquipos();
    // this.getCanchas();

    this.route.parent!.params.subscribe(params => {
      this.spinner.show();
      console.log('liga ida', params);
      if (Object.keys(params).length === 0) {
        this.idcampeonato = localStorage.getItem('idcampeonato') + '';
        this._campeonatoService.getOne(this.idcampeonato).subscribe(resp => {
          this.mostrarBotonesManuales = resp.campeonato.tipo_fechas == 'A' ? false : true;
        });
      } else {
        this.idcampeonato = params.id;
        this._campeonatoService.getOne(this.idcampeonato).subscribe(resp => {
          this.mostrarBotonesManuales = resp.campeonato.tipo_fechas == 'A' ? false : true;
          this.mostrarBotonEditar = false;
        });
      }
      this.getFechas();
      this.getEquipos();
      this.getCanchas();
      // console.log(this.idcampeonato)
    });

  }


  numerosAleatorio(max: number, min: number, usados: any[]): number[] {
    var lista: number[];
    lista = [];
    var cont = 0;
    do {
      var numero = Math.floor(Math.random() * (max - min)) + min;
      var encontrado = false;
      if (lista.length > 0) {
        for (let i = 0; i < lista.length; i++) {
          if (lista[i] == numero) {
            encontrado = true;
          }
        }
      } else {
        encontrado = false;
      }

      if (encontrado == false) {
        if (lista.length == 0) {
          if (usados.length > 0) {
            var estadoIgual = false;
            for (let j = 0; j < usados.length; j++) {
              if (usados[j] == numero) {
                estadoIgual = true;
              }
            }
            if (estadoIgual == false) {
              cont++;
              lista.push(numero);
            }
          } else {
            cont++;
            lista.push(numero);
          }
        } else {
          cont++;
          lista.push(numero);
        }
      }
    } while (cont < max)
    return lista.reverse();
  }

  /*
prueba(): void {
  var equipos = ['liga1', 'emelec2', 'Nacional3', 'Barcelona4', 'Quito5', 'Quevedo'];
  var cantidadaDeencuentros = equipos.length / 2;
  var equipo1 = '', equipo2 = '';
  for (let x = 0; x < (equipos.length - 1); x++) {
    var cont = x;
    for (let i = 0; i < cantidadaDeencuentros; i++) {
      equipo1 = equipos[cont];
      cont++;
      if (equipos.length == cont) {
        cont = 0;
      }
      equipo2 = equipos[cont];
      cont++;
      if (equipos.length == cont) {
        cont = 0;
      }
      console.log(equipo1 + ' - ' + equipo2)
    }
    console.log("-----------------")
  }
}

*/
  getPruebaAuto(): void {
    this._fechasService.getautomatico(this.idcampeonato).subscribe(
      response => {
        this.getFechas()
      }, error => {
        console.log(error);
      }
    )
  }

  async generarEncuentros() {
    let espar = false;
    this.equiposJugar = [];
    let equipoFechaLibre = new Equipo('', 'FL', 0, '', '', false, '', '');
    if (this.equipos.length % 2 == 0) { console.log('equipos pares'); espar = true; } else { console.log('equipos impares'); espar = false; }
    this.equiposJugar.push(...this.equipos)
    if (!espar) { this.equiposJugar.push(equipoFechaLibre) }

    const cantidadPartidosFecha = this.equiposJugar.length / 2;
    const cantidadFechas = espar ? this.equipos.length - 1 : this.equipos.length;
    const totalEncuentros = cantidadPartidosFecha * cantidadFechas;

    let posarray = this.equiposJugar.length - 1;
    let i = 0;

    let eq1 = this.equiposJugar[i];
    let eq2 = this.equiposJugar[posarray];

    let encuentros: { eq1: Equipo; eq2: Equipo; }[] = [];
    while (i < totalEncuentros) {

      encuentros.push({ eq1: eq1, eq2: eq2 });
      posarray -= 1;
      eq2 = this.equiposJugar[posarray];

      if (eq1._id == eq2._id) {
        i += 1;
        posarray = this.equiposJugar.length - 1;
        eq1 = this.equiposJugar[i];
        eq2 = this.equiposJugar[posarray];
        if (eq1._id == eq2._id) {
          i = 5000;
        }
      }

    }



    // ORDENAMIENTO

    const fechas = FechasPredefinidas.filter(f => f.cantidad == this.equiposJugar.length)[0];

    for (const fecha of fechas.fechas) {
      const nuevaFecha = new Fechas('', this.idcampeonato, '', true);
      this._fechasService.create(nuevaFecha).subscribe(respfecha => { // Fecha 1
        for (const encuentro of fecha.encuentros) {
          this.crearEncuentro(encuentro.eq1, encuentro.eq2, respfecha._id);
        }
      });
    }

    setTimeout(() => {
      this.getFechas();
    }, 2000);
    // FIN ORDENAMIENTO

    //Actualiza el tipo de fechas del campeonato

    const datosCampeonato = { "_id": this.idcampeonato, "tipo_fechas": 'A' }
    this._campeonatoService.updateDatos(datosCampeonato).subscribe(resp => {
      if (resp.tipo_fechas == 'A') {
        this.mostrarBotonesManuales = false;
      }
    });



    // for (let i = 0; i < cantidadFechas; i++) {
    //   const nuevaFecha = new Fechas('', this.idcampeonato, '', true);
    //   this._fechasService.create(nuevaFecha).subscribe(respfecha => {
    //     console.log(respfecha);
    //     for (let j = 0; j < cantidadPartidosFecha; j++) {
    //       if (encuentros.length > 0) {
    //         const encuentro = encuentros.shift();
    //         const nuevoEncuentro = new Encuentros('', encuentro!.eq1.nombre, encuentro!.eq2.nombre, true, respfecha._id, this.idcampeonato, '', '', '');
    //         this._encuentroService.create(nuevoEncuentro).subscribe(respencuentro => {
    //           console.log(respencuentro);
    //         });
    //       }
    //     }

    //   })
    // }


  }

  crearEncuentro(posEquipo1: number, posEquipo2: number, idFecha: string) {
    const nuevoEncuentro = new Encuentros('', this.equiposJugar[posEquipo1].nombre, this.equiposJugar[posEquipo2].nombre, true, idFecha, this.idcampeonato, '', '', '');
    this._encuentroService.create(nuevoEncuentro).subscribe(respencuentro => {
    });
  }

  generarTodoAutomatico(): void {
    this.generarEncuentros();

    var cantidadEquipos = this.equipos.length;
    if (cantidadEquipos % 2 == 0) {
      cantidadEquipos = cantidadEquipos - 1;
    }
    var ultimo = false;
    for (let i = 0; i < cantidadEquipos; i++) {
      if (i == (cantidadEquipos - 1)) {
        ultimo = true;
      } else {
        ultimo = false;
      }
      this.guardarFechaAutomatico('', ultimo);
    }
  }

  guardarFechaAutomatico(nom: string, ultimo: boolean): void {
    this.fechasCreate.idcampeonato = this.idcampeonato;
    this.fechasCreate.fecha = nom;
    this._fechasService.create(this.fechasCreate).subscribe(
      response => {
        if (ultimo == true) {
          this.spinner.hide();
        }
        this.getFechasAutomatico(response._id);
      }, error => {
        if (ultimo == true) {
          this.spinner.hide();
        }
        console.log(error);
      }
    )
  }

  getFechasAutomatico(id: string): void {
    this._fechasService.getall(this.idcampeonato).subscribe(
      response => {
        this.fechas = response.response;
        this.generarAutomaticamente(id);
      }, error => {
        console.log(error);
      }
    )
  }

  generarAutomaticamente(id: string): void {
    this.idfecha = id;
    var arrayData = [];
    this.equiposShow = [];
    for (let i = 0; i < this.fechas.length; i++) {
      if (this.fechas[i]._id == id) {
        arrayData = this.fechas[i].encuentros;
      }
    }
    if (arrayData.length > 0) {
      var estado: boolean;
      for (let e = 0; e < this.equipos.length; e++) {
        estado = false;
        for (let j = 0; j < arrayData.length; j++) {
          if (this.equipos[e].nombre == arrayData[j].equipo1) {
            estado = true;
          } else if (this.equipos[e].nombre == arrayData[j].equipo2) {
            estado = true;
          }
        }
        if (estado == false) {
          this.equiposShow.push(this.equipos[e])
        }
      }
    } else {
      this.equiposShow = this.equipos;
    }

    if (this.equiposShow.length > 0) {
      var ordenAleatorio = this.numerosAleatorio(this.equiposShow.length, 0, this.arrayUltimos);

      var cantidadEquipos = this.equiposShow.length;
      if (cantidadEquipos % 2 != 0) {
        cantidadEquipos + 1;
      }

      let ultimoN: any;
      ultimoN = ordenAleatorio.pop();
      ordenAleatorio.push(ultimoN)
      this.arrayUltimos.push(ultimoN);
      var cont = 0, equipo1 = '', equipo2 = '';
      for (let i = 0; i < ordenAleatorio.length; i++) {
        if (cont == 0) {
          equipo1 = this.equiposShow[ordenAleatorio[i]].nombre;
          var cant = ordenAleatorio.length - 1;
          if (i == cant) {
            equipo2 = "Fecha libre";
            this.guardarEncuentroAleatorio(equipo1, equipo2, id, this.idcampeonato);
          }
        }
        if (cont == 1) {
          equipo2 = this.equiposShow[ordenAleatorio[i]].nombre;
        }
        cont++;
        if (cont == 2) {
          cont = 0;
          this.guardarEncuentroAleatorio(equipo1, equipo2, id, this.idcampeonato);
          equipo1 = '';
          equipo2 = '';
        }
      }
    }

  }

  guardarEncuentroAleatorio(equipo1: string, equipo2: string, idfecha: string, idcampeonato: string): void {
    this.encuentroCreate = new Encuentros('', equipo1, equipo2, true, idfecha, idcampeonato, '', '', '');
    this._encuentroService.createAutomatico(this.encuentroCreate).subscribe(
      response => {
        this.getFechas();
      }, error => {
        console.log(error);

      }
    )
  }

  actualizarEncuentro(): void {
    this._encuentroService.update(this.encuentroOne).subscribe(
      response => {
        this.toastr.success('', 'Encuentro actualizado correctamente!!');
        this.getFechas();
      }, error => {
        console.log(error);
      }
    )
  }

  getOneEncuentro(id: string): void {
    this._encuentroService.getoneEncuentro(id).subscribe(
      response => {
        this.encuentroOne = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  deleteEncuentro(id: string): void {
    this._encuentroService.delete(id).subscribe(
      response => {
        this.getFechas();
      }, error => {
        console.log(error);
      }
    )
  }

  seleccionFecha(id: string): void {
    this.idfecha = id;
    var arrayData = [];
    this.equiposShow = [];
    for (let i = 0; i < this.fechas.length; i++) {
      if (this.fechas[i]._id == id) {
        arrayData = this.fechas[i].encuentros;
      }
    }
    if (arrayData.length > 0) {
      for (let j = 0; j < arrayData.length; j++) {
        for (let e = 0; e < this.equipos.length; e++) {
          if (this.equipos[e].nombre != arrayData[j].equipo1 && this.equipos[e].nombre != arrayData[j].equipo2) {
            this.equiposShow.push(this.equipos[e])
          }
        }
      }
    } else {
      this.equiposShow = this.equipos;
    }
  }

  agregarEncuentros(): void {
    this.encuentroCreate.idcampeonato = this.idcampeonato;
    this.encuentroCreate.idfecha = this.idfecha;
    this._encuentroService.create(this.encuentroCreate).subscribe(
      response => {
        this.getFechas();
        this.toastr.success('', 'Encuentro agregado correctamente!!');
        this.limpiarCamposEncuentros();
      }, error => {
        console.log(error);
      }
    )
  }

  limpiarCamposEncuentros(): void {
    var dirtyFormID = 'formEncuentro';
    var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
    resetForm.reset();
  }

  actualizarFecha(): void {
    this._fechasService.update(this.fechasUpdate).subscribe(
      response => {
        this.getFechas();
        this.toastr.success('', 'Fecha actualizada correctamente!!');
      }, error => {
        console.log(error);
      }
    )
  }

  getOneFecha(id: string): void {
    this._fechasService.getone(id).subscribe(
      response => {
        this.fechasUpdate = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  quitarFechas(id: string): void {
    this._fechasService.delete(id).subscribe(
      response => {
        this.getFechas();
        this.toastr.success('', 'Fecha eliminada correctamente!!');
      }, error => {
        console.log(error);
      }
    )
  }

  guardarFecha(): void {
    this.spinner.show();
    this.fechasCreate.idcampeonato = this.idcampeonato;
    this._fechasService.create(this.fechasCreate).subscribe(
      response => {
        this.toastr.success('', 'Cambios realizados correctamente!!');
        this.spinner.hide();
        this.limpiarCampos();
        this.getFechas();
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

  limpiarCampos(): void {
    var dirtyFormID = 'formFechas';
    var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
    resetForm.reset();
  }

  getFechas(): void {
    this.spinner.show();
    this._fechasService.getall(this.idcampeonato).subscribe(
      response => {
        this.fechas = response.response;
        console.log(this.fechas)
        this.spinner.hide();
        for (const f of this.fechas) {
          for (const encuentro of f.encuentros) {
            encuentro.logoEquipo1 = logoEquipoDefault;
            encuentro.logoEquipo2 = logoEquipoDefault;
          }
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
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

  getCanchas(): void {
    this._canchaService.getone(this.idcampeonato).subscribe(
      response => {
        this.canchas = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  getEquipos(): void {
    this._equipoService.getall(this.idcampeonato).subscribe(
      response => {
        this.equipos = response.response;
        this.cantidadEquipos = response.total;
      }, error => {
        console.log(error);
      }
    )
  }

}
