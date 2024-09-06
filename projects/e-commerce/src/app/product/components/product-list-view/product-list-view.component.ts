import { Component, Input, OnInit } from '@angular/core';
import { SharedCartService } from '../../../sharedServices/cartDataService';
import { ToastService } from '../../../sharedServices/toaster.services';

@Component({
  selector: 'app-product-list-view',
  templateUrl: './product-list-view.component.html',
  styleUrls: ['./product-list-view.component.scss']
})
export class ProductListViewComponent implements OnInit {

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
