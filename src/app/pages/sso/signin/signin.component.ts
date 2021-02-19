import { Component, OnInit } from '@angular/core';
import { faFacebook,faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  fbIcon=faFacebook;
  googleIcon=faGoogle;
  loginForm: FormGroup;
  signInError:boolean=false;
  signInErrMsg:string='';
  
  constructor(private _snackBar: MatSnackBar,private router:Router,public authService:AuthService) { 
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
    this.signInError=true;
    this.signInErrMsg='';
    // if (this.authService.isLoggedIn) {
    //   this.router.navigate(['dashboard'])
    // }

  }

  ngOnInit(): void {
    // if (this.authService.isLoggedIn) {
    //   this.router.navigate(['dashboard'])
    // }
    this.signInError=true;
    this.signInErrMsg='';
  }

  onSubmit(){
    this.signInError=true;
    this.signInErrMsg='';
    // this.authService.SignUp(this.loginForm.controls.email.value,this.loginForm.controls.password.value);
    this.authService.SignIn(this.loginForm.controls.email.value,this.loginForm.controls.password.value)
    .then(res => {
      

      this.signInError=true;
      if(res!==undefined && res.message!==undefined)
      this.signInErrMsg=res.message;
      else
      this.signInErrMsg="invalid login details";

    });
  }


  showError(error:string)
  {
    this.openSnackBar(error,'');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  
  googleSignin()
  {
    this.authService.googleSignin();
   
  }

  facebookSignin()
  {
    this.authService.facebookSignin();
  }
  

}
