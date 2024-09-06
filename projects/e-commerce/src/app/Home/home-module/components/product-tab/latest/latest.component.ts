import { Component, OnInit, Input } from '@angular/core';
import { SharedCartService } from 'projects/e-commerce/src/app/sharedServices/cartDataService';
import { ToastService } from 'projects/e-commerce/src/app/sharedServices/toaster.services';
import { AuthService } from 'projects/e-commerce/src/app/sharedServices/auth.services';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss'],
})
export class LatestComponent implements OnInit {
  @Input() productItem: any;
  @Input() config: any;
  public currentRate = 3.6;
  public showHidePopup: boolean = false;
  public productItems: any;
  // public userInfo: any = {};

  constructor(
    private sharedCartService: SharedCartService,
    public toastService: ToastService,
    // private auth: AuthService
  ) {}

  ngOnInit(): void {
    // this.auth.userObjData.subscribe((userObj) => (this.userInfo = userObj));
  }
  public addToCart(value: any) {
    this.sharedCartService.updateUserCart(value);
  }
  public addToWishList(): void {
    this.toastService.show('Successfully Added to wish list', { delay: 1000 });
  }

  imgView(val: any): void {
    this.productItems = val;
    this.showHidePopup = true;
  }
  closePoup(data: boolean) {
    this.showHidePopup = data;
  }
}
