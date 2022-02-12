import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultadosCampeonatosRoutingModule } from './resultados-campeonatos-routing.module';
import { ResultadosCampeonatosComponent } from './resultados-campeonatos.component';


@NgModule({
  declarations: [ResultadosCampeonatosComponent],
  imports: [
    CommonModule,
    ResultadosCampeonatosRoutingModule
  ]
})
export class ResultadosCampeonatosModule { }
