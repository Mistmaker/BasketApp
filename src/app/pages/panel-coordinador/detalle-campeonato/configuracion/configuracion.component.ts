import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Campeonato } from 'src/app/models/Campeonato';
import { ConfiCampeonato } from 'src/app/models/ConfiCampeonato';
import { CampeonatoService } from 'src/app/services/campeonato.service';
import { ConfiCampeonatoService } from 'src/app/services/conficampeonato.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  public idcampeonato: string = '';
  public campeonato: Campeonato = new Campeonato('', '', '', '', '', '', '', '', '', '', '');
  public configuracion: ConfiCampeonato = new ConfiCampeonato('', '', '', '');
  public configuracionExistente: boolean = false;
  public tipoEliminatoria: string = 'eliminacion directa';

  constructor(
    private _campeonatoService: CampeonatoService,
    private _confiCampeonato: ConfiCampeonatoService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.idcampeonato = localStorage.getItem('idcampeonato') + '';
    this.getCampeonatoOne();
    this.getConfiguracion();
  }

  getConfiguracion(): void {
    this._confiCampeonato.getone(this.idcampeonato).subscribe(
      response => {
        if (response.response == 'existe') {
          this.configuracionExistente = true;
          this.configuracion = response.data;
          if (this.configuracion.tipo == 'eliminatoria') {

          }
        } else if (response.response = 'no-existe') {
          this.configuracionExistente = false;
        }
      }, error => {
        console.log(error);
      }
    )
  }

  guardarCambios(): void {
    this._campeonatoService.updateDatos(this.campeonato).subscribe(resp => {
      console.log(resp);
      this.toastr.success('', 'Configuración actualizada correctamente.')
    });
    // this.configuracion.idcampeonato = this.idcampeonato;
    // if(this.configuracion.tipo == 'eliminatoria') {
    //   this.configuracion.subtipo = this.tipoEliminatoria;
    // }
    // if (this.configuracionExistente == false) {
    //   this.nuevaConfiguracion();
    // } else {
    //   this.actualizarConfiguracion();
    // }
  }

  actualizarConfiguracion(): void {
    this.spinner.show();
    this._confiCampeonato.update(this.configuracion).subscribe(
      response => {
        this.getConfiguracion();
        this.toastr.success('', 'Cambios realizados correctamente!!');
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

  nuevaConfiguracion(): void {
    this.spinner.show();
    this._confiCampeonato.create(this.configuracion).subscribe(
      response => {
        this.getConfiguracion();
        this.spinner.hide();
        this.toastr.success('', 'Cambios realizados correctamente!!');
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

  getCampeonatoOne(): void {
    this.spinner.show();
    this._campeonatoService.getOne(this.idcampeonato).subscribe(
      response => {
        this.spinner.hide();
        this.campeonato = response.campeonato;
        if (!this.campeonato.configuraciones) {
          this.campeonato.configuraciones = {
            jugadores_ingreso_rapido: false,
            suspension_cant_ta: { cantidad: 0, partidos_suspendidos: 0 },
            suspension_cant_tr: { cantidad: 0, partidos_suspendidos: 0 },
          }
        }
        console.log(this.campeonato);
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }
}
