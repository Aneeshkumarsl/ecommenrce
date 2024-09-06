import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'projects/e-commerce/src/app/sharedServices/apiService';

@Component({
  selector: 'app-product-nav',
  templateUrl: './product-nav.component.html',
  styleUrls: ['./product-nav.component.scss']
})
export class ProductNavComponent implements OnInit {

  navItems:Array<any> = [];

  constructor(private apiSevice:ApiService,private router: Router) { }

  ngOnInit(): void {
    this.apiSevice.get("/","sections","").subscribe((res:any)=>
    {      
      if(res.response.status == "success"){
        this.navItems = res.response.data;
      }
    }
    )
  }
  public goToOrders():void {
    this.router.navigate(['/pages/order-list']);
  }
}
