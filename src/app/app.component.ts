import { Component } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  image="assets/images/image.jpg";
  isSignedIn=false;
  title = 'homework5';
  constructor(public firebaseService:FirebaseService){
    
  }
      ngOnInit(){
        if (localStorage.getItem('user')!==null)
        this.isSignedIn=true;
        else
        this.isSignedIn=false;
      }
}
