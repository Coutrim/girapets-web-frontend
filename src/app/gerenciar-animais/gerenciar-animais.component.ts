import { LoadingService } from './../shared/components/loading-service.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AnimaisModel } from '../shared/models/animais-model';
import { AnimaisService } from '../shared/services/animais.service';
import { AdicionarAnimalComponent } from './adicionar-animal/adicionar-animal.component';
import { EditarAnimalComponent } from './editar-animal/editar-animal.component';
import {ConfirmationService} from 'primeng/api';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';


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
    private loadingService:LoadingService,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private router: Router

  ) {}

  isLoading: boolean = true;
  animais: AnimaisModel[] = [];
  imageUrls: string[] = [];

  ngOnInit() {
    window.scrollTo(0,0)
    this.exibirAnimais();

    this.checkTokenExpiration(localStorage.getItem('token'))

    setInterval(() => {
      this.checkTokenExpiration(localStorage.getItem('token'))
    }, 2.5 * 60 * 1000);

  }

  checkTokenExpiration(token: string){

    setInterval(() => {
      const decodedToken: any = jwt_decode(token);
      const expirationDate = new Date(decodedToken.exp * 1000); // Converter para milissegundos
      const currentDate = new Date();

      if(expirationDate < currentDate){

        this.messageService.add({severity:'error', summary:'Sessão expirada. Faça login novamente!'});
        this.router.navigate(['/login']);
        this.authService.logout();

      } else{

      }
      return expirationDate < currentDate;
    }, 2.5 * 60 * 1000);

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
    this.loadingService.ativarLoading()
    setTimeout(() => {
      const ref = this.dialogService.open(EditarAnimalComponent, {
        header: "Editar animal ",
        data:{
          idAnimal:id
        },
        width: '40%',
        height: '90%',
      });
      ref.onClose.subscribe((res) => {
        if(res){
          this.isLoading = true;
          this.animais = [];
          this.exibirAnimais();
        }
        this.exibirAnimais();
      });
      this.loadingService.desativarLoading()
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
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir este animal?',
      accept: () => {
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
  });


  }
}
