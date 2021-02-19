import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import {  MatToolbarModule } from '@angular/material/toolbar';
import {  MatMenuModule } from '@angular/material/menu';
import {  MatIconModule } from '@angular/material/icon';
import {  MatCardModule } from '@angular/material/card';
import {  MatDividerModule } from '@angular/material/divider';
import { NavbarComponent } from './components/global/navbar/navbar.component';
import { Feature1Component } from './pages/feature1/feature1.component';
import { Feature2Component } from './pages/feature2/feature2.component';
import { Feature3Component } from './pages/feature3/feature3.component';
import { Feature4Component } from './pages/feature4/feature4.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/sso/signup/signup.component';
import { VerifyemailComponent } from './pages/sso/verifyemail/verifyemail.component';
import { SigninComponent } from './pages/sso/signin/signin.component';
import { ForgotpasswordComponent } from './pages/sso/forgotpassword/forgotpassword.component';
import { FooterComponent } from './components/global/footer/footer.component';
import { AngularMaterialModule } from './materialmodules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './pages/application/dashboard/dashboard.component';

import { SignoutComponent } from './pages/sso/signout/signout.component';
import { TocComponent } from './pages/toc/toc.component';
import { PrivacypolicyComponent } from './pages/privacypolicy/privacypolicy.component';
import { CookiepolicyComponent } from './pages/cookiepolicy/cookiepolicy.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    Feature1Component,
    Feature2Component,
    Feature3Component,
    Feature4Component,
    AboutComponent,
    HomeComponent,
    SignupComponent,
    VerifyemailComponent,
    SigninComponent,
    ForgotpasswordComponent,
    FooterComponent,
    DashboardComponent,
    SignoutComponent,
    TocComponent,
    PrivacypolicyComponent,
    CookiepolicyComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatCardModule // ...
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
