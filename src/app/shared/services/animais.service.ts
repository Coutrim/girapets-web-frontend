import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { AnimaisModel } from '../models/animais-model';
@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(public http: HttpClient) { }

  atributosAnimal = new BehaviorSubject<any>(null);



  nomeAnimal: any

  // Pega como parâmetro dados vindo do objeto no HTML e passa pra variavel criando um novo objeto apenas do animal selecionado.
  setAtributos(nome: any, sexo, descricao, especie, imagem, raca, idade, cidade) {

    this.nomeAnimal = nome;

    const animalObj = {
      nome: this.nomeAnimal,
      sexo: sexo,
      descricao: descricao,
      especie: especie,
      imagem: imagem,
      raca: raca,
      idade: idade,
      cidade: cidade
    };


    this.atributosAnimal.next(animalObj);
    return animalObj;
  }



  // Retorna o nome do animal
   getNomeAnimal(){

    return this.nomeAnimal;
  }


  // Retorna os dados do animal selecionado na modal
  getAtributos(): Observable<any> {

    return this.atributosAnimal.asObservable();
  }

  listarAnimais() : Observable<AnimaisModel[]>{
    return this.http.get<AnimaisModel[]>("http://localhost:8080/api/animais");
  }

  adicionarAnimal(formData: FormData) {
    return this.http.post('http://localhost:8080/api/animais', formData);
  }

  removerAnimal(id: number) :Observable<any> {
    return this.http.delete<any>( `http://localhost:8080/api/animais/${id}`)
  }

  fazerUploadImagens(formData: FormData){
    return this.http.post('http://localhost:8080/api/imagens', formData);
  }

  listarImagens(nomeAnimal: string): Observable<any> {
    const params = new HttpParams().set('animal_nome', nomeAnimal);
    return this.http.get<any>('http://localhost:8080/api/imagens', { params });
  }

  deletarImagem(){

  }
}
