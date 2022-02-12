import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ciudad } from 'src/app/models/Ciudad';
import { Jugador } from 'src/app/models/Jugador';
import { Provincia } from 'src/app/models/Provincia';
import { CiudadService } from 'src/app/services/ciudad.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { UUID } from 'angular2-uuid';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { JugadorService } from 'src/app/services/jugador.service';
import { Global } from 'src/app/services/Global';
import { NgxImageCompressService } from 'ngx-image-compress';
import { imgJugadorDefault } from 'src/environments/environment';
import { CampeonatoService } from '../../../../services/campeonato.service';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.scss']
})
export class JugadoresComponent implements OnInit {

  public filtro: string = '';
  public idequipo: string = '';
  public idcampeonato: string = '';
  public correoLlegado: string = '';
  public nombreEquipo: string = '';
  public provincias: Provincia[] = [];
  public provinciaone: any;
  public provinciaEditar: any;
  public jugadores: any[] = [];
  public jugadorCreate: Jugador = new Jugador('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  public ciudades: Ciudad[] = [];
  public img1: boolean = false;
  imageSrc1: any;
  public img2: boolean = false;
  imageSrc2: any;
  public correoExiste: boolean = false;
  public cedulaExiste: string = '';
  public urlImage: string = Global.urlImage;
  public imagenesJugadores: any[] = [];
  public jugadorOne: Jugador = new Jugador('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  jugadorEditar: Jugador = new Jugador('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  ingresoRapido = false;

  constructor(
    private _router: Router,
    private _provinciaService: ProvinciaService,
    private _ciudadService: CiudadService,
    private toastr: ToastrService,
    private _usuarioService: UsuarioService,
    private _jugadorService: JugadorService,
    private imageCompress: NgxImageCompressService,
    private _campeonatoService: CampeonatoService
  ) { }

  ngOnInit(): void {
    this.idequipo = localStorage.getItem('idequipo') + '';
    this.nombreEquipo = localStorage.getItem('nombre_equipo') + '';
    this.idcampeonato = localStorage.getItem('idcampeonato') + '';

    this.getProvincias();
    this.getJugadores();
    this._campeonatoService.getOne(this.idcampeonato).subscribe(resp => {
      console.log(resp);
      if (resp.campeonato.configuraciones.jugadores_ingreso_rapido) { this.ingresoRapido = true; }
    });
  }

  // mascarImagen(idrelacion: string): any {
  //   var imagenResul = 'https://thumbs.dreamstime.com/b/muestra-y-s%C3%ADmbolo-del-vector-icono-jugador-de-f%C3%BAtbol-aislados-en-la-parte-posterior-blanca-133734511.jpg';
  //   if (this.imagenesJugadores.length > 0) {
  //     for (let i = 0; i < this.imagenesJugadores.length; i++) {
  //       if (idrelacion == this.imagenesJugadores[i].idrelacion) {
  //         imagenResul = this.imagenesJugadores[i].imagen;
  //       }
  //     }
  //   }
  //   return imagenResul;
  // }

  getJugadoresImagenes(): void {
    this._jugadorService.getallImgenesJugadores(this.idequipo).subscribe(
      response => {
        this.imagenesJugadores = response.response;
      }, error => {
        console.log(error)
      }
    )
  }

  getJugadores(): void {
    this._jugadorService.getall(this.idequipo).subscribe(
      response => {
        this.jugadores = response.jugadores;
        for (const jugador of this.jugadores) {
          jugador.imgMostrar = imgJugadorDefault;
        }
        // this.getJugadoresImagenes();
      }, error => {
        console.log(error);
      }
    )
  }

  UploadFileCreate() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.jugadorCreate.img = UUID.UUID();
      var bytes = this.imageCompress.byteCount(image)
      this.imageSrc1 = image;
      this.img1 = true;
      this.jugadorCreate.file = image;
      if (bytes > 500000) {
        this.imageCompress.compressFile(image, orientation, 50, 50).then(
          result => {
            this.jugadorCreate.file = result;
          }
        );
      }
    });
  }

  UploadFileUpdate() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.jugadorEditar.img = UUID.UUID();
      var bytes = this.imageCompress.byteCount(image)
      this.imageSrc2 = image;
      this.img2 = true;
      this.jugadorEditar.file = image;
      if (bytes > 500000) {
        this.imageCompress.compressFile(image, orientation, 50, 50).then(
          result => {
            console.log(result)
            this.jugadorEditar.file = result;
          }
        );
      }
    });
  }

  quitarJugador(correo: string, id: string): void {
    this._jugadorService.quitarJugador(this.idequipo, correo, id).subscribe(
      response => {
        this.getJugadores();
        this.toastr.success('', 'Jugador quitado correctamente!!');
      }, error => {
        console.log(error);
      }
    )
  }

  verificarCedula(): void {
    this._jugadorService.verificarCedula(this.jugadorCreate.cedula, this.idcampeonato).subscribe(
      response => {
        this.jugadorOne = response.jugadores;
        if (response.estado == 'existe-en-este-campeonato') {
          this.cedulaExiste = 'existe-en-este-campeonato';
        } else if (response.estado == 'existe-en-otro-campeonato') {
          this.cedulaExiste = 'existe-en-otro-campeonato';
          this.correoLlegado = this.jugadorOne.correo;
        } else if (response.estado == 'no-existe') {
          this.cedulaExiste = 'no-existe';
        }
      }, error => {
        console.log(error);
      }
    )
  }

  agregarJugadorANuevoCampeonato(): void {
    this._jugadorService.createJugadorEquipo(this.idequipo, this.idcampeonato, this.correoLlegado).subscribe(
      response => {
        this.limpiarCampos();
        this.getJugadores();
        this.toastr.success('', 'Jugador agregado correctamente!!');
        this.cedulaExiste = '';
      }, error => {
        console.log(error);
      }
    )
  }

  verificarCorreo(): void {
    this._usuarioService.verificarEmailExistente(this.jugadorCreate.correo).subscribe(
      response => {
        if (response.response == "existe") {
          this.correoExiste = true;
        } else {
          this.correoExiste = false;
          this.guardarJugador();
        }
      }, error => {
        console.log(error);
      }
    )
  }

  guardarJugador(): void {
    this.jugadorCreate.idequipo = this.idequipo;
    this.jugadorCreate.equipo = this.nombreEquipo;
    this.jugadorCreate.idcampeonato = localStorage.getItem('idcampeonato') + '';
    this._jugadorService.create(this.jugadorCreate).subscribe(
      response => {
        this.getJugadores();
        this.toastr.success('', 'Jugador agregado correctamente!!');
        this.limpiarCampos();
      }, error => {
        console.log(error);
      }
    )
  }

  guardarJugadorFormaRapida() {
    this.jugadorCreate.idequipo = this.idequipo;
    this.jugadorCreate.equipo = this.nombreEquipo;
    this.jugadorCreate.idcampeonato = localStorage.getItem('idcampeonato') + '';

    this.jugadorCreate.correo = 'temp@mail.com';
    this.jugadorCreate.cedula = '0000000000';
    this.jugadorCreate.telefono = '0000000000';
    this.jugadorCreate.provincia = 'SANTO DOMINGO TSACHILAS';
    this.jugadorCreate.ciudad = 'SANTO DOMINGO';
    this.jugadorCreate.fecha_nacimiento = '01-01-2000';

    this._jugadorService.create(this.jugadorCreate).subscribe(
      response => {
        this.getJugadores();
        this.toastr.success('', 'Jugador agregado correctamente!!');
        this.limpiarCampos();
      }, error => {
        console.log(error);
      }
    )
  }

  limpiarCampos(): void {
    var dirtyFormID = 'formJugadorCreate';
    var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
    resetForm.reset();
    this.limpiarImagen1();
  }

  limpiarImagen1(): void {
    this.imageSrc1 = null;
    this.img1 = false;
  }

  convertBase64ToBlob(base64Image: string): any {
    const byteArray = Uint8Array.from(
      atob(base64Image)
        .split('')
        .map(char => char.charCodeAt(0))
    );
    return new Blob([byteArray], { type: 'image/png' });
  }

  mascaraImagen(file: string): any {
    var fileResult = null;
    const reader = new FileReader();
    reader.onload = e => fileResult = reader.result;
    reader.readAsDataURL(this.convertBase64ToBlob(file));
    return fileResult;
  }

  getCiudades(event: any): void {
    var index = event.target.selectedIndex;
    this.jugadorCreate.provincia = event.target[index].text;
    this._ciudadService.getall(this.provinciaone).subscribe(
      response => {
        this.ciudades = response.ciudades;
      }, error => {
        console.log(error);
      }
    )
  }

  getCiudadesEditar(): void {
    // var index = event.target.selectedIndex;
    // this.jugadorEditar.provincia = event.target[index].text;
    this._ciudadService.getall(this.provinciaEditar).subscribe(
      response => {
        this.ciudades = response.ciudades;
      }, error => {
        console.log(error);
      }
    )
  }

  getProvincias(): void {
    this._provinciaService.getall().subscribe(
      response => {
        this.provincias = response.provincias;
      }, error => {
        console.log(error);
      }
    )
  }

  irHaEquipos(): void {
    this._router.navigate(['/panel/detalle-campeonato/equipos']);
  }

  editarJugador(id: string) {
    console.log(id)
    this._jugadorService.getone(id).subscribe(resp => {
      console.log(resp)
      this.jugadorEditar = resp;
      this.provinciaEditar = this.provincias.filter(p => p.nombre_prov == this.jugadorEditar.provincia)[0].codigo_prov;
      this.getCiudadesEditar();
      this._jugadorService.getImgJugador(this.jugadorEditar.correo).subscribe(data => {
        console.log(data, this.provinciaEditar)
        if (data.imagen != '') {
          this.jugadorEditar.imgMostrar = data.imagen;
        } else {
          this.jugadorEditar.imgMostrar = imgJugadorDefault;
        }
      })
    });
  }

  actualizarJugador() {
    this._jugadorService.updateDatos(this.jugadorEditar, this.jugadorEditar._id).subscribe(resp => {
      console.log(resp)
      this.toastr.success('', 'Jugador actualizado correctamente!!');
      this.getJugadores();
    });
  }

}
