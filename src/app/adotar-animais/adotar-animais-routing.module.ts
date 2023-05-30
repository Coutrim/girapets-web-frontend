
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdotarAnimaisComponent } from './adotar-animais.component';




const routes: Routes = [{path:"", component:AdotarAnimaisComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdotarAnimaisRoutingModule  {}


