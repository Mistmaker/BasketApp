import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampeonatosDestacadosRoutingModule } from './campeonatos-destacados-routing.module';
import { CampeonatosDestacadosComponent } from './campeonatos-destacados.component';


@NgModule({
  declarations: [CampeonatosDestacadosComponent],
  imports: [
    CommonModule,
    CampeonatosDestacadosRoutingModule
  ]
})
export class CampeonatosDestacadosModule { }
