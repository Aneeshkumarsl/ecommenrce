import { Component, Input, OnInit } from '@angular/core';
import { SharedCartService } from 'projects/e-commerce/src/app/sharedServices/cartDataService';
import { ToastService } from 'projects/e-commerce/src/app/sharedServices/toaster.services';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss'],
})
export class FeaturedComponent implements OnInit {
  public currentRate = 3.6;
  @Input() config: any;
  @Input() productItem: any;
  public productItems: any;
  public showHidePopup: boolean = false;

  constructor(
    private sharedCartService: SharedCartService,
    public toastService: ToastService
  ) {}

  ngOnInit(): void {}

  public imgView(val: any): void {
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
