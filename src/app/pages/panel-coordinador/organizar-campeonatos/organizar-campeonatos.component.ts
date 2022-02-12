import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Campeonato } from 'src/app/models/Campeonato';
import { CampeonatoService } from 'src/app/services/campeonato.service';
import { ClipboardService } from 'ngx-clipboard'

@Component({
  selector: 'app-organizar-campeonatos',
  templateUrl: './organizar-campeonatos.component.html',
  styleUrls: ['./organizar-campeonatos.component.scss']
})
export class OrganizarCampeonatosComponent implements OnInit {

  public campeonatoCreate: Campeonato = new Campeonato('', '', '', '', '', '', '', '', 'vacio', null, '');
  public campeonatos: Campeonato[] = [];
  public campeonatosCerrados: Campeonato[] = [];
  public idusuario: string = '';
  public nombreUser: string = '';
  public filtro: string = '';
  mostrarCampeonatosCerrados = false;

  constructor(
    private _campeonatoService: CampeonatoService,
    private toastr: ToastrService,
    private _router: Router,
    private spinner: NgxSpinnerService,
    private _clipboardService: ClipboardService,
  ) {
    this.idusuario = localStorage.getItem('_id') + '';
    this.nombreUser = localStorage.getItem('nombre') + '';
  }

  ngOnInit(): void {
    this.mostrarCampeonatos();
  }

  eliminarCampeonato(id: string): void {
    this.spinner.show();
    this._campeonatoService.delete(id).subscribe(
      response => {
        this.spinner.hide();
        this.mostrarCampeonatos();
        this.toastr.success('', 'Campeonato eliminado correctamente!!');
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

  irHaDetalle(id: string): void {
    this._router.navigate(['/panel/detalle-campeonato']);
    localStorage.setItem('idcampeonato', id);
  }

  limpiarCampos(): void {
    var dirtyFormID = 'formCampeonatoCreate';
    var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
    resetForm.reset();
  }

  guardarCampeonato(): void {
    this.campeonatoCreate.id_organizador = this.idusuario;
    this.campeonatoCreate.nombre_organizador = this.nombreUser;
    this.spinner.show();
    this._campeonatoService.create(this.campeonatoCreate).subscribe(
      response => {
        this.spinner.hide();
        this.toastr.success('', 'Campeonato añadido correctamente!!');
        this.limpiarCampos();
        this.mostrarCampeonatos();
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

  mostrarCampeonatos(): void {
    this.spinner.show();
    this._campeonatoService.getall(this.idusuario).subscribe(
      response => {
        this.campeonatos = response.campeonatos;
        this.campeonatosCerrados = this.campeonatos.filter(c => c.estado_campeonato == 'cerrado');
        this.campeonatos = this.campeonatos.filter(c => c.estado_campeonato == 'abierto');
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

  copiarEnlace(id: string){
    const enlace = `http://186.4.146.196:5454/#/campeonato/${id}`;
    this._clipboardService.copy(enlace);
    this.toastr.success('', 'Enlace copiado al portapapeles');
  }

}
