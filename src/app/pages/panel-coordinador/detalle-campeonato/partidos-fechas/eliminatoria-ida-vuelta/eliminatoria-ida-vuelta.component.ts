import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Cancha } from 'src/app/models/Cancha';
import { EncuentrosDoble } from 'src/app/models/Encuentrosdoble';
import { Equipo } from 'src/app/models/Equipo';
import { FechaElimDoble } from 'src/app/models/FechaElimDoble';
import { CanchaService } from 'src/app/services/cancha.service';
import { EncuentrosService } from 'src/app/services/encuentros.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { FechasService } from 'src/app/services/fechas.service';

@Component({
  selector: 'app-eliminatoria-ida-vuelta',
  templateUrl: './eliminatoria-ida-vuelta.component.html',
  styleUrls: ['./eliminatoria-ida-vuelta.component.scss']
})
export class EliminatoriaIdaVueltaComponent implements OnInit {
  @Input() modalidad: string = '';

  public fechaCreate: FechaElimDoble = new FechaElimDoble('', '', '', '', true);
  public fechaOne: FechaElimDoble = new FechaElimDoble('', '', '', '', true);
  public idcampeonato: string = '';
  public fechasDoble: any[] = [];
  public encuentroDobleCreate: EncuentrosDoble = new EncuentrosDoble('', '', '', true, '', '', '', '', '', '', '', '');
  public encuentroDobleOne: EncuentrosDoble = new EncuentrosDoble('', '', '', true, '', '', '', '', '', '', '', '');
  public idfecha: string = '';
  public equipos: Equipo[] = [];
  public equiposShow: Equipo[] = [];
  public cantidadEquipos: number = 0;
  public canchas: Cancha[] = [];

  constructor(
    private _fechaService: FechasService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private _encuentroService: EncuentrosService,
    private _equipoService: EquipoService,
    private _canchaService: CanchaService,
  ) { }

  ngOnInit(): void {
    this.idcampeonato = localStorage.getItem('idcampeonato') + '';
    this.getFechasElimDoble();
    this.getEquipos();
    this.getCanchas();
  }

  generarTodoAutomatico(): void {
    this.guardarFechaElimDobleAutomatico('', '');
    /*
    if (this.cantidadEquipos <= 4) {
      this.guardarFechaElimDobleAutomatico('', '');
    } else if (this.cantidadEquipos > 4) {
      for (let i = 0; i < 2; i++) {
        this.guardarFechaElimDobleAutomatico('', '');
      }
    }
    */
    if (this.cantidadEquipos % 2 != 0) {
      this.guardarFechaElimDobleAutomatico('Fecha libre', '');
    }
  }

  guardarFechaElimDobleAutomatico(f1: string, f2: string): void {
    this.fechaCreate.idcampeonato = this.idcampeonato;
    this.fechaCreate.fechaida = f1;
    this.fechaCreate.fechavuelta = f2;
    this.spinner.show();
    this._fechaService.createElimDoble(this.fechaCreate).subscribe(
      response => {
        this.getFechasElimDobleAutomatico(response.fecha._id);
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

  getFechasElimDobleAutomatico(id: string): void {
    this._fechaService.getallEliminDoble(this.idcampeonato).subscribe(
      response => {
        this.fechasDoble = response.response;
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
    for (let i = 0; i < this.fechasDoble.length; i++) {
      if (this.fechasDoble[i]._id == id) {
        arrayData = this.fechasDoble[i].encuentros;
      }
    }
    if (arrayData.length > 0) {
      var estado: boolean;
      for (let e = 0; e < this.equipos.length; e++) {
        estado = false;
        for (let j = 0; j < arrayData.length; j++) {
          if (this.equipos[e].nombre == arrayData[j].equipo1) {
            estado = true;
          } else if (this.equipos[e].nombre != arrayData[j].equipo2){
            estado = true;
          }
          if (estado == false) {
            this.equiposShow.push(this.equipos[e])
          }
        }
      }
    } else {
      this.equiposShow = this.equipos;
    }

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

  guardarEncuentroAleatorio(equipo1: string, equipo2: string, idfecha: string, idcampeonato: string): void {
    this.spinner.show();
    this.encuentroDobleCreate = new EncuentrosDoble('', equipo1, equipo2, true, idfecha, idcampeonato, '', '', '', '', '', '');
    this._encuentroService.createAutomaticoDoble(this.encuentroDobleCreate).subscribe(
      response => {
        this.spinner.hide();
        this.getFechasElimDoble();
      }, error => {
        console.log(error);
        this.spinner.hide();
      }
    )
  }

  quitarEncuentros(id: string): void {
    this._encuentroService.deleteEncuentroDoble(id).subscribe(
      response => {
        this.getFechasElimDoble();
        this.toastr.success('', 'Encuentro eliminada correctamente!!');
      }, error => {
        console.log(error);
      }
    )
  }

  getOneFecha(id: string): void {
    this._fechaService.getoneElimDoble(id).subscribe(
      response => {
        this.fechaOne = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  quitarFechas(id: string): void {
    this._fechaService.deleteElimDoble(id).subscribe(
      response => {
        this.getFechasElimDoble();
        this.toastr.success('', 'Fecha eliminada correctamente!!');
      }, error => {
        console.log(error);
      }
    )
  }

  actualizarFecha(): void {
    this._fechaService.updateElimDoble(this.fechaOne).subscribe(
      response => {
        this.getFechasElimDoble();
        this.toastr.success('', 'Fecha actualizado correctamente!!');
      }, error => {
        console.log(error);
      }
    )
  }

  actualizarEncuentro(): void {
    this._encuentroService.updateEncuentroDoble(this.encuentroDobleOne).subscribe(
      response => {
        this.getFechasElimDoble();
        this.toastr.success('', 'Encuentro actualizado correctamente!!');
      }, error => {
        console.log(error);
      }
    )
  }

  getOneEncuentroDoble(idencuentro: string): void {
    this._encuentroService.getoneEncuentroDoble(idencuentro).subscribe(
      response => {
        this.encuentroDobleOne = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  agregarEncuentros(): void {
    this.encuentroDobleCreate.idcampeonato = this.idcampeonato;
    this.encuentroDobleCreate.idfecha = this.idfecha;
    this._encuentroService.createDoble(this.encuentroDobleCreate).subscribe(
      response => {
        this.limpiarCamposEncuentro();
        this.getFechasElimDoble();
        this.toastr.success('', 'Encuentro agregado correctamente!!');
      }, error => {
        console.log(error);
      }
    )
  }

  limpiarCamposEncuentro(): void {
    var dirtyFormID = 'formEncuentroDoble';
    var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
    resetForm.reset();
  }


  seleccionFecha(id: string): void {
    this.idfecha = id;
    var arrayData = [];
    this.equiposShow = [];
    for (let i = 0; i < this.fechasDoble.length; i++) {
      if (this.fechasDoble[i]._id == id) {
        arrayData = this.fechasDoble[i].encuentros;
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

  getFechasElimDoble(): void {
    this._fechaService.getallEliminDoble(this.idcampeonato).subscribe(
      response => {
        this.fechasDoble = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  guardarFechaElimDoble(): void {
    this.fechaCreate.idcampeonato = this.idcampeonato;
    this.spinner.show();
    this._fechaService.createElimDoble(this.fechaCreate).subscribe(
      response => {
        this.spinner.hide();
        this.toastr.success('', 'Fecha agregada correctamente!!');
        this.limpiarCampos();
        this.getFechasElimDoble();
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

  limpiarCampos(): void {
    var dirtyFormID = 'formFechaDoble';
    var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
    resetForm.reset();
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

  getCanchas(): void {
    this._canchaService.getone(this.idcampeonato).subscribe(
      response => {
        this.canchas = response.response;
      }, error => {
        console.log(error);
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

}
