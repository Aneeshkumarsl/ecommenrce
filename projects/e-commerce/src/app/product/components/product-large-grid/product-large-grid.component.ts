import { Component, Input, OnInit } from '@angular/core';
import { SharedCartService } from '../../../sharedServices/cartDataService';
import { ToastService } from '../../../sharedServices/toaster.services';

@Component({
  selector: 'app-product-large-grid',
  templateUrl: './product-large-grid.component.html',
  styleUrls: ['./product-large-grid.component.scss']
})
export class ProductLargeGridComponent implements OnInit {

  @Input() products:any;
  currentRate:number = 3.6;
  public productItems: Array<any> = [];
  public showHidePopup:boolean = false;

  constructor(
    private sharedCartService: SharedCartService,
    public toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  imgView(val:any):void {
    this.productItems = val;
    this.showHidePopup = true;
  
  }
  closePoup(data:boolean) {
    this.showHidePopup = data;
  }
  public addToCart(value: any) {
    this.sharedCartService.updateUserCart(value);
  }
  public addToWishList(): void {   
    this.toastService.show('Sucessfully Added to wish list');
  }

}
