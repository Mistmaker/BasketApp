import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Cancha } from 'src/app/models/Cancha';
import { Ciudad } from 'src/app/models/Ciudad';
import { Provincia } from 'src/app/models/Provincia';
import { CanchaService } from 'src/app/services/cancha.service';
import { CiudadService } from 'src/app/services/ciudad.service';
import { ProvinciaService } from 'src/app/services/provincia.service';

@Component({
  selector: 'app-canchas',
  templateUrl: './canchas.component.html',
  styleUrls: ['./canchas.component.scss']
})
export class CanchasComponent implements OnInit {

  public provincias: Provincia[] = [];
  public provinciaone: any;
  public ciudades: Ciudad[] = [];
  public ciudadesUp: Ciudad[] = [];
  public CanchaCreate: Cancha = new Cancha('', '', '', '', '', '', true);
  public CanchaOne: Cancha = new Cancha('', '', '', '', '', '', true);
  public idcampeonato: string = '';
  public canchas: Cancha[] = [];
  public filtro: string = '';

  constructor(
    private _provinciaService: ProvinciaService,
    private _ciudadService: CiudadService,
    private _canchaService: CanchaService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.idcampeonato = localStorage.getItem('idcampeonato') + '';
    this.getProvincias();
    this.consultarCancha();
  }

  eliminarCancha(id: string): void {
    this.spinner.show();
    this._canchaService.delete(id).subscribe(
      response => {
        this.spinner.hide();
        this.consultarCancha();
        this.toastr.success('', 'Cancha eliminada correctamente!!');
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

  updateCancha(): void {
    this.spinner.show();
    this._canchaService.update(this.CanchaOne).subscribe(
      response => {
        this.consultarCancha();
        this.toastr.success('', 'Cancha agregada correctamente!!');
        this.spinner.hide();
      }, error => {
        console.log(error);
        this.spinner.hide();
      }
    )
  }

  getOneChancha(id: string): void {
    this._canchaService.getoneId(id).subscribe(
      response => {
        this.CanchaOne = response.response;
        this.getCiudadesUp(this.CanchaOne.provincia);
      }, error => {
        console.log(error);
      }
    )
  }

  consultarCancha(): void {
    this.spinner.show();
    this._canchaService.getone(this.idcampeonato).subscribe(
      response => {
        this.spinner.hide();
        this.canchas = response.response;
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

  guardarCancha(): void {
    this.spinner.show();
    this.CanchaCreate.idcampeonato = this.idcampeonato;
    this._canchaService.create(this.CanchaCreate).subscribe(
      response => {
        this.spinner.hide();
        this.consultarCancha();
        this.toastr.success('', 'Cancha agregada correctamente!!');
        this.limpiarCampos();
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

  limpiarCampos(): void {
    var dirtyFormID = 'formCancha';
    var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
    resetForm.reset();
  }

  getCiudadesUp(idprovicia: string): void {
    this.spinner.show();
    this._ciudadService.getall(idprovicia).subscribe(
      response => {
        this.spinner.hide();
        this.ciudadesUp = response.ciudades;
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

  getCiudades(): void {
    this.spinner.show();
    this._ciudadService.getall(this.CanchaCreate.provincia).subscribe(
      response => {
        this.spinner.hide();
        this.ciudades = response.ciudades;
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

  getProvincias(): void {
    this.spinner.show();
    this._provinciaService.getall().subscribe(
      response => {
        this.spinner.hide();
        this.provincias = response.provincias;
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

}
