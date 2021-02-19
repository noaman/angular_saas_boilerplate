import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  passwordResetForm: FormGroup

  forgotPasswordError:boolean=false;
  forgotPasswordErrMsg:string='';
  forgotPasswordSuccess:boolean=false;
  constructor(public authService:AuthService,private _snackBar: MatSnackBar) {

    this.passwordResetForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email])
      }
    );

   }

  ngOnInit(): void {
    this.forgotPasswordError=false;
    this.forgotPasswordErrMsg='';
    this.forgotPasswordSuccess=false;
  }

  onSubmit(){
    this.forgotPasswordError=false;
    this.forgotPasswordErrMsg='';
    this.forgotPasswordSuccess=false;
    this.authService.ForgotPassword(this.passwordResetForm.controls.email.value)
    .then(res=>{
        //this.showMessage(res);
        if(res.type==="success")
        {
          this.forgotPasswordSuccess=true;
        }
        else
        if(res.type==="error")
        {
          this.forgotPasswordError=true;
          this.forgotPasswordErrMsg=res.error.message;
          
        }
    });
  }

  showMessage(error:string)
  {
    this.openSnackBar(error,'');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
