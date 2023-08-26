import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../shared/components/loading-service.service';
import { AuthService } from '../shared/services/auth.service';
import { EmitirCarregamentosService } from '../shared/services/emitirCarregamentos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {
  errorMessage: string;

  constructor(private authService: AuthService, private loadingService:LoadingService, private router: Router,
     private messageService: MessageService, private emitirRecarregamentoService: EmitirCarregamentosService) { }

  loginData = {
    login: '',
    password: ''
  };


  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  onSubmit() {
    this.loadingService.ativarLoading()
    this.authService.login(this.loginData).subscribe(
      (response: any) => {
        const token = response.token;

        this.authService.setToken(token);
        this.loadingService.desativarLoading();
        this.router.navigate(['/gerenciar-animais']);
        this.emitirRecarregamentoService.emitirRecarregamentoNomeUsuario.next(true);
        // Redirecionar para a página inicial ou outra página desejada após o login
      },
      (error: any) => {
        console.error('Erro de login:', error);
        this.loadingService.desativarLoading();
        if (error.status === 401) {
          this.errorMessage = 'Nome de usuário ou senha incorretos.';
        } else if (error.status === 500) {
          this.errorMessage = 'Ocorreu um erro interno no servidor.';
        } else {
          this.errorMessage = 'Erro de login desconhecido. Por favor, tente novamente mais tarde.';
        }
        // Lidar com erros de login, exibir mensagens de erro, etc.

        this.messageService.add({severity:'error', summary:this.errorMessage});

        console.error(this.errorMessage)
      }
    );
  }
}
