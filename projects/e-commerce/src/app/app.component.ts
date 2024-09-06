import { Component } from '@angular/core';
import { SharedCartService } from 'projects/e-commerce/src/app/sharedServices/cartDataService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'eCommerce';

  constructor(private sharedCartService: SharedCartService) {}

  // load cart data to application

  ngOnInit(): void {
    // let email = sessionStorage.getItem('email') || '';
    this.sharedCartService.loadUserCart();
  }
}
