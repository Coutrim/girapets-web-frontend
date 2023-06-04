import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { AnimaisModel } from '../models/animais-model';
@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(public http: HttpClient) { }


  private API_ANIMAL = 'http://localhost:8080/api/animais';

  atributosAnimal = new BehaviorSubject<any>(null);



  nomeAnimal: any

  // Pega como parâmetro dados vindo do objeto no HTML e passa pra variavel criando um novo objeto apenas do animal selecionado.
  setAtributos(id, nome: any, sexo, descricao, especie, raca, idade, cidade,imagens) {

    this.nomeAnimal = nome;

    const animalObj = {
      id: id,
      nome: this.nomeAnimal,
      sexo: sexo,
      descricao: descricao,
      especie: especie,
      raca: raca,
      idade: idade,
      cidade: cidade,
      imagens: imagens
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
    return this.http.get<AnimaisModel[]>(`${this.API_ANIMAL}`);
  }

  adicionarAnimal(formData: FormData) {
    return this.http.post(`${this.API_ANIMAL}`, formData);
  }
  recuperarPorId(id:number){
    return this.http.get(`${this.API_ANIMAL}/${id}`);
  }
  removerAnimal(id: number) :Observable<any> {
    return this.http.delete<any>( `${this.API_ANIMAL}/${id}`)
  }

  fazerUploadImagens(formData: FormData){
    return this.http.post('http://localhost:8080/api/imagens', formData);
  }

  listarImagens(id: number): Observable<any> {
    return this.http.get<any>( `http://localhost:8080/api/imagens/${id}`)
  }


  editarAnimal(formData: FormData, id: number) {
    return this.http.put(`${this.API_ANIMAL}/${id}`, formData);
  }

  editarImagens(formData: FormData, id: number): Observable<any> {
    return this.http.put(`http://localhost:8080/api/imagens/${id}`, formData);
  }

  excluirImagem(id: number): Observable<any>{
    return this.http.delete<any>( `http://localhost:8080/api/imagens/${id}`)
  }
}
