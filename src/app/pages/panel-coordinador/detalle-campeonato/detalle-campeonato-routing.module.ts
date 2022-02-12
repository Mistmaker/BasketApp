import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanchasComponent } from './canchas/canchas.component';
import { ClasificacionComponent } from './clasificacion/clasificacion.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { DetalleCampeonatoComponent } from './detalle-campeonato.component';
import { EquiposComponent } from './equipos/equipos.component';
import { FichasComponent } from './fichas/fichas.component';
import { GestionResultadosComponent } from './gestion-resultados/gestion-resultados.component';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { PartidosFechasComponent } from './partidos-fechas/partidos-fechas.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { AuthGuard } from '../../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DetalleCampeonatoComponent,
    children: [
      { path: '', component: EquiposComponent, canActivate: [AuthGuard] },
      { path: 'equipos', component: EquiposComponent, canActivate: [AuthGuard] },
      { path: 'canchas', component: CanchasComponent, canActivate: [AuthGuard] },
      { path: 'fechas', component: PartidosFechasComponent, canActivate: [AuthGuard] },
      { path: ':id/fechas', component: PartidosFechasComponent, canActivate: [AuthGuard] },
      { path: 'clasificacion', component: ClasificacionComponent, canActivate: [AuthGuard] },
      { path: 'fichas', component: FichasComponent, canActivate: [AuthGuard] },
      { path: 'mensajes', component: MensajesComponent, canActivate: [AuthGuard] },
      { path: 'jugadores', component: JugadoresComponent, canActivate: [AuthGuard] },
      { path: 'configuracion', component: ConfiguracionComponent, canActivate: [AuthGuard] },
      { path: 'resultados', component: ResultadosComponent, canActivate: [AuthGuard] },
      { path: 'gestion-resultados/:idencuentro', component: GestionResultadosComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalleCampeonatoRoutingModule { }
