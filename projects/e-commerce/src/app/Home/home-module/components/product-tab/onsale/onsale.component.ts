import { Component, OnInit, Input } from '@angular/core';
import { SharedCartService } from 'projects/e-commerce/src/app/sharedServices/cartDataService';
import { ToastService } from 'projects/e-commerce/src/app/sharedServices/toaster.services';
import { AuthService } from 'projects/e-commerce/src/app/sharedServices/auth.services';

@Component({
  selector: 'app-onsale',
  templateUrl: './onsale.component.html',
  styleUrls: ['./onsale.component.scss']
})
export class OnsaleComponent implements OnInit {

  @Input() productItem:any;
  @Input() config:any;
  public currentRate = 3.2;
  public showHidePopup:boolean = false;
  public productItems:any;

  constructor(private sharedCartService:SharedCartService,public toastService: ToastService, private auth:AuthService) { }

  ngOnInit(): void {
  }

  public addToCart(value: any) {
    this.sharedCartService.updateUserCart(value);
  }
  public addToWishList():void {
    this.toastService.show('Sucessfully Added to wish list', {  delay: 1000 });
  }

  imgView(val:any):void {
    this.productItems = val;
    this.showHidePopup = true;

  }
  closePoup(data:boolean) {
    this.showHidePopup = data;
  }
}
