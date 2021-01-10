import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import {IProduct} from './product';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @Input() isSignedIn:boolean;
  email=localStorage.getItem('user');
  public products=[];
  public total:string;
  public cartItems=localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
  constructor(public firebaseService:FirebaseService,private router:Router) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute=()=>{
      return false;
    }
    if (localStorage.getItem('user')!==null)
      this.isSignedIn=true;
    else
      this.isSignedIn=false;
    this.firebaseService.getProducts().subscribe(data=>
      this.products=data);
    this.total=this.formatCurrency(this.cartItems.reduce((a,b)=> a + b.price * b.count,0))
  }
  logout(){
    this.firebaseService.logout();
    this.router.navigate(['/signin']);
    
  }

  refresh(){
    this.router.navigateByUrl("/main");
  }
  formatCurrency(num) {
    return "$" + Number(num.toFixed(1)).toLocaleString() + " ";
  }

  addToCart(product){
    let inCart=false;
    this.cartItems.forEach(item=>
      {if (product._id===item._id){
        product.count=parseInt(product.count)+1;
        inCart=true;
        console.log(product.count);
      }})
      if (!inCart){
        product.count=1;
      this.cartItems.push(product);
      }
      console.log(product._id);
      localStorage.setItem('items',JSON.stringify(this.cartItems));
      this.total=this.formatCurrency(this.cartItems.reduce((a,b)=> a + b.price * b.count,0))
  }
  proceed(){
    alert('Thank you for shopping'+ localStorage.getItem("user"));
  }
  removeAll(){
    this.cartItems=[];
    localStorage.removeItem('items');
    this.total=this.formatCurrency(this.cartItems.reduce((a,b)=> a + b.price * b.count,0))
  }
  
}
