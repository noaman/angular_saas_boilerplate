import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { ResolveStart, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable,of} from 'rxjs';
import { User } from '../models/user';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { Roles } from "../models/roles";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  isUserLoggedIN:boolean;

  constructor( private afAuth: AngularFireAuth,private afs: AngularFirestore,public router:Router,
    public ngZone: NgZone
    ) { 
      this.isUserLoggedIN=false;

      console.log("IN CONSTRUCTORE");
      this.checkUserFromLocalStorage();
      // this.afAuth.authState.subscribe(user => {
      //   if (user) {
      //     this.userData = user;
      //     localStorage.setItem('user', JSON.stringify(this.userData));
      //     JSON.parse(localStorage.getItem('user'));
      //   } else {
      //     localStorage.setItem('user', null);
      //     JSON.parse(localStorage.getItem('user'));
      //   }
      // })
  

  }
  
  getCurrentUser()
  {
    return this.userData;
  }

  setUserToLocaStorage(user:any)
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
      this.updateUserData(result.user,false);
      this.SendVerificationMail();
      
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
    .then(async (result) => {
      console.log("in sign in");
      console.log(result.user);
       await this.updateUserData(result.user,true);
       this.isUserLoggedIN=true;
       console.log("Going to dashboard");
       this.router.navigate(['dashboard']);
    }).catch((err) => {
      console.log("error in signin in");
      console.log(err);
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
       this.ngZone.run(async () => {
          await this.updateUserData(result.user,true);
          this.isUserLoggedIN=true;
          console.log("Going to dashboard");
          this.router.navigate(['dashboard']);
        })
    }).catch((error) => {
      console.log("auth login error");
      console.log(error);
      window.alert(error)
    })
  }
  
  facebookSignin(){
    let provider = new firebase.default.auth.FacebookAuthProvider();

    this.AuthLogin(provider);
  }


  private  async updateUserData(user:User,addTostorage:boolean) {

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.email}`);

    const userDBRef:AngularFirestoreCollection=this.afs.collection('users');
    
    let number_docs=0;
    await this.afs.collection("users").valueChanges().subscribe(data=>{
      console.log("number of documents");
      number_docs=data.length;
      console.log(number_docs);
    });
    
    userRef.ref.get().then(data=>{
      let usrData:User=data.data();

      if(usrData===undefined)///when the user records does not exist on firebase
      {
        usrData= { 
          uid: user.uid, 
          email: user.email, 
          displayName: user.displayName, 
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          role:number_docs===0?Roles.SUPERADMIN:Roles.USER,
        } 
        userRef.set(usrData, { merge: true });//add the user data to firebase
      }
      else
      {
        usrData= { 
          uid: user.uid, 
          email: user.email, 
          displayName: user.displayName, 
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          role:number_docs===0?Roles.SUPERADMIN:Roles.USER,
        } 
        userRef.update(usrData);//add the user data to firebase
      }
      if(addTostorage){
        localStorage.removeItem('user');
        this.setUserToLocaStorage(usrData);
      }
      
    });

    return true;
  }


  public signOut() {
    return this.afAuth.signOut().then(async () => {
      await localStorage.removeItem('user');
      this.isUserLoggedIN=false;
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
  checkUserFromLocalStorage()
  {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user !== null && user.emailVerified !== false) 
    {
      this.userData = user;
      this.isUserLoggedIN=true;
    }
    
  }
  isLoggedIn(): boolean {
     
    // const user = JSON.parse(localStorage.getItem('user'));
    // console.log("user from json");
    // console.log(user);
    // if (user !== null && user.emailVerified !== false) 
    // {
    //   return true;
    // }
    // return false;
    return this.isUserLoggedIN;
  }

  isRegisteredButEmailNotVerified(): boolean {
     
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null && user.emailVerified === false) 
    {
   
      return true;
    }
  
    return false;
  }




  ///// Role-based Authorization //////

  




}
