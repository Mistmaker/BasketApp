import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampeonatoComponent } from './campeonato.component';
import { CampeonatoRoutingModule } from './campeonato.routes';

import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PartidosFechasComponent } from '../panel-coordinador/detalle-campeonato/partidos-fechas/partidos-fechas.component';
import { ClasificacionComponent } from '../panel-coordinador/detalle-campeonato/clasificacion/clasificacion.component';
import { FichasComponent } from '../panel-coordinador/detalle-campeonato/fichas/fichas.component';
import { ResultadosComponent } from '../panel-coordinador/detalle-campeonato/resultados/resultados.component';

@NgModule({
  declarations: [
    CampeonatoComponent
  ],
  imports: [
    CommonModule,
    CampeonatoRoutingModule,
    SpinnerModule,
    Ng2SearchPipeModule
  ]
})
export class CampeonatoModule { }
