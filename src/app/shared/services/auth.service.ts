import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiURL;

  tokenObj:any

  constructor(private http: HttpClient) { }

  login(loginData: any) {
    return this.http.post(`${this.apiUrl}/login`, loginData).pipe(
      tap((response: any) => {

       this.tokenObj = response;

      })
    );
  }

  getObjToken(){
    return this.tokenObj;
  }


  setToken(token: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario',this.tokenObj.nomeUsuario)
    localStorage.setItem('idUsuario',this.tokenObj.id)
  }

  getToken() {
    return localStorage.getItem('token')

  }

  getUsuario(){
    return localStorage.getItem('usuario');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario')
  }

  getAuthorizationHeader(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    }
    return new HttpHeaders();
  }
}
