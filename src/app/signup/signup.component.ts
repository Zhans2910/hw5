import { Component, OnInit,Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  profile:FormGroup;
  submitted=false;
  image="assets/images/image.jpg";
  @Input() isSignedIn:boolean;
  constructor(public firebaseService:FirebaseService, private router:Router, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.profile = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(6)]],
    });
    if (localStorage.getItem('user')!==null)
      this.isSignedIn=true;
      else
      this.isSignedIn=false;
  }
  async onSignUp(email:string,password:string){
    this.submitted=true;
    await this.firebaseService.signup(email,password);
    if (this.firebaseService.isLoggedIn)
    this.isSignedIn=true;
    this.router.navigateByUrl('/main');
  }
}
