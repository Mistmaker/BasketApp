import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultadosCampeonatosComponent } from './resultados-campeonatos.component';

const routes: Routes = [
  {
    path: '', 
    component: ResultadosCampeonatosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultadosCampeonatosRoutingModule { }
