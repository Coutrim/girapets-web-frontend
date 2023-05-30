import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {PaginatorModule} from 'primeng/paginator';
import {ToolbarModule} from 'primeng/toolbar';
import {CardModule} from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import {DialogService, DynamicDialogModule, DynamicDialogRef} from 'primeng/dynamicdialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FileUploadModule} from 'primeng/fileupload';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    PaginatorModule,
    ToolbarModule,
    CardModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    FileUploadModule,
    MessagesModule,
    MessageModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule


    // Adicione aqui outros módulos do PrimeNG que você importou
  ],
  exports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    PaginatorModule,
    ToolbarModule,
    CardModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    FileUploadModule,
    MessagesModule,
    MessageModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule

    // Adicione aqui outros módulos do PrimeNG que você deseja exportar
  ],
  providers:[DialogService, DynamicDialogRef]
})
export class SharedModule { }
