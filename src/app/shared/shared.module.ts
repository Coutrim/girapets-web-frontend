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
import {SplitButtonModule} from 'primeng/splitbutton';
import {SidebarModule} from 'primeng/sidebar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {RadioButtonModule} from 'primeng/radiobutton';


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
    FileUploadModule,
    MessagesModule,
    MessageModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    SplitButtonModule,
    SidebarModule,
    ConfirmDialogModule,
    RadioButtonModule


    // Adicione aqui outros módulos do PrimeNG que você importou
  ],
  exports: [
    ButtonModule,
    InputTextModule,
    PaginatorModule,
    ToolbarModule,
    CardModule,
    DynamicDialogModule,
    FileUploadModule,
    MessagesModule,
    MessageModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    SplitButtonModule,
    SidebarModule,
    ConfirmDialogModule,
    RadioButtonModule

  ],
  providers:[DialogService, DynamicDialogRef, ConfirmationService]
})
export class SharedModule { }
