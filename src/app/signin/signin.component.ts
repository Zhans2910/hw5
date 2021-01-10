import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  profile:FormGroup;
  submitted=false;
  @Input() isSignedIn:boolean;
  constructor(public firebaseService:FirebaseService,private router:Router, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.profile = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(6)]],
    });
    this.router.routeReuseStrategy.shouldReuseRoute=()=>{
      return false;}
    if (localStorage.getItem('user')!==null)
      this.isSignedIn=true;
      else
      this.isSignedIn=false;
    
  }
  async onSignIn(email:string,password:string){
    this.submitted=true;
    await this.firebaseService.signin(email,password);
    if (this.firebaseService.isLoggedIn)
    this.isSignedIn=true;
    this.submitted=true;
    this.router.navigateByUrl('/main');
    console.log(this.profile.get('password').errors);
  }
}
