import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable,of} from 'rxjs';
import { User } from '../models/user';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;


  constructor( private afAuth: AngularFireAuth,private afs: AngularFirestore,public router:Router,
    public ngZone: NgZone
    ) { 
      
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      })
  

  }
  

  setUserToLocaStorage(user:User)
  {
    this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(
          localStorage.getItem('user'));
  }

  // Sign up with email/password
  SignUp(email:string, password:string) {
    
    let resp:any;

    return this.afAuth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      this.SendVerificationMail();
      this.updateUserData(result.user);
        return {type:"success",error:"none"};
    }).catch((err) => {
      return {type:"error",error:err};
    });
    
  }

  async SendVerificationMail() {
    (await this.afAuth.currentUser).sendEmailVerification().then(() => {
       // this.router.navigate(['verifyemail']);
       return;
    });
  
}


  // Sign in with email/password
  SignIn(email:string, password:string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.setUserToLocaStorage(result.user);
      if(this.isLoggedIn()===true)
       this.router.navigate(['dashboard']);
    }).catch((err) => {
      return err;
    });
    
  }

  googleSignin() {
   
  let provider = new firebase.default.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  this.AuthLogin(provider);
  }

 
  AuthLogin(provider:any) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
     
          this.updateUserData(result.user);
         
            this.setUserToLocaStorage(result.user);
           if(this.isLoggedIn()===true)
            this.router.navigate(['dashboard']);
        })
        
    }).catch((error) => {
      window.alert(error)
    })
  }
  
  facebookSignin(){
    let provider = new firebase.default.auth.FacebookAuthProvider();

    this.AuthLogin(provider);
  }


  private updateUserData(user:User) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.email}`);
    const data = { 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName, 
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    } 
    return userRef.set(data, { merge: true })
  }

  public signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
       this.router.navigate(['signin']);
   
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail:string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then((result) => {
      return {type:"success",error:"none"};
    }).catch((err) => {
      console.log(err);
      return {type:"error",error:err};
    })
  }

  isLoggedIn(): boolean {
     
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null && user.emailVerified !== false) 
    {
   
      return true;
    }
  
    return false;
  }

  isRegisteredButEmailNotVerified(): boolean {
     
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null && user.emailVerified === false) 
    {
   
      return true;
    }
  
    return false;
  }




}
