import { Component, OnInit } from '@angular/core';
import { SharedCartService } from 'projects/e-commerce/src/app/sharedServices/cartDataService';
import {Location} from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  itemCount:number = 1
  cartDetails : Array<any> = []
  totalAmount = 0
  isReady : boolean = false
  constructor(

    private sharedCartService: SharedCartService,
    private location:Location

  ) {

    let token = sessionStorage.getItem('email')
    if(!token){
      this.location.back();
    }

    this.sharedCartService.userCart.subscribe(
      (userCart: any) => {
        this.cartDetails = userCart
        this.isReady = true
      }
        
    );
   }

  ngOnInit(): void {
  }

  clearFromCart(id:string){
    this.sharedCartService.clearFromCart(id)
  }

  // increament(Item:any):void {
  //   this.itemCount =  Item + 1;   
  //  }
   
  //  decreament(Item:any):void {
  //    this.itemCount = Item - 1;
  //  }


}
