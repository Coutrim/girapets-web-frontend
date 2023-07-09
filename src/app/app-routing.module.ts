import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth.guard';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdotarAnimaisComponent } from './adotar-animais/adotar-animais.component';
import { DetalharAnimaisComponent } from './adotar-animais/detalhar-animais/detalhar-animais.component';
import { AdicionarAnimalComponent } from './gerenciar-animais/adicionar-animal/adicionar-animal.component';
import { GerenciarAnimaisComponent } from './gerenciar-animais/gerenciar-animais.component';

const routes: Routes = [
  //{path:'', component: AppComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  // {path: '', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'quero-adotar', component: AdotarAnimaisComponent},
  {path: 'adicionar-animal', component: AdicionarAnimalComponent},
  {path: 'gerenciar-animais', component: GerenciarAnimaisComponent, canActivate: [AuthGuard],},



];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
