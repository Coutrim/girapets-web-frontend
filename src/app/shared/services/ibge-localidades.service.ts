import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class IbgeLocalidadesService {
  constructor(public http: HttpClient, private authService : AuthService) {


  }

  recuperarCidadesPorUf(uf:string){
    return this.http.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);

  }

  listarEstadosUf(){
    return this.http.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');

  }

}
