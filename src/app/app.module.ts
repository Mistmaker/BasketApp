import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioService } from './services/usuarios.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CampeonatoService } from './services/campeonato.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EquipoService } from './services/equipo.service';
import { JugadorService } from './services/jugador.service';
import { ProvinciaService } from './services/provincia.service';
import { CiudadService } from './services/ciudad.service';
import { ConfiCampeonatoService } from './services/conficampeonato.service';
import { FechasService } from './services/fechas.service';
import { EncuentrosService } from './services/encuentros.service';
import { CanchaService } from './services/cancha.service';
import { GrupoService } from './services/grupo.service';
import { ResultadoService } from './services/resultados.service';
import { AnotacionService } from './services/anotacion.service';
import { AmonestacionService } from './services/amonestacion.service';
import { ActividadesService } from './services/actividades.service';
import {NgxImageCompressService} from 'ngx-image-compress';

import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({positionClass: 'toast-bottom-right'}), 
    Ng2SearchPipeModule,
    ClipboardModule
  ],
  providers: [
    UsuarioService,
    CampeonatoService,
    EquipoService,
    JugadorService,
    ProvinciaService,
    CiudadService,
    ConfiCampeonatoService,
    FechasService,
    EncuentrosService,
    CanchaService,
    GrupoService,
    NgxImageCompressService,
    ResultadoService,
    AnotacionService,
    AmonestacionService,
    ActividadesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
