import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule)
  },
  {
    path: 'panel',
    loadChildren: () => import('./pages/panel-coordinador/panel-coordinador.module').then(m => m.PanelCoordinadorModule), canActivate: [AuthGuard]
  },
  {
    path: 'campeonato/:id',
    loadChildren: () => import('./pages/campeonato/campeonato.module').then(m => m.CampeonatoModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
