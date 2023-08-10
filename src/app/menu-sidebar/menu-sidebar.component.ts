import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit{

  constructor(private authService:AuthService,private router:Router){
    this.contato = [
      {
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
  }
  ngOnInit(): void {

  }
  contato: any[];

  display: boolean = false;

  @Input()
  displaySideBar: boolean = false;

  @Output()
  onClose:EventEmitter<any> = new EventEmitter();


  isLoggedIn() {
    return this.authService.isLoggedIn();
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



  showDialog() {
    this.display = true;
  }

  rolarProTopo() {
    this.router.navigate(['/home']);
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 1000);

  }


  emitirEventoFecharSidebar() {
    this.onClose.emit(false);
  }
}
