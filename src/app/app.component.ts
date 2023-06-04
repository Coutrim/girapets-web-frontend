import { ChangeDetectorRef, Component } from '@angular/core';
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
  isActive:boolean = false;
  ngOnInit(){
    this.loadingService.active.subscribe(isActive=>{
      this.isActive = isActive;
      this.cdref.detectChanges();
    })
  }
}
