import { Component, OnInit } from '@angular/core';
import { faFacebook,faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  fbIcon=faFacebook;
  googleIcon=faGoogle;
  registrationForm: FormGroup;
  signupSuccess:boolean=false;
  signupError:boolean=false;
  signupErrMsg:string='';

  constructor(private _snackBar: MatSnackBar,private authService:AuthService) {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      email_validation: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

   }

  ngOnInit(): void {
    this.signupSuccess=false;
    this.signupError=false;
    this.signupErrMsg='';
  }


  onSubmit(){
    this.signupSuccess=false;
    this.signupError=false;
    this.signupErrMsg='';
  
    if(this.registrationForm.controls.email_validation.value==="" || this.registrationForm.controls.email.value ==="")
    {
      this.showError("fields cannot be blank");
    }
    else
    if(this.registrationForm.controls.email_validation.value!==this.registrationForm.controls.email.value)
    {
      this.showError("Email ids do not match");
    }
    else
    if(this.registrationForm.controls.password.value==="" )
    {
      this.showError("password cannot be blank");
    }
    else{
      //this.showError("all ok");
      this.authService.SignUp(this.registrationForm.controls.email.value,this.registrationForm.controls.password.value).then(res=>{
        if(res.type==="success")
        {
          this.signupSuccess=true;
        }
        else
        if(res.type==="error"){
          this.signupError=true;
          this.signupErrMsg=res.error.message;
         
        }
        else
       {
          this.signupError=true;
          this.signupErrMsg="unknown error";
         
        }
      });
    }
  }

  showError(error:string)
  {
    
    this.openSnackBar(error,'');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
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
