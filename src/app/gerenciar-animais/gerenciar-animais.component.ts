import { LoadingService } from './../shared/components/loading-service.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AnimaisModel } from '../shared/models/animais-model';
import { AnimaisService } from '../shared/services/animais.service';
import { AdicionarAnimalComponent } from './adicionar-animal/adicionar-animal.component';
import { EditarAnimalComponent } from './editar-animal/editar-animal.component';

@Component({
  selector: 'app-gerenciar-animais',
  templateUrl: './gerenciar-animais.component.html',
  styleUrls: ['./gerenciar-animais.component.scss']
})
export class GerenciarAnimaisComponent implements OnInit {

  constructor(
    private animaisService: AnimaisService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private loadingService:LoadingService
  ) {}

  isLoading: boolean = true;
  animais: AnimaisModel[] = [];
  imageUrls: string[] = [];

  ngOnInit() {
    window.scrollTo(0,0)
    this.exibirAnimais();
  }

  // Exibindo lista de animais do serviço
  exibirAnimais() {
    this.loadingService.ativarLoading()
    this.animaisService.listarAnimais().subscribe(
      (objetos) => {
        this.animais = objetos;
        this.loadingService.desativarLoading()
      },
      (error) => {
        console.log('Erro:', error);
        this.loadingService.desativarLoading()
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

  abrirModalEditar(id) {
    setTimeout(() => {
      const ref = this.dialogService.open(EditarAnimalComponent, {
        header: "Editar animal ",
        data:{
          idAnimal:id
        },
        width: '50%',
        height: '70%',
      });
      ref.onClose.subscribe((res) => {
        if(res){
          this.isLoading = true;
          this.animais = [];
          this.exibirAnimais();
        }
        this.exibirAnimais();
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
    ref.onClose.subscribe((res) => {
      this.exibirAnimais();
    });
  }

  excluirAnimal(id){
    window.scrollTo(0,0)
    this.loadingService.ativarLoading()
    this.animaisService.removerAnimal(id).subscribe(
      (response) => {
        this.exibirAnimais();
        this.loadingService.desativarLoading()
        this.messageService.add({severity:'success', summary:'Animal excluído com sucesso.'});
      },
      (error) => {
        this.loadingService.desativarLoading()
        console.log('Erro:', error);

      }
    );
  }
}
