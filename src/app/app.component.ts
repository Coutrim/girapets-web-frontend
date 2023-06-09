import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LoadingService } from './shared/components/loading-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  title = 'girapets-web';

  constructor(private loadingService:LoadingService,private cdref: ChangeDetectorRef){
  }

  items: MenuItem[];
  isActive:boolean = false;
  displaySideBar: boolean;




  ngOnInit(){



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

  exibirToastMenor = false;
  exibirToastMaior = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const larguraTela = window.innerWidth;
    this.exibirToastMenor = larguraTela < 975;
    // this.exibirToastMaior = larguraTela > 975 && larguraTela < 4000;
  }



}


