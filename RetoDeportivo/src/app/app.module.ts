import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { RegistroComponent } from './component/registro/registro.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './component/navbar/navbar.component';
import { UsuarioAdminComponent } from './component/usuario-admin/usuario-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { ListaUsuariosComponent } from './component/lista-usuarios/lista-usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsuariosComponent,
    InicioComponent,
    RegistroComponent,
    PerfilComponent,
    NavbarComponent,
    UsuarioAdminComponent,
    ListaUsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
