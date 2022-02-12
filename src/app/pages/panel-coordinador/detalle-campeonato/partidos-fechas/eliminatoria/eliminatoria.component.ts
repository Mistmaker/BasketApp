import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Campeonato } from 'src/app/models/Campeonato';
import { Cancha } from 'src/app/models/Cancha';
import { Encuentros } from 'src/app/models/Encuentros';
import { Equipo } from 'src/app/models/Equipo';
import { Fechas } from 'src/app/models/Fechas';
import { CampeonatoService } from 'src/app/services/campeonato.service';
import { CanchaService } from 'src/app/services/cancha.service';
import { EncuentrosService } from 'src/app/services/encuentros.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { FechasService } from 'src/app/services/fechas.service';

@Component({
  selector: 'app-eliminatoria',
  templateUrl: './eliminatoria.component.html',
  styleUrls: ['./eliminatoria.component.scss']
})
export class EliminatoriaComponent implements OnInit {
  @Input() modalidad: string = '';
  public fechas: any[] = [];
  public idcampeonato: string = '';
  public equipos: Equipo[] = [];
  public equiposShow: Equipo[] = [];
  public cantidadEquipos: number = 0;
  public listaAleatoria: number[] = [];
  public encuentroCreate: Encuentros = new Encuentros('', '', '', true, '', '', '', '', '');
  public canchas: Cancha[] = [];
  public fechasCreate: Fechas = new Fechas('', '', '', true);
  public fechasUpdate: Fechas = new Fechas('', '', '', true);
  public idfecha: string = '';
  public encuentroOne: Encuentros = new Encuentros('', '', '', true, '', '', '', '', '');

  constructor(
    private _equipoService: EquipoService,
    private _encuentroService: EncuentrosService,
    private _canchaService: CanchaService,
    private _fechasService: FechasService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.idcampeonato = localStorage.getItem('idcampeonato') + '';
    this.getFechas();
    this.getEquipos();
    this.getCanchas();
  }

  contadorFecha(numero: number): number {
    var contador = 0;
    do {
      numero = numero / 2;
      contador++;
    } while (numero !== 2);
    return contador;
  }

  generarTodoAutomatico(): void {
    this.guardarFechaAutomatico('');
    /*
    if (this.cantidadEquipos <= 4) {
      this.guardarFechaAutomatico('');
    } else if (this.cantidadEquipos > 4) {
      for (let i = 0; i < 2; i++) {
        this.guardarFechaAutomatico('');
      }
    }
    */
    if (this.cantidadEquipos % 2 != 0) {
      this.guardarFechaAutomatico('Fecha libre');
    }
  }

  guardarFechaAutomatico(nom: string): void {
    this.spinner.show();
    this.fechasCreate.idcampeonato = this.idcampeonato;
    this.fechasCreate.fecha = nom;
    this._fechasService.create(this.fechasCreate).subscribe(
      response => {
        this.getFechasAutomatico(response._id);
        this.spinner.hide();
        this.getFechas();
      }, error => {
        this.spinner.hide();
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
      var ordenAleatorio = this.numerosAleatorio(this.equiposShow.length, 0);
      var cont = 0;
      var equipo1 = '';
      var equipo2 = '';
      for (let i = 0; i < ordenAleatorio.length; i++) {
        if (cont == 0) {
          equipo1 = this.equiposShow[ordenAleatorio[i]].nombre;
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
    this.spinner.show();
    this.encuentroCreate = new Encuentros('', equipo1, equipo2, true, idfecha, idcampeonato, '', '', '');
    this._encuentroService.createAutomatico(this.encuentroCreate).subscribe(
      response => {
        this.spinner.hide();
        this.getFechas();
      }, error => {
        console.log(error);
        this.spinner.hide();
      }
    )
  }

  numerosAleatorio(max: number, min: number): number[] {
    var lista: number[];
    lista = [max - 2];
    var cont = 0;
    do {
      var numero = Math.floor(Math.random() * (max - min)) + min;
      var encontrado = false;
      for (let i = 0; i < lista.length; i++) {
        if (lista[i] == numero) {
          encontrado = true;
        }
      }
      if (encontrado == false) {
        cont++;
        lista.push(numero);
      }
    } while (cont < max - 1)
    return lista;
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
    this._fechasService.getall(this.idcampeonato).subscribe(
      response => {
        this.fechas = response.response;
      }, error => {
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
