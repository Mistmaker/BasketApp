import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampeonatosDestacadosComponent } from './campeonatos-destacados.component';

const routes: Routes = [
  {
    path: '',
    component: CampeonatosDestacadosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampeonatosDestacadosRoutingModule { }
