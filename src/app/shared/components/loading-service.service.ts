import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  active:Subject<boolean> = new Subject();

  ativarLoading(){
    this.active.next(true);
  }
  desativarLoading(){
    this.active.next(false);
  }
}
