import { Component, OnInit } from '@angular/core';
import { Campeonato, CampeonatoPerfil } from 'src/app/models/Campeonato';
import { CampeonatoService } from 'src/app/services/campeonato.service';
import { ToastrService } from 'ngx-toastr';
import { UUID } from 'angular2-uuid';
import { NgxSpinnerService } from 'ngx-spinner';
import { Global } from 'src/app/services/Global';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-detalle-campeonato',
  templateUrl: './detalle-campeonato.component.html',
  styleUrls: ['./detalle-campeonato.component.scss']
})
export class DetalleCampeonatoComponent implements OnInit {

  public _id: string = '';
  public campeonato: Campeonato = new Campeonato('', '', '', '', '', '', '', '', '', null, '');
  public campeonatoUp: Campeonato = new Campeonato('', '', '', '', '', '', '', '', '', null, '');
  public updatePerfilFoto: CampeonatoPerfil = new CampeonatoPerfil('', '', '', '');
  public img1: boolean = false;
  imageSrc1: any;
  public urlImage: string = Global.urlImage;
  public imagePerfil: string = '';
  imgResultBeforeCompress: string = '';
  imgResultAfterCompress: string = '';

  constructor(
    private _campeonatoService: CampeonatoService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private imageCompress: NgxImageCompressService
  ) {
  }


  ngOnInit(): void {
    this._id = localStorage.getItem('idcampeonato') + '';
    this.updatePerfilFoto._id = this._id;
    this.getCampeonato();
  }

  UploadFile() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.updatePerfilFoto.fotoPerfil = UUID.UUID();
      var bytes = this.imageCompress.byteCount(image)
      this.imageSrc1 = image;
      this.img1 = true;
      this.updatePerfilFoto.filePerfil = image;
      if (bytes > 500000) {
        this.imageCompress.compressFile(image, orientation, 50, 50).then(
          result => {
            this.updatePerfilFoto.filePerfil = result;
          }
        );
      }
    });
  }

  actualizarPortada(): void {
    this.spinner.show();
    this._campeonatoService.updateLogo(this.updatePerfilFoto).subscribe(
      response => {
        this.spinner.hide();
        this.toastr.success('', 'Logo actualizado correctamente!!');
        this.getCampeonato();
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

  limpiarImagen1(): void {
    this.imageSrc1 = null;
    this.img1 = false;
  }


  actualizarCampeonato(): void {
    this.spinner.show();
    this._campeonatoService.updateDatos(this.campeonatoUp).subscribe(
      response => {
        this.spinner.hide();
        this.toastr.success('', 'Campeonato actualizado correctamente!!');
        this.getCampeonato();
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

  getCampeonato(): void {
    //this.spinner.show();
    this._campeonatoService.getOne(this._id).subscribe(
      response => {
        this.spinner.hide();
        this.campeonato = response.campeonato;
        this.campeonatoUp = response.campeonato;
        this.campeonatoUp.fecha_inicio = this.convertirFecha(this.campeonato.fecha_inicio);
        this.campeonatoUp.fecha_fin = this.convertirFecha(this.campeonato.fecha_fin);
        this.updatePerfilFoto.anterior = this.campeonatoUp.fotoPerfil;
        if (response.imagen != null) {
          this.imagePerfil = response.imagen.imagen
        }
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

  convertirFecha(fecha: string): string {
    var partes = fecha.split('T');
    return partes[0];
  }

}
