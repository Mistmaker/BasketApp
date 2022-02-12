import { Component, OnInit } from '@angular/core';
import { Equipo } from 'src/app/models/Equipo';
import { UUID } from 'angular2-uuid';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { EquipoService } from 'src/app/services/equipo.service';
import { Global } from 'src/app/services/Global';
import { Router } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';
import { logoEquipoDefault } from '../../../../../environments/environment';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss']
})
export class EquiposComponent implements OnInit {
  public img1E: boolean = false;
  imageSrc1E: any;
  public img2G: boolean = false;
  imageSrc2G: any;
  public equipoCreate: Equipo = new Equipo('', '', 0, '', '', true, null, '');
  public equipoOneUp: Equipo = new Equipo('', '', 0, '', '', true, null, '');
  public equipos: Equipo[] = [];
  public idcampeonato: string = '';
  public urlImage: string = Global.urlImage;
  public cantidadEquipos: number = 0;
  public imagenUpAnterior: string = '';
  public filtro: string = '';
  public imagenEdit: any = {};
  public imagenesEquipo: any[] = [];

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private _equipoService: EquipoService,
    private _router: Router,
    private imageCompress: NgxImageCompressService
  ) { }

  ngOnInit(): void {
    this.idcampeonato = localStorage.getItem('idcampeonato') + '';
    this.getEquipos();
  }

  mascara(logo_equipo: string): any {
    // var imagen = 'https://i.pinimg.com/originals/48/4a/8c/484a8cacedd7a9a957cbdccc74515ede.jpg';
    var imagen = logoEquipoDefault;
    if (this.imagenesEquipo.length > 0) {
      for (let i = 0; i < this.imagenesEquipo.length; i++) {
        if (logo_equipo == this.imagenesEquipo[i].idrelacion) {
          if (this.imagenesEquipo[i].imagen) {
            imagen = this.imagenesEquipo[i].imagen;
          }
        }
      }
    }
    return imagen;
  }

  getImagenesEquipos(): void {
    this._equipoService.getallImage(this.idcampeonato).subscribe(
      response => {
        this.imagenesEquipo = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  getEquipos(): void {
    this.spinner.show();
    this._equipoService.getall(this.idcampeonato).subscribe(
      response => {
        this.spinner.hide();
        this.equipos = response.response;
        this.cantidadEquipos = response.total;
        // this.getImagenesEquipos();
        for (const dato of this.equipos) {
          dato.logoMostrar = logoEquipoDefault;
          if (dato.logo_equipo == '') {
            dato.logoMostrar = logoEquipoDefault
          } else {
            this._equipoService.getImage(dato.logo_equipo).subscribe(r => {
              if (r.imagen){
                dato.logoMostrar = r.imagen
              }
            })
          }
        }
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

  UploadFileUpdate() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.equipoOneUp.logo_equipo = UUID.UUID();
      var bytes = this.imageCompress.byteCount(image)
      this.imageSrc2G = image;
      this.img2G = true;
      this.equipoOneUp.file = image;
      if (bytes > 500000) {
        this.imageCompress.compressFile(image, orientation, 50, 50).then(
          result => {
            console.log(result)
            this.equipoOneUp.file = result;
          }
        );
      }
    });
  }

  limpiarImagen2G(): void {
    this.imageSrc2G = null;
    this.img2G = false;
  }

  UploadFileCreate() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.equipoCreate.logo_equipo = UUID.UUID();
      var bytes = this.imageCompress.byteCount(image)
      this.imageSrc1E = image;
      this.img1E = true;
      this.equipoCreate.file = image;
      if (bytes > 500000) {
        this.imageCompress.compressFile(image, orientation, 50, 50).then(
          result => {
            console.log(result)
            this.equipoCreate.file = result;
          }
        );
      }
    });
  }

  limpiarImagen1E(): void {
    this.imageSrc1E = null;
    this.img1E = false;
  }
  
  limpiarImagen2E(): void {
    this.imageSrc2G = null;
    this.img2G = false;
  }

  deleteEquipo(id: string): void {
    this._equipoService.delete(id).subscribe(
      response => {
        this.toastr.success('', 'Equipo eliminado correctamente!!');
        this.getEquipos();
      }, error => {
        console.log(error);
      }
    )
  }

  irHaJugadores(idequipo: string, nombreEquipo: string): void {
    this._router.navigate(['/panel/detalle-campeonato/jugadores']);
    localStorage.setItem('idequipo', idequipo);
    localStorage.setItem('nombre_equipo', nombreEquipo);
  }

  actualizarEquipo(): void {
    var anterior = '';
    if (this.imagenUpAnterior == this.equipoOneUp.logo_equipo) {
      anterior = 'vacio';
    } else {
      anterior = this.imagenUpAnterior;
    }
    this.spinner.show();
    this._equipoService.updateDatos(this.equipoOneUp, anterior).subscribe(
      response => {
        this.getEquipos();
        this.spinner.hide();
        this.limpiarImagen2E();
        this.toastr.success('', 'Datos actualizados correctamente!!');
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

  getOneEquipo(_id: string): void {
    this._equipoService.getone(_id).subscribe(
      response => {
        this.equipoOneUp = response.equipo;
        this.imagenEdit = response.imagen;
        this.imagenUpAnterior = this.equipoOneUp.logo_equipo;
      }, error => {
        console.log(error);
      }
    )
  }

  agregarEquipo(): void {
    if (this.equipoCreate.logo_equipo == '') {
      this.equipoCreate.logo_equipo = UUID.UUID();
    }
    this.equipoCreate.idcampeonato = this.idcampeonato;
    this.equipoCreate.nro_jugadores = 0;
    this.spinner.show();
    this._equipoService.create(this.equipoCreate).subscribe(
      response => {
        this.spinner.hide();
        this.toastr.success('', 'Equipo agregado correctamente!!');
        this.limpiarCampos();
        this.getEquipos();
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
    // } else {
    //   this.toastr.warning('', 'Agregue un número de jugadores');
    // }
  }

  limpiarCampos(): void {
    var dirtyFormID = 'formEquipoCreate';
    var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
    resetForm.reset();
    this.limpiarImagen1E();
    this.equipoCreate.logo_equipo = '';
  }

}
