import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AnimaisModel } from 'src/app/shared/models/animais-model';
import { AnimaisService } from 'src/app/shared/services/animais.service';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-detalhar-animais',
  templateUrl: './detalhar-animais.component.html',
  styleUrls: ['./detalhar-animais.component.scss']
})
export class DetalharAnimaisComponent implements OnInit {

  constructor(private animaisService: AnimaisService, private ref: DynamicDialogRef) { }

  arrayIndex = 0; // Índice inicial do array
  atributosModal: any;
  nomeAnimal:any;
  arrayImagens: any
  imageUrls = [];




  ngOnInit() {

    this.animaisService.getAtributos().subscribe(valor => {
      this.atributosModal = valor;
      console.log(this.atributosModal)
    });


    this.imageUrls = this.atributosModal.imagem



      // Lista as imagens passando nome do animal como parâmetro
      this.animaisService.listarImagens(this.atributosModal.nome).subscribe(
        (objetos) => {
          this.arrayImagens = objetos;
          console.log(this.arrayImagens)
        },
        (error) => {
          console.log('Erro: ao carregar imagens', error);
        }
      )



  }



  incrementIndex() {
    if (this.arrayIndex < this.arrayImagens.length - 1) {
      this.arrayIndex++;
    }
  }

  decrementIndex() {
    if (this.arrayIndex > 0) {
      this.arrayIndex--;
    }
  }


  FecharModal(){
    this.ref.close()
  }
}
