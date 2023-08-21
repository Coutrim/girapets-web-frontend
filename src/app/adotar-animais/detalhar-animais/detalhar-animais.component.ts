import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AnimaisModel } from 'src/app/shared/models/animais-model';
import { AnimaisService } from 'src/app/shared/services/animais.service';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { LoadingService } from 'src/app/shared/components/loading-service.service';

@Component({
  selector: 'app-detalhar-animais',
  templateUrl: './detalhar-animais.component.html',
  styleUrls: ['./detalhar-animais.component.scss']
})
export class DetalharAnimaisComponent implements OnInit {

  constructor(private animaisService: AnimaisService, private ref: DynamicDialogRef,
    private loadingService:LoadingService,
    private config:DynamicDialogConfig,
     private messageService: MessageService) { }


  arrayImagens: any
  arrayIndex = 0; // Índice inicial do array
  atributosModal: any;
  idAnimal:any;


  ngOnInit() {
    this.idAnimal = this.config.data?.idAnimal;
    this.buscarDadosAnimal(this.idAnimal);
    this.isLogged()
  }

  buscarDadosAnimal(id){
    this.loadingService.ativarLoading();
    this.animaisService.recuperarPorId(id).subscribe(valor => {
      this.atributosModal = valor;
      this.loadingService.desativarLoading();
    },err=>{
      this.ref.close();
      this.loadingService.desativarLoading();
    });

  }

  isLogged(){
    if(localStorage.getItem('token') === null || localStorage.getItem('token') === ''
     || localStorage.getItem('token') === undefined){
      return false;
     } else{
      return true;
     }

  }

  exibirMsgNaoImplementado(){
    this.messageService.add({severity:'warn', summary:'Funcionalidade não implementada'});
  }

  incrementIndex() {
    if (this.arrayIndex < this.atributosModal.imagens.length - 1) {
      this.arrayIndex++;
    }

  }

  decrementIndex() {
    if (this.arrayIndex > 0) {
      this.arrayIndex--;
    }
  }


  FecharModal(){
    this.ref.close()
  }
}
