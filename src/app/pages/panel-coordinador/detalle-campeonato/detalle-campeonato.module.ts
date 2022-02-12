import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetalleCampeonatoRoutingModule } from './detalle-campeonato-routing.module';
import { DetalleCampeonatoComponent } from './detalle-campeonato.component';
import { EquiposComponent } from './equipos/equipos.component';
import { PartidosFechasComponent } from './partidos-fechas/partidos-fechas.component';
import { ClasificacionComponent } from './clasificacion/clasificacion.component';
import { FichasComponent } from './fichas/fichas.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { FormsModule } from '@angular/forms';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { EliminatoriaComponent } from './partidos-fechas/eliminatoria/eliminatoria.component';
import { CanchasComponent } from './canchas/canchas.component';
import { EliminatoriaIdaVueltaComponent } from './partidos-fechas/eliminatoria-ida-vuelta/eliminatoria-ida-vuelta.component';
import { GruposComponent } from './partidos-fechas/grupos/grupos.component';
import { LigaIdaComponent } from './partidos-fechas/liga-ida/liga-ida.component';
import { LigaIdaVueltaComponent } from './partidos-fechas/liga-ida-vuelta/liga-ida-vuelta.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { GestionResultadosComponent } from './gestion-resultados/gestion-resultados.component';


@NgModule({
  declarations: [DetalleCampeonatoComponent, EquiposComponent, PartidosFechasComponent, ClasificacionComponent, FichasComponent, MensajesComponent, JugadoresComponent, ConfiguracionComponent, EliminatoriaComponent, CanchasComponent, EliminatoriaIdaVueltaComponent, GruposComponent, LigaIdaComponent, LigaIdaVueltaComponent, ResultadosComponent, GestionResultadosComponent],
  imports: [
    CommonModule,
    DetalleCampeonatoRoutingModule,
    FormsModule,
    SpinnerModule,
    Ng2SearchPipeModule
  ]
})
export class DetalleCampeonatoModule { }
