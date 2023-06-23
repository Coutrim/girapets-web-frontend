import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmitirCarregamentosService {

  emitirRecarregamentoNomeUsuario:Subject<any> = new Subject;

constructor() { }

}
