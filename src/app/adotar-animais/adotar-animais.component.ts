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
import { FormBuilder, FormGroup } from '@angular/forms';
import { IbgeLocalidadesService } from '../shared/services/ibge-localidades.service';
import { SelectItem } from 'primeng/api';




@Component({
  selector: 'app-adotar-animais',
  templateUrl: './adotar-animais.component.html',
  styleUrls: ['./adotar-animais.component.scss'],

})
export class AdotarAnimaisComponent implements OnInit {
  atributosModal: any;

  constructor(private animaisService: AnimaisService, private http: HttpClient,
     private sanitizer: DomSanitizer,
    public dialogService: DialogService, private ref: DynamicDialogRef,
     private loadingService : LoadingService,
     private fb: FormBuilder,
     private ibgeLocalidadesService: IbgeLocalidadesService) {

      this.animalFilterForm = this.fb.group({
        nome: [''],
        sexo: [''],
        especie: [''],
        raca: [''],
        cidade: [''],
        idade: [''],
        castrado: [''],
        vacinado: [''],
        vermifugado: [''],
        porte: [''],
        uf: [''],
        municipio: [''],
      });
  }

  animais: AnimaisModel[] = [];
  imagemUrl: string;
  isLoading: boolean = true;
  animaisId:any
  gatos:any;
  dogs:any;
  todosAnimais:any;
  nomeAnimal: any;
  animalFilterForm: FormGroup;
  animaisFiltrados = [];

  estados:any;
  municipios:any;
  sexos:SelectItem[];;
  porte:SelectItem[];;
  especie:SelectItem[];;

  ngOnInit() {
    this.exibirAnimais();
    this.recuperarEstadosUf();
    this.criarObjetosFiltros();
    window.scrollTo(0,0)

  }

  limparFiltros(){
    this.animalFilterForm.reset()
  }

  criarObjetosFiltros(){
    this.sexos = [
      {label:"Macho", value:"Macho"},
      {label:"Fêmea", value:"Fêmea"}
    ]

    this.especie = [
      {label:"Cachorro", value:"Cachorro"},
      {label:"Gato", value:"Gato"}
    ]

    this.porte = [
      {label:"Pequeno", value:"Pequeno"},
      {label:"Médio", value:"Médio"},
      {label:"Grande", value:"Grande"}
    ]
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

          'min-width': '360px',
          'margin-top':'100px',
          'border-radius':'8px'
        }
      });

    }, 100);
  }

  selecionarUF(event) {
    this.animalFilterForm.get('uf').setValue(event.sigla);
  }
  selecionarMunicipio(event) {
    this.animalFilterForm.get('municipio').setValue(event.nome);
  }

  selecionarSexo(event) {
    this.animalFilterForm.get('sexo').setValue(event.sexo);
  }

  recuperarEstadosUf(){
    this.ibgeLocalidadesService.listarEstadosUf().subscribe
    (response=>{
      this.estados = response;
    });
  }

  recuperarMunicipiosPorUf(){
    this.ibgeLocalidadesService.recuperarCidadesPorUf(this.animalFilterForm.get('uf').value).subscribe
    (response=>{
      this.municipios = response;
    });
  }

  filtrarAnimais() {
    // this.animais = [...this.todosAnimais]; // Reiniciar a lista de animais filtrados

    console.log(this.animalFilterForm.value.sexo);

    if (this.animalFilterForm.value.nome) {
      this.filtrarPorNome();
    }

    if (this.animalFilterForm.value.sexo) {
      this.filtrarPorSexo();
    }

    if (this.animalFilterForm.value.especie) {
      this.filtrarPorEspecie();
    }


    if (this.animalFilterForm.value.porte) {
      this.filtrarPorPorte();
    }

    if (this.animalFilterForm.value.uf) {
      this.filtrarPorUF();
    }

    if (this.animalFilterForm.value.municipio) {
      this.filtrarPorMunicipio();
    }

    if (this.animalFilterForm.value.idade) {
      this.filtrarPorIdade();
    }

    // if (this.animalFilterForm.value.raca) {
    //   this.filtrarPorRaca();
    // }

    // if (this.animalFilterForm.value.castrado) {
    //   this.filtrarPorCastrado();
    // }

    // if (this.animalFilterForm.value.vermifugado) {
    //   this.filtrarPorVermifugado();
    // }

    // if (this.animalFilterForm.value.vacinado) {
    //   this.filtrarPorVacinado();
    // }

    // if (this.animalFilterForm.value.cidade) {
    //   this.filtrarPorCidade();
    // }
  }



  filtrarPorNome() {
    const filtroNome = this.animalFilterForm.value.nome.toLowerCase();
    this.animais = this.todosAnimais.filter(animal => animal?.nome?.toLowerCase() ===(filtroNome));
  }

  filtrarPorSexo() {
    const filtroSexo = this.animalFilterForm.value.sexo.toLowerCase();
    this.animais = this.todosAnimais.filter(animal => animal?.sexo?.toLowerCase() === filtroSexo);
  }

  filtrarPorEspecie() {
    const filtroEspecie = this.animalFilterForm.value.especie.toLowerCase();
    this.animais = this.todosAnimais.filter(animal => animal?.especie?.toLowerCase() === (filtroEspecie));
  }

  filtrarPorRaca() {
    const filtroRaca = this.animalFilterForm.value.raca.toLowerCase();
    this.animais = this.todosAnimais.filter(animal => animal?.raca?.toLowerCase() ===(filtroRaca));
  }

  filtrarPorCidade() {
    const filtroCidade = this.animalFilterForm.value.cidade.toLowerCase();
    this.animais = this.todosAnimais.filter(animal => animal?.cidade?.toLowerCase() ===(filtroCidade));
  }

  filtrarPorIdade() {
    const filtroIdade = this.animalFilterForm.value.idade;
    this.animais = this.todosAnimais.filter(animal => animal?.idade ===(filtroIdade));
  }

  filtrarPorCastrado() {
    const filtroCastrado = this.animalFilterForm.value.castrado.toLowerCase();
    this.animais = this.todosAnimais.filter(animal => animal?.castrado?.toLowerCase() === filtroCastrado);
  }

  filtrarPorVacinado() {
    const filtroVacinado = this.animalFilterForm.value.vacinado.toLowerCase();
    this.animais = this.todosAnimais.filter(animal => animal?.vacinado?.toLowerCase() === filtroVacinado);
  }

  filtrarPorVermifugado() {
    const filtroVermifugado = this.animalFilterForm.value.vermifugado.toLowerCase();
    this.animais = this.todosAnimais.filter(animal => animal?.vermifugado?.toLowerCase() === filtroVermifugado);
  }

  filtrarPorPorte() {
    const filtroPorte = this.animalFilterForm.value.porte.toLowerCase();
    this.animais = this.todosAnimais.filter(animal => animal?.porte?.toLowerCase() === filtroPorte);
  }

  filtrarPorUF() {
    const filtroUF = this.animalFilterForm.value.uf;
    this.animais = this.todosAnimais.filter(animal => animal.uf === filtroUF);
  }

  filtrarPorMunicipio() {
    const filtroMunicipio = this.animalFilterForm.value.municipio.toLowerCase();
    this.animais = this.todosAnimais.filter(animal => animal?.municipio?.toLowerCase() === (filtroMunicipio));
  }




}

