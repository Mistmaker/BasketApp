import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Cancha } from 'src/app/models/Cancha';
import { Encuentros } from 'src/app/models/Encuentros';
import { EncuentrosDoble } from 'src/app/models/Encuentrosdoble';
import { Equipo } from 'src/app/models/Equipo';
import { Grupos } from 'src/app/models/Grupos';
import { CanchaService } from 'src/app/services/cancha.service';
import { EncuentrosService } from 'src/app/services/encuentros.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {
  public grupoCreate: Grupos = new Grupos('', '', '', '');
  public cantGrupos: string = '';
  public modalidadGrupo: string = '';
  public idcampeonato: string = '';
  public grupos: any[] = [];
  public idgrupo: string = '';
  public equipos: Equipo[] = [];
  public idequipo: string = '';
  public mensajeEquipo: string = '';
  public existenGrupoas: boolean = false;
  public encuentrosGrupos: any[] = [];
  public existenEncuentros: boolean = false;
  public encuentroOne: Encuentros = new Encuentros('', '', '', true, '', '', '', '', '');
  public encuentroOneDoble: EncuentrosDoble = new EncuentrosDoble('', '', '', true, '', '', '', '', '', '', '', '');
  public canchas: Cancha[] = [];
  habilitarGuardar = true;
  mostrarBotonEditar = true;

  constructor(
    private _grupoService: GrupoService,
    private toastr: ToastrService,
    private _equipoService: EquipoService,
    private spinner: NgxSpinnerService,
    private _canchaService: CanchaService,
    private _encuentroService: EncuentrosService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // this.idcampeonato = localStorage.getItem('idcampeonato') + '';
    // this.mostrarGrupos();
    // this.getEquipos();
    // this.mostrarEncuentros();
    // this.mostrarCnchas();
    this.route.parent!.params.subscribe(params => {
      console.log('grupos', params);
      if (Object.keys(params).length === 0) {
        this.idcampeonato = localStorage.getItem('idcampeonato') + '';
      } else {
        this.idcampeonato = params.id;
        this.mostrarBotonEditar = false;
      }
      this.mostrarGrupos();
      this.getEquipos();
      this.mostrarEncuentros();
      this.mostrarCnchas();
    });

  }

  actualizarEncuentroDoble(): void {
    this._encuentroService.updateEncuentroDoble(this.encuentroOneDoble).subscribe(
      response => {
        this.mostrarEncuentros();
        this.toastr.success('', 'Encuentro actualizado correctamente!!');
      }, error => {
        console.log(error);
      }
    )
  }

  getEncuentroOneDoble(id: string): void {
    this._encuentroService.getoneEncuentroDoble(id).subscribe(
      response => {
        this.encuentroOneDoble = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  actualizarEncuentro(): void {
    this._encuentroService.update(this.encuentroOne).subscribe(
      response => {
        this.mostrarEncuentros();
        this.toastr.success('', 'Encuentro actualizado correctamente!!');
      }, error => {
        console.log(error);
      }
    )
  }

  getEncuentroOne(id: string): void {
    this._encuentroService.getoneEncuentro(id).subscribe(
      response => {
        this.encuentroOne = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  mostrarCnchas(): void {
    this._canchaService.getone(this.idcampeonato).subscribe(
      response => {
        this.canchas = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  mostrarEncuentros(): void {
    this._grupoService.getEncuntros(this.idcampeonato).subscribe(
      response => {
        this.encuentrosGrupos = response;
        console.log(this.encuentrosGrupos)
        if (this.encuentrosGrupos[0].fechas.length > 0) {
          this.existenEncuentros = true;
        } else {
          this.existenEncuentros = false;
        }
      }, error => {
        console.log(error);
      }
    )

  }

  generarEncuentrosAutomaticos(): void {
    this.spinner.show();
    this._grupoService.createAutomatico(this.idcampeonato).subscribe(
      response => {
        this.spinner.hide();
        this.mostrarEncuentros();
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

  eliminarGrupo(id: string): void {
    this._grupoService.delete(id).subscribe(
      response => {
        this.mostrarGrupos();
        this.toastr.success('', 'Grupo eliminado correctamente!!');
      }, error => {
        console.log(error);
      }
    )
  }

  eliminarEquipo(id: string): void {
    this._grupoService.deleteEquipo(id).subscribe(
      response => {
        this.mostrarGrupos();
        this.toastr.success('', 'Equipo eliminado correctamente!!');
      }, error => {
        console.log(error);
      }
    )
  }

  addSeleccion(idgrupo: string): void {
    this.idgrupo = idgrupo;
  }

  agregarEquipoGrupo(): void {
    var partes = this.idequipo.split('-');
    this._grupoService.createEquipo(this.idgrupo, partes[0], partes[1], this.idcampeonato).subscribe(
      response => {
        if (response.error) {
          this.mensajeEquipo = response.error;
        } else {
          this.toastr.success('', 'Equipo agregado correctamente!!');
          this.mensajeEquipo = '';
        }
        this.mostrarGrupos();
      }, error => {
        console.log(error);
      }
    )
  }

  getEquipos(): void {
    this._equipoService.getall(this.idcampeonato).subscribe(
      response => {
        this.equipos = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  mostrarGrupos(): void {
    this._grupoService.getone(this.idcampeonato).subscribe(
      response => {
        this.grupos = response.response;
        if (this.grupos.length > 0) {
          this.existenGrupoas = true;
        } else {
          this.existenGrupoas = false;
        }
      }, error => {
        console.log(error);
      }
    )
  }

  guardarGrupos(): void {
    this.habilitarGuardar = false;
    const equposAsignar = [...this.equipos]
    for (let i = 0; i < +this.cantGrupos; i++) {
      this.grupoCreate = new Grupos('', this.idcampeonato, this.generarLetras(i + 1), this.modalidadGrupo);
      this._grupoService.create(this.grupoCreate).subscribe(
        response => {
          console.log(response);
          const cantEquipoAsignar = this.equipos.length / +this.cantGrupos;
          let cuenta = 0;
          for (let j = 0; j < cantEquipoAsignar; j++) {
            const pos = Math.floor(Math.random() * equposAsignar.length);
            const equipo = equposAsignar.splice(pos, 1)[0];
            // console.log(i, j, equipo);

            this._grupoService.createEquipo(response._id, equipo._id, equipo.nombre, this.idcampeonato).subscribe(
              response => {
                console.log(response)
              }, error => {
                console.log(error);
              }
            )

          }

          this.mostrarGrupos();
        }, error => {
          console.log(error);
          this.habilitarGuardar = true;
        }
      )
    }
  }

  generarLetras(n: number): string {
    var letra = '';
    if (n == 1) {
      letra = 'GRUPO A';
    } else if (n == 2) {
      letra = 'GRUPO B';
    } else if (n == 3) {
      letra = 'GRUPO C';
    } else if (n == 4) {
      letra = 'GRUPO D';
    } else if (n == 5) {
      letra = 'GRUPO E';
    } else if (n == 6) {
      letra = 'GRUPO F';
    } else if (n == 7) {
      letra = 'GRUPO G';
    } else if (n == 8) {
      letra = 'GRUPO H';
    } else if (n == 9) {
      letra = 'GRUPO I';
    } else if (n == 10) {
      letra = 'GRUPO J';
    }
    return letra;
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


}
