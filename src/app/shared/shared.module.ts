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
import {ConfirmationService, MessageService} from 'primeng/api';
import {RadioButtonModule} from 'primeng/radiobutton';
import { JwtHelperService } from '@auth0/angular-jwt';
import {DialogModule} from 'primeng/dialog';


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
    RadioButtonModule,
    DialogModule


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
    RadioButtonModule,
    DialogModule

  ],
  providers:[DialogService, DynamicDialogRef, ConfirmationService, JwtHelperService, MessageService]
})
export class SharedModule { }
