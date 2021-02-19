import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './pages/application/dashboard/dashboard.component';
import { Feature1Component } from './pages/feature1/feature1.component';
import { Feature2Component } from './pages/feature2/feature2.component';
import { Feature3Component } from './pages/feature3/feature3.component';
import { Feature4Component } from './pages/feature4/feature4.component';
import { HomeComponent } from './pages/home/home.component';
import { ForgotpasswordComponent } from './pages/sso/forgotpassword/forgotpassword.component';
import { SigninComponent } from './pages/sso/signin/signin.component';
import { SignupComponent } from './pages/sso/signup/signup.component';
import { VerifyemailComponent } from './pages/sso/verifyemail/verifyemail.component';
import { AuthGuard } from './auth.guard';
import { SignoutComponent } from './pages/sso/signout/signout.component';
import { CookiepolicyComponent } from './pages/cookiepolicy/cookiepolicy.component';
import { PrivacypolicyComponent } from './pages/privacypolicy/privacypolicy.component';
import { TocComponent } from './pages/toc/toc.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'feature1',component:Feature1Component},
  {path:'feature2',component:Feature2Component},
  {path:'feature3',component:Feature3Component},
  {path:'feature4',component:Feature4Component},
  {path:'tos',component:TocComponent},
  {path:'privacy',component:PrivacypolicyComponent},
  {path:'cookies',component:CookiepolicyComponent},

  {path:'about',component:AboutComponent},
  {path:'signup',component:SignupComponent},
  {path:'signin',component:SigninComponent},
  {path:'verifyemail',component:VerifyemailComponent},
  {path:'forgotpassword',component:ForgotpasswordComponent},
  {path:'signout',component:SignoutComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
