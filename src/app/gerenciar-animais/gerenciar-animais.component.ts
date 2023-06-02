import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DetalharAnimaisComponent } from '../adotar-animais/detalhar-animais/detalhar-animais.component';
import { AnimaisModel } from '../shared/models/animais-model';
import { AnimaisService } from '../shared/services/animais.service';
import { AdotarAnimaisComponent } from '../adotar-animais/adotar-animais.component';
import { AdicionarAnimalComponent } from './adicionar-animal/adicionar-animal.component';
import { MessageService } from 'primeng/api';
import { EditarAnimalComponent } from './editar-animal/editar-animal.component';

@Component({
  selector: 'app-gerenciar-animais',
  templateUrl: './gerenciar-animais.component.html',
  styleUrls: ['./gerenciar-animais.component.scss']
})
export class GerenciarAnimaisComponent implements OnInit {

  constructor(private animaisService: AnimaisService, private http: HttpClient, private sanitizer: DomSanitizer,
    public dialogService: DialogService, private ref: DynamicDialogRef, private messageService: MessageService) {

  }

  isLoading: boolean = true;
  animais: AnimaisModel[] = [];
  imageUrls: string[] = [];

  ngOnInit() {
    window.scrollTo(0,0)
    this.exibirAnimais()
  }


  // Exibindo lista de animais do serviço
  exibirAnimais() {

    this.animaisService.listarAnimais().subscribe(
      (objetos) => {
        this.animais = objetos;
        this.isLoading = false

      },
      (error) => {
        console.log('Erro:', error);
      }
    );


  }

  nomeAnimal: any;

  // Pega os dados do HTML como parâmetro e passa pra uma variável do serviço, a qual exibe os dados apenas do animal selecionado
  buscarDadosAnimal(id, nomeAnimal: any, sexoAnimal, descricaoAnimal, especieAnimal, racaAnimal, idadeAnimal, cidadeAnimal,imagens) {
    let idModel = id;
    this.nomeAnimal = nomeAnimal;
    let sexoModel = sexoAnimal;
    let descricaoModel = descricaoAnimal;
    let especieModel = especieAnimal;
    let racaModel = racaAnimal;
    let idadeModel = idadeAnimal;
    let cidadeModel = cidadeAnimal
    const imagensModel = imagens;


    this.animaisService.setAtributos(idModel, this.nomeAnimal, sexoModel, descricaoModel, especieModel, racaModel, idadeModel, cidadeModel,imagensModel);
  }

  abrirModalEditar() {
    setTimeout(() => {

      const ref = this.dialogService.open(EditarAnimalComponent, {
        header: "Editar animal ",
        width: '50%',
        height: '70%',
      });
      ref.onClose.subscribe(() => {
        this.exibirAnimais()
    });
    }, 100);
    // Atraso de 1 segundo (1000 milissegundos) antes de abrir a modal
  }

  addAnimal(){
    const ref = this.dialogService.open(AdicionarAnimalComponent, {
      header: "Adicionar novos animais",
      width: '50%',
      height: '100%',
    });

    ref.onClose.subscribe(() => {
      this.exibirAnimais()
  });
  }

  excluirAnimal(id){
    window.scrollTo(0,0)
    this.isLoading = true
    this.animaisService.removerAnimal(id).subscribe(
      (response) => {
        this.exibirAnimais()
        this.isLoading = false
        this.messageService.add({severity:'success', summary:'Animal excluído com sucesso.'});

      },
      (error) => {
        console.log('Erro:', error);
      }
    );
  }
}
