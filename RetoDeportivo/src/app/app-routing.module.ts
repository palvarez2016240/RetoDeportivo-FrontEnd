import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegistroComponent } from './component/registro/registro.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { CategoriaComponent } from './component/categoria/categoria.component';
import { EquiposComponent } from './component/equipos/equipos.component';
import { TorneosComponent } from './component/torneos/torneos.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'Registro',component:RegistroComponent},
  {path:'Perfil',component:PerfilComponent},
  {path: "Inicio",component:InicioComponent},
  {path: "Categorias", component:CategoriaComponent},
  {path: "Equipos", component:EquiposComponent},
  {path: "Torneos", component:TorneosComponent},
  {path: "Usuarios", component:UsuariosComponent},
  {path:'**',component:LoginComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
