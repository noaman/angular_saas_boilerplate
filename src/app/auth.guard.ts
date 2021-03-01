import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

import { tap, map, take } from 'rxjs/operators';
import { Roles } from './models/roles';
import { User } from './models/user';

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
  


   /**
   * Check if a user is authenticated
   * @param {string[]} allowedUserRoles - These user roles have the permissions to access the route.
   * @returns {Promise<boolean>} True if user is authenticated otherwise false
   */
  private checkPermission(allowedUserRoles: Roles[]): boolean {

    let usr:User = this.auth.getCurrentUser();
 

    return false;
  }
  
}
