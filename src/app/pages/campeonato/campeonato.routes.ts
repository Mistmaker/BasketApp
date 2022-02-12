import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartidosFechasComponent } from '../panel-coordinador/detalle-campeonato/partidos-fechas/partidos-fechas.component';
import { CampeonatoComponent } from './campeonato.component';
import { ClasificacionComponent } from '../panel-coordinador/detalle-campeonato/clasificacion/clasificacion.component';
import { FichasComponent } from '../panel-coordinador/detalle-campeonato/fichas/fichas.component';
import { ResultadosComponent } from '../panel-coordinador/detalle-campeonato/resultados/resultados.component';

const routes: Routes = [
  {
    path: '',
    component: CampeonatoComponent,
    children: [
      { path: '', component: ClasificacionComponent },
      { path: 'fechas', component: PartidosFechasComponent },
      { path: 'clasificacion', component: ClasificacionComponent },
      { path: 'noticias', component: FichasComponent },
      { path: 'resultados', component: ResultadosComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampeonatoRoutingModule { }
