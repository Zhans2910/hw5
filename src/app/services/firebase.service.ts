import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable } from 'rxjs';
import {AngularFireDatabase, AngularFireDatabaseModule} from '@angular/fire/database';
import {IProduct} from '../main/product';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  isLoggedIn=false;
  constructor(public firebaseAuth: AngularFireAuth, public db:AngularFireDatabase, private http:HttpClient ) { 
  }
  async signin(email:string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then(res=> {
      this.isLoggedIn=true;
      localStorage.setItem('user',JSON.stringify(email));

    })
  }
  async signup(email:string, password: string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then(res=> {
      this.isLoggedIn=true;
      localStorage.setItem('user',JSON.stringify(email));

    })
  }
  logout(){
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }
  getProducts():Observable<IProduct[]>{
    return this.http.get<IProduct[]>("/assets/data/data.json");
  }
}
