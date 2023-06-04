import {
  Component,
  OnInit
} from '@angular/core';
import {
  AnimaisService
} from '../shared/services/animais.service';
import {
  AnimaisModel
} from '../shared/models/animais-model';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  DomSanitizer,
  SafeUrl
} from '@angular/platform-browser';
import {
  DialogService,
  DynamicDialogRef
} from 'primeng/dynamicdialog';
import {
  DetalharAnimaisComponent
} from './detalhar-animais/detalhar-animais.component';
import { concatMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';




@Component({
  selector: 'app-adotar-animais',
  templateUrl: './adotar-animais.component.html',
  styleUrls: ['./adotar-animais.component.scss'],

})
export class AdotarAnimaisComponent implements OnInit {
  atributosModal: any;

  constructor(private animaisService: AnimaisService, private http: HttpClient, private sanitizer: DomSanitizer,
    public dialogService: DialogService, private ref: DynamicDialogRef) {

  }

  animais: AnimaisModel[] = [];
  imagemUrl: string;
  isLoading: boolean = true;
  animaisId:any



  nomeAnimal: any;

  // Pega os dados do HTML como parâmetro e passa pra uma variável do serviço, a qual exibe os dados apenas do animal selecionado
  detalharAnimal(id, nomeAnimal: any, sexoAnimal, descricaoAnimal, especieAnimal, racaAnimal, idadeAnimal, cidadeAnimal, imagens) {
    let idModel = id;
    this.nomeAnimal = nomeAnimal;
    let sexoModel = sexoAnimal;
    let descricaoModel = descricaoAnimal;
    let especieModel = especieAnimal;
    let racaModel = racaAnimal;
    let idadeModel = idadeAnimal;
    let cidadeModel = cidadeAnimal
    let imagensModel = imagens

    this.animaisService.setAtributos(idModel, this.nomeAnimal, sexoModel, descricaoModel, especieModel, racaModel, idadeModel, cidadeModel, imagensModel)
  }




  ngOnInit() {
    this.exibirAnimais()
    window.scrollTo(0,0)


  }



  // Exibindo lista de animais do serviço
  exibirAnimais() {
    this.animaisService.listarAnimais().subscribe(
      (objetos) => {
        this.animais = objetos;
        console.log(this.animais)
        this.isLoading = false;
      },
      (error) => {
        console.log('Erro:', error);
      }
    );

  }

  // Abre a modal de detalhar animal
  show() {
    setTimeout(() => {

      const ref = this.dialogService.open(DetalharAnimaisComponent, {
        // header: this.nomeAnimal,
        showHeader: false,
        width: '60%',
        height: '80%',
      });

    }, 100); // Atraso de 1 segundo (1000 milissegundos) antes de abrir a modal
  }




}
