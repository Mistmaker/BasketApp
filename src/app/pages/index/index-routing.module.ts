import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmarCodigoComponent } from './confirmar-codigo/confirmar-codigo.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index.component';
import { LoginComponent } from './login/login.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { RestablecerClaveComponent } from './restablecer-clave/restablecer-clave.component';

const routes: Routes = [
  {
    path:'',
    component: IndexComponent,
    children: [
      {
        path:'',
        component: HomeComponent
      },
      {
        path:'registro',
        component: RegistrarseComponent
      },
      {
        path:'login',
        component: LoginComponent
      },
      {
        path:'restablecer-clave',
        component: RestablecerClaveComponent
      },
      {
        path:'confirmar-codigo',
        component: ConfirmarCodigoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
