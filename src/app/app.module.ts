import { ActivatedRouteSnapshot } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { AdotarAnimaisComponent } from './adotar-animais/adotar-animais.component';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DetalharAnimaisComponent } from './adotar-animais/detalhar-animais/detalhar-animais.component';
import { GerenciarAnimaisComponent } from './gerenciar-animais/gerenciar-animais.component';
import { MessageService } from 'primeng/api';
import { AdicionarAnimalComponent } from './gerenciar-animais/adicionar-animal/adicionar-animal.component';
import { EditarAnimalComponent } from './gerenciar-animais/editar-animal/editar-animal.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment.prod';
import { MenuSidebarComponent } from './menu-sidebar/menu-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdotarAnimaisComponent,
    HomeComponent,
    DetalharAnimaisComponent,
    GerenciarAnimaisComponent,
    AdicionarAnimalComponent,
    EditarAnimalComponent,
    LoadingComponent,
    MenuSidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    SharedModule,
    HttpClientModule,
    // ServiceWorkerModule.register('../../ngsw-config.json', {
    //   enabled: environment.production
    // }),

  ],
  providers: [MessageService, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
