import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelCoordinadorComponent } from './panel-coordinador.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PanelCoordinadorComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./campeonatos-destacados/campeonatos-destacados.module').then(m => m.CampeonatosDestacadosModule), canActivate: [AuthGuard]
      },
      {
        path: 'campeonatos-destacados',
        loadChildren: () => import('./campeonatos-destacados/campeonatos-destacados.module').then(m => m.CampeonatosDestacadosModule), canActivate: [AuthGuard]
      },
      {
        path: 'resultados-campeonatos',
        loadChildren: () => import('./resultados-campeonatos/resultados-campeonatos.module').then(m => m.ResultadosCampeonatosModule), canActivate: [AuthGuard]
      },
      {
        path: 'organizar-campeonatos',
        loadChildren: () => import('./organizar-campeonatos/organizar-campeonatos.module').then(m => m.OrganizarCampeonatosModule), canActivate: [AuthGuard]
      },
      {
        path: 'detalle-campeonato',
        loadChildren: () => import('./detalle-campeonato/detalle-campeonato.module').then(m => m.DetalleCampeonatoModule), canActivate: [AuthGuard]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelCoordinadorRoutingModule { }
