import { Component, Input, OnInit } from '@angular/core';
import { SharedCartService } from '../../../sharedServices/cartDataService';
import { ToastService } from '../../../sharedServices/toaster.services';

@Component({
  selector: 'app-product-small-grid',
  templateUrl: './product-small-grid.component.html',
  styleUrls: ['./product-small-grid.component.scss']
})
export class ProductSmallGridComponent implements OnInit {

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

    public closePoup(data: boolean) {
      this.showHidePopup = data;
    }
  
    public addToCart(value: any) {
      this.sharedCartService.updateUserCart(value);
    }
    
    public addToWishList(): void {   
      this.toastService.show('Sucessfully Added to wish list');
    }
   
}
