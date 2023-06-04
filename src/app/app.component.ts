import { Component } from '@angular/core';
import { LoadingService } from './shared/components/loading-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  title = 'girapets-web';

  constructor(private loadingService:LoadingService){
  }
  isActive:boolean = false;
  ngOnInit(){
    this.loadingService.active.subscribe(isActive=>{
      this.isActive = isActive;
    })
  }
}
