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


  arrayImagens: any
  arrayIndex = 0; // Índice inicial do array
  atributosModal: any;




  ngOnInit() {

    this.animaisService.getAtributos().subscribe(valor => {
      this.atributosModal = valor;

    });

  }



  incrementIndex() {
    if (this.arrayIndex < this.atributosModal.imagens.length - 1) {
      this.arrayIndex++;
    }
    console.log(this.atributosModal?.imagens.length)
    console.log(this.arrayIndex)
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
