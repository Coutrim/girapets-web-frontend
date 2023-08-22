import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  ValidationErrors,
  Validator
} from '@angular/forms';
import {
  MessageService
} from 'primeng/api';
import {
  DynamicDialogConfig,
  DynamicDialogRef
} from 'primeng/dynamicdialog';
import {
  AnimaisService
} from 'src/app/shared/services/animais.service';
import { IbgeLocalidadesService } from 'src/app/shared/services/ibge-localidades.service';
import { LoadingService } from './../../shared/components/loading-service.service';

@Component({
  selector: 'app-editar-animal',
  templateUrl: './editar-animal.component.html',
  styleUrls: ['./editar-animal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditarAnimalComponent implements OnInit, ControlValueAccessor, Validator, AfterViewInit {

  constructor(
    private messageService: MessageService,
    private animaisService: AnimaisService,
    private loadingService:LoadingService,
    private ref: DynamicDialogRef,
    private config:DynamicDialogConfig,
    private ibgeLocalidadesService: IbgeLocalidadesService
  ) {

  }
  idAnimal:number;
  atributosModal: any
  arrayImagens: any
  arrayIndex = 0;
  novaImagemDetectada : boolean = false;
  estados: any;
  municipios:any;

  siglaSelecionada: string;
  uploadedFiles: any[] = [];
  municipioSelecionado:any;

  ngOnInit() {
    this.idAnimal = this.config.data.idAnimal;
    this.buscarDadosAnimal(this.idAnimal);
    this.recuperarEstadosUf();

  }


  selecionarUF(event) {
    this.atributosModal.uf = event.sigla;
  }
  selecionarMunicipio(event) {
    this.municipioSelecionado = event.nome;
  }



  recuperarEstadosUf(){
    this.ibgeLocalidadesService.listarEstadosUf().subscribe
    (response=>{
      this.estados = response;
    });
  }

  recuperarMunicipiosPorUf(){
    this.ibgeLocalidadesService.recuperarCidadesPorUf(this.atributosModal.uf).subscribe
    (response=>{
      this.municipios = response;

    });
  }


  fecharModal(){
    this.ref.close();
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

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  formData = new FormData();

  selectedImages: File[] = [];
  uploadedImages: {
    name: string,
    url: string
  } [] = [];

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];

    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      const fileExtension: string = file.name.split('.').pop().toLowerCase();

      if (!allowedExtensions.includes(`.${fileExtension}`)) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Arquivo não suportado: Utilize imagens .jpeg, .png ou .jpg'
        });
        return;
      }
      this.selectedImages.push(file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedImages.push({
          name: file.name,
          url: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  }



  nomeAnimal: any;



  editarAnimal() {
    this.atributosModal.municipio = this.municipioSelecionado;

    if(this.selectedImages && this.selectedImages.length > 4){
      this.messageService.add({
        severity: 'warn',
        summary: 'É permitido até 4 fotos por animal.'
      });
      return;
    }
    for (const image of this.selectedImages) {
      this.formData.append('imagem', image);
    }

    this.formData.append('animal', new Blob([JSON.stringify(this.atributosModal)], {
      type: 'application/json'
    }));

    if (this.atributosModal.nome.trim() === '' || this.atributosModal.especie.trim() === ''
    || this.atributosModal.raca.trim() === '' || this.atributosModal.sexo.trim() === ''
    || this.atributosModal.idade.trim() === '' || this.atributosModal.descricao.trim() === ''
    || this.atributosModal.cidade.trim() === '' || this.atributosModal.castrado.trim() === ''
    || this.atributosModal.vacinado.trim() === '' || this.atributosModal.vermifugado.trim() === ''
    || this.atributosModal.porte.trim() === ''
    // || this.atributosModal.estado.trim() === ''
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos obrigatórios não informados.'
      });
    } else{
    this.loadingService.ativarLoading();


    console.log(this.atributosModal.municipio);

    console.log(this.atributosModal);
    console.log(  this.municipioSelecionado);

    this.animaisService.editarAnimal(this.formData, this.atributosModal.id).subscribe(
      (response: any) => {


        this.loadingService.desativarLoading();
        this.ref.close(true);
        this.messageService.add({
          severity: 'success',
          summary: 'Animal salvo com sucesso.'
        });
      },err=>{
        console.error(err);
        this.loadingService.desativarLoading();
      }
    );
  }
}




  excluirImagem(){
    if(this.atributosModal.imagens.length === 0 || this.atributosModal.imagens.length === 1)
    {
      this.messageService.add({
        severity: 'warn',
        summary: 'Nenhuma imagem para excluir'
      });
    }
    else{
      this.atributosModal.imagens = this.atributosModal.imagens.filter((imagem,index)=>index != this.arrayIndex);
      if(this.arrayIndex !== 0){
        this.arrayIndex = this.arrayIndex - 1;
      }

    }
  }

  ExibirMensagemCamposNulos() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Campos obrigatórios não informados'
    });
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

  onTouched: any = () => {};
  onChange: any = () => {};

  ngAfterViewInit(): void {}
  validate(control: AbstractControl): ValidationErrors {
    return null;
  }
  registerOnValidatorChange ? (fn: () => void) : void {}

  writeValue(obj: any): void {

  }
  registerOnChange(fn: any): void {

  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState ? (isDisabled: boolean) : void {
  }
}
