import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RestablecerClaveComponent } from './restablecer-clave/restablecer-clave.component';
import { FormsModule } from '@angular/forms';
import { ConfirmarCodigoComponent } from './confirmar-codigo/confirmar-codigo.component';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';

@NgModule({
  declarations: [IndexComponent, NavbarComponent, RegistrarseComponent, LoginComponent, HomeComponent, RestablecerClaveComponent, ConfirmarCodigoComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    FooterModule,
    FormsModule,
    SpinnerModule
  ]
})
export class IndexModule { }
