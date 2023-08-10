import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener
} from '@angular/core';
import {
  Router
} from '@angular/router';
import jwt_decode from 'jwt-decode';
import {
  MenuItem,
  MessageService
} from 'primeng/api';
import {
  DialogService
} from 'primeng/dynamicdialog';
import {
  LoadingService
} from './shared/components/loading-service.service';
import {
  AuthService
} from './shared/services/auth.service';
import {
  EmitirCarregamentosService
} from './shared/services/emitirCarregamentos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  title = 'girapets-web';

  constructor(private loadingService: LoadingService, private cdref: ChangeDetectorRef, private authService: AuthService,
    private elementRef: ElementRef, private emitirRecarregamentoService: EmitirCarregamentosService,
    private router: Router, private messageService: MessageService, private dialogService: DialogService) {}

  items: MenuItem[];
  isActive: boolean = false;
  displaySideBar: boolean = false;
  links: any[];
  institucional: any[];
  contato: any[];

  usuarioLogado: any;
  display: boolean = false;

  showDialog() {
    this.display = true;
  }

  abrirLink(url: string) {
    this.router.navigateByUrl(url);
  }



  sobreOGiraPets() {
    this.router.navigate(['/home']);
    setTimeout(() => {
      window.scrollTo(0, 0)
      window.scrollBy({
        top: 560,
        behavior: 'smooth'
      });
    }, 1000);

  }

  rolarProTopo() {
    this.router.navigate(['/home']);
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 1000);

  }

  comoFuncionaScroll() {
    this.router.navigate(['/home']);
    setTimeout(() => {
      window.scrollTo(0, 0)
      window.scrollBy({
        top: 1560,
        behavior: 'smooth'
      });
    }, 1000);

  }

  abrirSideBar(){
    this.displaySideBar = true;
  }
  ngOnInit() {
    this.contato = [{
        label: 'Email',
        routerLink: '/login',
        icon: 'fas fa-envelope'
      },
      {
        label: 'Instagram',
        url: 'https://instagram.com/protetoresdogirassol_go?igshid=YmM0MjE2YWMzOA==',
        icon: 'fa-brands fa-square-instagram'
      },
      {
        label: 'WhatsApp',
        url: 'https://api.whatsapp.com/send?phone=556196983324',
        icon: 'fa-brands fa-square-whatsapp'
      }

    ];


    this.institucional = [{
        label: 'Sobre o Gira-Pets',
        command: () => this.sobreOGiraPets()
      },
      {
        label: 'Quero adotar',
        routerLink: '/quero-adotar'
      },
      {
        label: 'Quem somos',
        routerLink: '/login'
      },
      {
        label: 'Como ajudar',
        routerLink: '/login'
      },
      {
        label: 'Como funciona',
        command: () => this.comoFuncionaScroll()
      },
    ];

    this.links = [{
        label: 'Como ajudar?',
        routerLink: '/login'
      }

    ];


    this.recuperarUsuario()
    this.emitirRecarregamentoService.emitirRecarregamentoNomeUsuario.subscribe(res => {
      this.recuperarUsuario()
    })

    this.loadingService.active.subscribe(isActive => {
      this.isActive = isActive;
      this.cdref.detectChanges();
    })


    this.items = [{
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {

        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {

        }
      },
      {
        label: 'Angular.io',
        icon: 'pi pi-info',
        url: 'http://angular.io'
      },
      {
        separator: true
      },
      {
        label: 'Setup',
        icon: 'pi pi-cog',
        routerLink: ['/setup']
      }
    ];

    this.checkTokenExpiration(localStorage.getItem('token'))

    setInterval(() => {
      this.checkTokenExpiration(localStorage.getItem('token'))
    }, 2.5 * 60 * 1000);

  }

  checkTokenExpiration(token: string) {

    setInterval(() => {
      const decodedToken: any = jwt_decode(token);
      const expirationDate = new Date(decodedToken.exp * 1000); // Converter para milissegundos
      const currentDate = new Date();

      if (expirationDate < currentDate) {

        this.messageService.add({
          severity: 'error',
          summary: 'Sessão expirada. Faça login novamente!'
        });
        this.logout();
        this.router.navigate(['/login']);

      } else {

      }
      return expirationDate < currentDate;
    }, 2.5 * 60 * 1000);

  }


  isLoggedIn() {

    return this.authService.isLoggedIn();
  }

  recuperarUsuario() {
    this.usuarioLogado = this.authService.getUsuario();
  }

  logout() {
    this.isDropdownOpen = false;
    this.router.navigate(['/login']);
    return this.authService.logout();
  }

  exibirToastMenor = false;
  exibirToastMaior = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const larguraTela = window.innerWidth;
    this.exibirToastMenor = larguraTela < 975;
    // this.exibirToastMaior = larguraTela > 975 && larguraTela < 4000;
  }

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const dropdownElement = document.querySelector('.dropdown-content') as HTMLElement;
    const toggleButtonElement = document.querySelector('.dropdown button') as HTMLElement;

    if (dropdownElement && !dropdownElement.contains(clickedElement) && !toggleButtonElement.contains(clickedElement)) {
      this.isDropdownOpen = false;
    }
  }

  fecharSideBar(evento){
    this.displaySideBar = evento;
  }
}
