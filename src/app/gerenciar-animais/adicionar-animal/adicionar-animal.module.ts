import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdicionarAnimalComponent } from './adicionar-animal.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: []
})
export class AdicionarAnimalModule { }
