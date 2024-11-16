import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { AnimaisModel } from '../models/animais-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(public http: HttpClient, private authService : AuthService) {}

   apiUrl = environment.apiURL;
   headers = this.authService.getAuthorizationHeader();
   atributosAnimal = new BehaviorSubject<any>(null);
   nomeAnimal: any

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

  listarAnimaisPorUsuario(idUsuario) : Observable<AnimaisModel[]>{
    const headers = this.authService.getAuthorizationHeader();
    return this.http.get<AnimaisModel[]>(`${this.apiUrl}/animais/usuario/${idUsuario}`, { headers });
  }

  adicionarAnimal(idUsuario,formData: FormData) {
    const headers = this.authService.getAuthorizationHeader();
    return this.http.post(`${this.apiUrl}/animais/usuario/${idUsuario}`, formData, { headers });
  }
  recuperarPorId(id:number){
    const headers = this.authService.getAuthorizationHeader();
    return this.http.get(`${this.apiUrl}/animais/${id}`, { headers });
  }
  removerAnimal(id: number) :Observable<any> {
    const headers = this.authService.getAuthorizationHeader();
    return this.http.delete<any>( `${this.apiUrl}/animais/${id}`, { headers })
  }

  fazerUploadImagens(formData: FormData){
    const headers = this.authService.getAuthorizationHeader();
    return this.http.post(`${this.apiUrl}/imagens`, formData, { headers });
  }

  listarImagens(id: number): Observable<any> {
    return this.http.get<any>( `${this.apiUrl}/imagens/${id}`)
  }


  editarAnimal(formData: FormData, id: number) {
    const headers = this.authService.getAuthorizationHeader();

    return this.http.put(`${this.apiUrl}/animais/${id}`, formData, { headers } );
  }

  editarImagens(formData: FormData, id: number): Observable<any> {
    const headers = this.authService.getAuthorizationHeader();
    return this.http.put(`${this.apiUrl}/imagens/${id}`, formData, { headers });
  }

  excluirImagem(id: number): Observable<any>{
    const headers = this.authService.getAuthorizationHeader();
    return this.http.delete<any>( `${this.apiUrl}/imagens/${id}`, { headers })
  }

}
