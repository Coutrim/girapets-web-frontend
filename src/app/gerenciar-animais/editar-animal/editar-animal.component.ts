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
    private config:DynamicDialogConfig
  ) {

  }
  idAnimal:number;
  atributosModal: any
  arrayImagens: any
  arrayIndex = 0;
  novaImagemDetectada : boolean = false;


  ngOnInit() {
    this.idAnimal = this.config.data.idAnimal;
    this.buscarDadosAnimal(this.idAnimal);
  }
  uploadedFiles: any[] = [];

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
      } else {
        this.selectedImages = event.target.files;
        // Limpar o array de imagens
        for (let i = 0; i < this.selectedImages.length; i++) {
          const file = this.selectedImages[i];
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
    }
  }



  nomeAnimal: any;

  // Pega os dados do HTML como parâmetro e passa pra uma variável do serviço, a qual exibe os dados apenas do animal selecionado
  botaoEditar(id, nomeAnimal: any, sexoAnimal, descricaoAnimal, especieAnimal, racaAnimal, idadeAnimal,
     cidadeAnimal, castradoAnimal, vacinadoAnimal, vermifugadoAnimal, porteAnimal,
     donoAnimal, telefoneDonoAnimal, imagens) {
    let idModel = id;
    this.nomeAnimal = nomeAnimal;
    let sexoModel = sexoAnimal;
    let descricaoModel = descricaoAnimal;
    let especieModel = especieAnimal;
    let racaModel = racaAnimal;
    let idadeModel = idadeAnimal;
    let cidadeModel = cidadeAnimal
    let castradoModel = castradoAnimal;
    let vacinadoModel = vacinadoAnimal;
    let vermifugadoModel = vermifugadoAnimal;
    let porteModel = porteAnimal;
    let donoModel = donoAnimal;
    let telefoneDonoModel = telefoneDonoAnimal;
    let imagensModel = imagens

    this.animaisService.setAtributos(idModel, this.nomeAnimal, sexoModel, descricaoModel, especieModel, racaModel,
      idadeModel, cidadeModel, castradoModel, vacinadoModel, vermifugadoModel, porteModel, donoModel,
      telefoneDonoModel, imagensModel)
  }

  editarAnimal() {


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
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos obrigatórios não informados.'
      });
    } else{

      this.loadingService.ativarLoading();
    this.animaisService.editarAnimal(this.formData, this.atributosModal.id).subscribe(
      (response: any) => {

        console.log(this.atributosModal);

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
