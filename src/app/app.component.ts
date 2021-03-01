import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange,MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router,NavigationStart, Event as NavigationEvent } from '@angular/router';
  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{
  localStorage: any;

  mediaSub: Subscription = new Subscription;
  deviceType:String='lg';
  currentRoute: string;

  title = 'linksmaster';
  
  event$ ;

  constructor(public mediaObserver:MediaObserver,public authService:AuthService,private router: Router)
  {
    
    this.event$
      =this.router.events
          .subscribe(
            (event: NavigationEvent) => {
              if(event instanceof NavigationStart) {
                this.currentRoute=event.url;
              }
            });
  }

  ngOnInit() {
    
    
    this.mediaSub = this.mediaObserver.media$.subscribe((res: MediaChange) => {

      //this.deviceXs = res.mqAlias === "xs" ? true : false;
      this.deviceType = res.mqAlias;

    })

    
  }

  isFooterShown():boolean
  {
    //if (this.currentRoute==="/signup" || this.currentRoute==="/signin" || this.currentRoute==="/signout" || this.isUserLoggedIn()===true)
    if (this.isUserLoggedIn()===true)
    {
      return false;
    }
    return true;
  }


  isHeaderShown()
  {

  }

  isUserLoggedIn()
  {
    return this.authService.isLoggedIn();

  }
  ngOnDestroy() {
    this.mediaSub.unsubscribe();
    this.event$.unsubscribe();
  }

}
