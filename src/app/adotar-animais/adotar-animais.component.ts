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
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { LoadingService } from '../shared/components/loading-service.service';




@Component({
  selector: 'app-adotar-animais',
  templateUrl: './adotar-animais.component.html',
  styleUrls: ['./adotar-animais.component.scss'],

})
export class AdotarAnimaisComponent implements OnInit {
  atributosModal: any;

  constructor(private animaisService: AnimaisService, private http: HttpClient, private sanitizer: DomSanitizer,
    public dialogService: DialogService, private ref: DynamicDialogRef, private loadingService : LoadingService) {

  }

  animais: AnimaisModel[] = [];
  imagemUrl: string;
  isLoading: boolean = true;
  animaisId:any
  gatos:any;
  dogs:any;
  todosAnimais:any;
  cities:any;
  selectedCity2:any;
  nomeAnimal: any;



  ngOnInit() {
    this.exibirAnimais()
    window.scrollTo(0,0)

  }



  detalharAnimal(id) {
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

  // Exibindo lista de animais do serviço
  exibirAnimais() {
    this.loadingService.ativarLoading();
    this.animaisService.listarAnimais().subscribe(
      (objetos) => {
        this.animais = objetos;
        this.todosAnimais = objetos;

        this.loadingService.desativarLoading()
      },
      (error) => {
        console.log('Erro:', error);
        this.loadingService.desativarLoading()
      }
    );

  }


  buscarGatos() {
    this.animais = this.todosAnimais.filter(animal =>
      animal.especie && typeof animal.especie === 'string' && animal.especie.toLowerCase() === 'gato'
    );
  }

  buscarDogs() {
    this.animais = this.todosAnimais.filter(animal =>
      animal.especie && typeof animal.especie === 'string' && animal.especie.toLowerCase() === 'cachorro'
    );
  }



  buscarTodosAnimais(){
    this.animais = this.todosAnimais;
  }

  // Abre a modal de detalhar animal
  show() {
    setTimeout(() => {

      const ref = this.dialogService.open(DetalharAnimaisComponent, {
        // header: this.nomeAnimal,
        // showHeader: false,
        width: '70%',
        height: '83%',
        styleClass: 'modal-detail-animal',
        style: {
          // Estilos em linha aqui
          'min-width': '360px',
          'margin-top':'100px',
          'border-radius':'8px'
        }
      });

    }, 100); // Atraso de 1 segundo (1000 milissegundos) antes de abrir a modal
  }




}
