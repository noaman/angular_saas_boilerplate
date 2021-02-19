import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService,private router:Router){

  }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   
    console.log("In can activate got true here");
    if(this.auth.isRegisteredButEmailNotVerified()===true)  
    {
      this.router.navigate(['verifyemail']);
    
    }
    else
    if(this.auth.isLoggedIn() !== true) {
      this.router.navigate(['signin'])
      console.log("In can activate got true");
    }
    return true;
   
  }
  
}
