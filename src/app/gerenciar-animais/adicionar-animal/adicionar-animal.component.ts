import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation,
  forwardRef
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
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
  MessageService
} from 'primeng/api';
import {
  DynamicDialogRef
} from 'primeng/dynamicdialog';
import { IbgeLocalidadesService } from 'src/app/shared/services/ibge-localidades.service';
import {
  AnimaisService
} from '../../shared/services/animais.service';
import { LoadingService } from './../../shared/components/loading-service.service';


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


  constructor(
    private messageService: MessageService,
    private animaisService: AnimaisService,
    private loadingService:LoadingService,
    private ref: DynamicDialogRef,
    private ibgeLocalidadesService: IbgeLocalidadesService
  ) {}



  uploadedFiles: any[] = [];
  atributosAnimal: any
  animalData:any;
  municipioSelecionado: any;
  estados: any;
  municipios: any;
  idUsuario: any;

  formData = new FormData();

  selectedImages: File[] = [];
  uploadedImages: {
    name: string,
    url: string
  } [] = [];


  formDataAnimal = new FormData();

  animaisFormGroup: FormGroup = new FormGroup({
    nome: new FormControl(null, Validators.required),
    especie: new FormControl(null, Validators.required),
    sexo: new FormControl(null, Validators.required),
    raça: new FormControl(null, Validators.required),
    idade: new FormControl(null, Validators.required),
    descricao: new FormControl(null, Validators.required),
    cidade: new FormControl(null, Validators.required),
    castrado: new FormControl(null, Validators.required),
    vacinado: new FormControl(null, Validators.required),
    vermifugado: new FormControl(null, Validators.required),
    porte: new FormControl(null, Validators.required),
    nome_dono:new FormControl(null),
    telefone_dono: new FormControl(null),
    uf: new FormControl(null, Validators.required),
    municipio: new FormControl(null, Validators.required),
  });

  ngOnInit() {
    this.recuperarEstadosUf();
    this.recuperarIdUsuarioLogado();
  }

  selecionarUF(event) {
    this.animaisFormGroup.get('uf').setValue(event.sigla);
  }
  selecionarMunicipio(event) {
    this.animaisFormGroup.get('municipio').setValue(event.nome);
  }


  recuperarEstadosUf(){
    this.ibgeLocalidadesService.listarEstadosUf().subscribe
    (response=>{
      this.estados = response;
    });
  }

  recuperarMunicipiosPorUf(){
    this.ibgeLocalidadesService.recuperarCidadesPorUf(this.animaisFormGroup.get('uf').value).subscribe
    (response=>{
      this.municipios = response;
    });
  }

  recuperarIdUsuarioLogado(){
   this.idUsuario =  localStorage.getItem('idUsuario')
  }

  fecharModal(){
    this.ref.close();
  }

  addAnimal() {
    if(this.selectedImages && this.selectedImages.length > 4){
      this.messageService.add({
        severity: 'warn',
        summary: 'É permitido até 4 fotos por animal.'
      });
      return;
    }
    this.loadingService.ativarLoading();
    this.animalData = {
      nome: this.animaisFormGroup.get('nome').value,
      sexo: this.animaisFormGroup.get('sexo').value,
      raca: this.animaisFormGroup.get('raça').value,
      cidade: this.animaisFormGroup.get('cidade').value,
      idade: this.animaisFormGroup.get('idade').value,
      descricao: this.animaisFormGroup.get('descricao').value,
      especie: this.animaisFormGroup.get('especie').value,
      castrado: this.animaisFormGroup.get('castrado').value,
      vacinado: this.animaisFormGroup.get('vacinado').value,
      vermifugado: this.animaisFormGroup.get('vermifugado').value,
      porte: this.animaisFormGroup.get('porte').value,
      nome_dono: this.animaisFormGroup.get('nome_dono').value,
      telefone_dono: this.animaisFormGroup.get('telefone_dono').value,
      uf: this.animaisFormGroup.get('uf').value,
      municipio: this.animaisFormGroup.get('municipio').value
    }

    for (const image of this.selectedImages) {
      this.formDataAnimal.append('imagem', image, image.name);
    }

    this.formDataAnimal.append('animal', new Blob([JSON.stringify(this.animalData)], {
      type: 'application/json'
    }));

    if (this.animaisFormGroup.invalid || this.uploadedImages.length === 0) {
      if(this.uploadedImages.length === 0){
        this.messageService.add({
          severity: 'warn',
          summary: 'Pelo menos uma imagem deve ser adicionada.'
        });
        this.loadingService.desativarLoading();
      }

      if(this.animaisFormGroup.invalid){
        this.messageService.add({
          severity: 'warn',
          summary: 'Campos obrigatórios não informados.'
        });
        this.loadingService.desativarLoading();
      }

    }
    else {
      this.animaisService.adicionarAnimal(this.idUsuario, this.formDataAnimal).subscribe(
        (response: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Animal salvo com sucesso.'
          });
          // this.animaisFormGroup.reset()

          this.loadingService.desativarLoading();
          this.ref.close(true);
        },
        (error: any) => {
          this.loadingService.desativarLoading();
        }
      );
    }


  }
  onTouched: any = () => {};
  onChange: any = () => {};

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
