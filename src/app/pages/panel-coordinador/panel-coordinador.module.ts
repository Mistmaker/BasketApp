import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelCoordinadorRoutingModule } from './panel-coordinador-routing.module';
import { PanelCoordinadorComponent } from './panel-coordinador.component';

@NgModule({
  declarations: [PanelCoordinadorComponent],
  imports: [
    CommonModule,
    PanelCoordinadorRoutingModule
  ]
})
export class PanelCoordinadorModule { }
