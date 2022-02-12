import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizarCampeonatosComponent } from './organizar-campeonatos.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizarCampeonatosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizarCampeonatosRoutingModule { }
