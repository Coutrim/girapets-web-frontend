import {
  HttpClient
} from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  OnInit
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import {
  MessageService
} from 'primeng/api';
import {
  DynamicDialogRef
} from 'primeng/dynamicdialog';
import {
  AnimaisService
} from 'src/app/shared/services/animais.service';

@Component({
  selector: 'app-editar-animal',
  templateUrl: './editar-animal.component.html',
  styleUrls: ['./editar-animal.component.scss']
})
export class EditarAnimalComponent implements OnInit, ControlValueAccessor, Validator, AfterViewInit {

  constructor(private formbuilder: FormBuilder, private messageService: MessageService, private http: HttpClient, private animaisService: AnimaisService,
    private ref: DynamicDialogRef) {

  }

  atributosModal: any
  arrayImagens: any
  arrayIndex = 0;
  novaImagemDetectada : boolean = false;


  ngOnInit() {

    this.buscarDadosAnimal()
  }
  uploadedFiles: any[] = [];


  buscarDadosAnimal(){
    this.animaisService.getAtributos().subscribe(valor => {
      this.atributosModal = valor;
      console.log(this.atributosModal.imagens)
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


  onFileSelected(event: any) {
    this.selectedImages = event.target.files;
    this.uploadedImages = []; // Limpar o array de imagens
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



  nomeAnimal: any;

  // Pega os dados do HTML como parâmetro e passa pra uma variável do serviço, a qual exibe os dados apenas do animal selecionado
  botaoEditar(id, nomeAnimal: any, sexoAnimal, descricaoAnimal, especieAnimal, racaAnimal, idadeAnimal, cidadeAnimal, imagens) {
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




  editarAnimal() {


      for (const image of this.selectedImages) {
        this.formData.append('imagem', image);

      }



      this.formData.append('animal', new Blob([JSON.stringify(this.atributosModal)], {
        type: 'application/json'
      }));


      this.animaisService.editarAnimal(this.formData, this.atributosModal.id).subscribe(
        (response: any) => {
          this.ref.close()
          this.messageService.add({
            severity: 'success',
            summary: 'Animal salvo com sucesso.'
          });

        }
      );
  }

  excluirImagem(){

    if(this.atributosModal.imagens.length === 0 )
    {
      this.messageService.add({
        severity: 'warn',
        summary: 'Nenhuma imagem para excluir'
      });
    }
    else{

      this.animaisService.excluirImagem(this.atributosModal.imagens[this.arrayIndex].id).subscribe(
        (response: any) => {

        },
        (error: any) => {
          if (error.status === 200) {

            setTimeout(() => {
              this.buscarDadosAnimal();
            }, 2000);

            this.messageService.add({
              severity: 'success',
            summary: 'Imagem excluída com sucesso'
            });
          } else {
            error
          }
        }
      );



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
