import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { MainComponent } from './main/main.component';
import {AngularFireModule } from '@angular/fire';
import {AngularFireDatabase, AngularFireDatabaseModule} from '@angular/fire/database';
import { FirebaseService } from './services/firebase.service';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBeX4TqKbPmmuO3JKGUfN3w1ZzxnrYyHuQ",
      authDomain: "authentication-angular-37dd6.firebaseapp.com",
      projectId: "authentication-angular-37dd6",
      storageBucket: "authentication-angular-37dd6.appspot.com",
      messagingSenderId: "971034098233",
      appId: "1:971034098233:web:f47323c25bbed673b36be8"
    }),
    AngularFireDatabaseModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
