import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange,MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{
  localStorage: any;

  mediaSub: Subscription = new Subscription;
  deviceType:String='lg';

  title = 'linksmaster';
  

  constructor(public mediaObserver:MediaObserver,public authService:AuthService)
  {
    console.log("CONS CALLED");
    
  }

  ngOnInit() {
    console.log("INITI");
    
    this.mediaSub = this.mediaObserver.media$.subscribe((res: MediaChange) => {

      //this.deviceXs = res.mqAlias === "xs" ? true : false;
      this.deviceType = res.mqAlias;

    })

    
  }

  isUserLoggedIn()
  {
    return this.authService.isLoggedIn();

  }
  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }

}
