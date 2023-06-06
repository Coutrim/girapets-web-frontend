import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { AnimaisModel } from '../models/animais-model';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(public http: HttpClient) {


  }

   apiUrl = environment.apiURL;



  // private API_ANIMAL = 'http://localhost:8080/api/animais';

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
    return this.http.get<AnimaisModel[]>(`${this.apiUrl}/animais`);
  }

  adicionarAnimal(formData: FormData) {
    return this.http.post(`${this.apiUrl}/animais`, formData);
  }
  recuperarPorId(id:number){
    return this.http.get(`${this.apiUrl}/animais/${id}`);
  }
  removerAnimal(id: number) :Observable<any> {
    return this.http.delete<any>( `${this.apiUrl}/animais/${id}`)
  }

  fazerUploadImagens(formData: FormData){
    return this.http.post(`${this.apiUrl}/imagens`, formData);
  }

  listarImagens(id: number): Observable<any> {
    return this.http.get<any>( `${this.apiUrl}/imagens/${id}`)
  }


  editarAnimal(formData: FormData, id: number) {
    return this.http.put(`${this.apiUrl}/animais/${id}`, formData);
  }

  editarImagens(formData: FormData, id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/imagens/${id}`, formData);
  }

  excluirImagem(id: number): Observable<any>{
    return this.http.delete<any>( `${this.apiUrl}/imagens/${id}`)
  }
}
