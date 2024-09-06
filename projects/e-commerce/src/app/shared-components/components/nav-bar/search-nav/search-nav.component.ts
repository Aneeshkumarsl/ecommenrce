import { Component, OnInit } from '@angular/core';
import { SharedCartService } from 'projects/e-commerce/src/app/sharedServices/cartDataService';
import { Router } from '@angular/router';
import { AuthService } from 'projects/e-commerce/src/app/sharedServices/auth.services';
import { ToastService } from 'projects/e-commerce/src/app/sharedServices/toaster.services';

@Component({
  selector: 'app-search-nav',
  templateUrl: './search-nav.component.html',
  styleUrls: ['./search-nav.component.scss'],
})
export class SearchNavComponent implements OnInit {

  public userCart: any;
  public userInfo: any = {};
  constructor(
    private sharedCartService: SharedCartService,
    private router: Router,
    private auth:AuthService,
    private toastService: ToastService
  ) {
    this.sharedCartService.userCart.subscribe(
      (userCart: any) => (this.userCart = userCart)
    );
  }

  ngOnInit(): void {
    this.auth.userObjData.subscribe((userObj) => (this.userInfo = userObj));    
  }
  clearFromCart(id:string){
    this.sharedCartService.clearFromCart(id)
  }
  public goToOrders():void {
    this.router.navigate(['/pages/order-list']);
  }
  public logout() {
    this.auth.logout();
    this.auth.setUserObject({
      isLoggedIn: false,
      name: null,
      email:null
    });   
    this.toastService.show('Successfully logout', {delay: 1000 });
    this.router.navigate(['/home']);
  }
}


