import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  forwardRef,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import {
  Message
} from 'primeng/api';
import {
  MessageService
} from 'primeng/api';
import {
  DynamicDialogRef
} from 'primeng/dynamicdialog';
import {
  AnimaisService
} from '../../shared/services/animais.service';


@Component({
  selector: 'app-adicionar-animal',
  templateUrl: './adicionar-animal.component.html',
  styleUrls: ['./adicionar-animal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [FormBuilder, {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AdicionarAnimalComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AdicionarAnimalComponent),
      multi: true
    }
  ]
})
export class AdicionarAnimalComponent implements OnInit, ControlValueAccessor, Validator, AfterViewInit {

  constructor(private formbuilder: FormBuilder, private messageService: MessageService, private http: HttpClient, private animaisService: AnimaisService,
    private ref: DynamicDialogRef) {

  }

  ngOnInit() {

  }

  uploadedFiles: any[] = [];
  atributosAnimal: any

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: ''
    });
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

  formDataAnimal = new FormData();

  animaisFormGroup: FormGroup = new FormGroup({
    nome: new FormControl(null, Validators.required),
    especie: new FormControl(null),
    sexo: new FormControl(null),
    raça: new FormControl(null),
    idade: new FormControl(null),
    descricao: new FormControl(null),
    cidade: new FormControl(null),

  });


  addAnimal() {

    const animalData = {
      nome: this.animaisFormGroup.get('nome').value,
      sexo: this.animaisFormGroup.get('sexo').value,
      raca: this.animaisFormGroup.get('raça').value,
      cidade: this.animaisFormGroup.get('cidade').value,
      idade: this.animaisFormGroup.get('idade').value,
      descricao: this.animaisFormGroup.get('descricao').value,
      especie: this.animaisFormGroup.get('especie').value,
    }


    for (const image of this.selectedImages) {

      this.formDataAnimal.append('imagem', image, image.name);

    }

    this.formDataAnimal.append('animal', new Blob([JSON.stringify(animalData)], {
      type: 'application/json'
    }));

    if (this.animaisFormGroup.invalid || this.uploadedImages.length === 0) {
      // this.ExibirMensagemCamposNulos()
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos obrigatórios não informados.'
      });

    } else {
      this.animaisService.adicionarAnimal(this.formDataAnimal).subscribe(
        (response: any) => {

          this.messageService.add({
            severity: 'success',
            summary: 'Animal salvo com sucesso.'
          });
          // this.animaisFormGroup.reset()

          this.ref.close()
          console.log(response)

        },
        (error: any) => {
          error
        }
      );


    }


    // for (const image of this.selectedImages) {
    //   const formDataImagem = new FormData();
    //   formDataImagem.append('imagens', image, image.name);
    //   formDataImagem.append('id', animalData.nome)


    //       setTimeout(() => {
    //       this.animaisService.fazerUploadImagens(formDataImagem).subscribe(
    //         (response: any) => {
    //           // Lida com a resposta da requisição
    //              this.animaisFormGroup.reset()
    //           console.log('Imagem enviada com sucesso:', response);
    //         },
    //         (error: any) => {
    //           // Lida com o erro da requisição
    //           console.error('Erro ao enviar imagem:', error);
    //         }
    //       );
    //     }, 3000);
    //     }
    //   }

    //   ExibirMensagemCamposNulos(){
    //     this.messageService.add({severity:'warn', summary:'Campos obrigatórios não informados'});
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
