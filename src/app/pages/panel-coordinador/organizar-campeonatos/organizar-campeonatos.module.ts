import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizarCampeonatosRoutingModule } from './organizar-campeonatos-routing.module';
import { OrganizarCampeonatosComponent } from './organizar-campeonatos.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';


@NgModule({
  declarations: [OrganizarCampeonatosComponent],
  imports: [
    CommonModule,
    OrganizarCampeonatosRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    SpinnerModule
  ]
})
export class OrganizarCampeonatosModule { }
