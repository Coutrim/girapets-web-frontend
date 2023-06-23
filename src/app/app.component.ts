import { ChangeDetectorRef, Component, ElementRef, HostListener } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LoadingService } from './shared/components/loading-service.service';
import { AuthService } from './shared/services/auth.service';
import { EmitirCarregamentosService } from './shared/services/emitirCarregamentos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  title = 'girapets-web';



  constructor(private loadingService:LoadingService,private cdref: ChangeDetectorRef, private authService: AuthService,
    private elementRef: ElementRef, private emitirRecarregamentoService: EmitirCarregamentosService){
  }

  items: MenuItem[];
  isActive:boolean = false;
  displaySideBar: boolean;

  usuarioLogado : any;


  ngOnInit(){

    this.recuperarUsuario()
    this.emitirRecarregamentoService.emitirRecarregamentoNomeUsuario.subscribe(res=>{
      this.recuperarUsuario()
    })

    this.loadingService.active.subscribe(isActive=>{
      this.isActive = isActive;
      this.cdref.detectChanges();
    })


    this.items = [
      {label: 'Update', icon: 'pi pi-refresh', command: () => {

      }},
      {label: 'Delete', icon: 'pi pi-times', command: () => {

      }},
      {label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io'},
      {separator: true},
      {label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup']}
  ];
  }

  isLoggedIn() {

    return this.authService.isLoggedIn();
  }

  recuperarUsuario(){
    this.usuarioLogado = this.authService.getUsuario();
  }

  logout(){
    this.isDropdownOpen = false;
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
}


