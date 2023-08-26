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
import { DetalharAnimaisComponent } from '../adotar-animais/detalhar-animais/detalhar-animais.component';


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
  idUsuarioLogado:any;

  nomeAnimal: any;

  ngOnInit() {
    this.recuperarIdUsuario();
    window.scrollTo(0,0)
    this.exibirAnimais();

    const decodedToken: any = jwt_decode(localStorage.getItem('token'));
    const expirationDate = new Date(decodedToken.exp * 1000); // Converter para milissegundos
    const currentDate = new Date();

    if(expirationDate < currentDate){

      this.messageService.add({severity:'error', summary:'Sessão expirada. Faça login novamente!'});
      this.router.navigate(['/login']);
      this.authService.logout();

    } else{

    }

    setInterval(() => {
      this.checkTokenExpiration(localStorage.getItem('token'))
    }, 2.5 * 60 * 1000);


  }

  recuperarIdUsuario(){
    this.idUsuarioLogado = localStorage.getItem('idUsuario')
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
    this.animaisService.listarAnimaisPorUsuario(this.idUsuarioLogado).subscribe(
      (objetos) => {
        this.animais = objetos;
        this.loadingService.desativarLoading()
      },
      (error) => {
        console.error('Erro:', error);
        this.loadingService.desativarLoading()
      }
    );
  }

  addAnimal(){
    const ref = this.dialogService.open(AdicionarAnimalComponent, {
      header: "Adicionar novos animais",
      width: '50%',
      height: '100%',
    });
    ref.onClose.subscribe((res) => {
      if(res){
        this.exibirAnimais();
      }
    });
  }


  abrirModalEditar(id) {
    console.log(id);

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
    });
  }

  detalharAnimal(id) {
    console.log(id);
    setTimeout(() => {
      const ref = this.dialogService.open(DetalharAnimaisComponent, {
        // header: this.nomeAnimal,
        // showHeader: false,
        width: '70%',
        data:{
          idAnimal:id
        },
        height: '83%',
        styleClass: 'modal-detail-animal',
        style: {
          // Estilos em linha aqui
          'min-width': '360px',
          'border-radius':'8px'
        }
      });

    }, 100);
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
            console.error('Erro:', error);

          }
        );
      }
  });


  }
}
