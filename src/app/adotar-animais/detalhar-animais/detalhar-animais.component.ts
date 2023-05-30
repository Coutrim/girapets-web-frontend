import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AnimaisModel } from 'src/app/shared/models/animais-model';
import { AnimaisService } from 'src/app/shared/services/animais.service';

@Component({
  selector: 'app-detalhar-animais',
  templateUrl: './detalhar-animais.component.html',
  styleUrls: ['./detalhar-animais.component.scss']
})
export class DetalharAnimaisComponent implements OnInit {

  constructor(private animaisService: AnimaisService, private ref: DynamicDialogRef) { }


  atributosModal: any

  ngOnInit() {
    this.animaisService.getAtributos().subscribe(valor => {
      this.atributosModal = valor;
      console.log(this.atributosModal)
    });
  }


  FecharModal(){
    this.ref.close()
  }
}
