import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  forwardRef,
  OnInit
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
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  AnimaisService
} from '../../shared/services/animais.service';


@Component({
  selector: 'app-adicionar-animal',
  templateUrl: './adicionar-animal.component.html',
  styleUrls: ['./adicionar-animal.component.scss'],
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
        this.uploadedImages.push({ name: file.name, url: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }



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


    for (const image of this.selectedImages) {
      this.formData.append('imagem', image);
    }

    const animalData = {
      nome: this.animaisFormGroup.get('nome').value,
      sexo: this.animaisFormGroup.get('sexo').value,
      raca: this.animaisFormGroup.get('raça').value,
      cidade: this.animaisFormGroup.get('cidade').value,
      idade: this.animaisFormGroup.get('idade').value,
      descricao: this.animaisFormGroup.get('descricao').value,
      especie: this.animaisFormGroup.get('especie').value,
    }


    this.formData.append('animal', new Blob([JSON.stringify(animalData)], {
      type: 'application/json'
    }));


    if (this.animaisFormGroup.invalid || this.uploadedImages.length === 0) {
      this.ExibirMensagemCamposNulos()
    }
    else{
    this.animaisService.adicionarAnimal(this.formData).subscribe(
      (response: any) => {
        this.messageService.add({severity:'success', summary:'Animal salvo com sucesso.'});
        this.animaisFormGroup.reset()
        this.ref.close()

        console.log("Animal adicionado com sucesso")
      },
      (error: any) => {
        error
      }
    );
    this.animaisFormGroup.reset()

  }
  }

  ExibirMensagemCamposNulos(){
    this.messageService.add({severity:'warn', summary:'Campos obrigatórios não informados'});
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
