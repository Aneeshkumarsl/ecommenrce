import { Component, OnInit } from '@angular/core';
import { ApiService } from 'projects/e-commerce/src/app/sharedServices/apiService';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orderTrack: boolean = false;
  orderDetails : any = [];
  trackOrder = []
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadOrderDetails()
  }
 
  orderList: Array<any> = [
    {
      image: 'dryfruits1.jpeg',
      name: 'dry fruits',
      price: '100.00',
      quantity: 3,
      total: 300.0,
    },
    {
      image: 'dryfruits1.jpeg',
      name: 'dry fruits1',
      price: '100.00',
      quantity: 3,
      total: 300.0,
    },
    {
      image: 'dryfruits1.jpeg',
      name: 'dry fruits2',
      price: '100.00',
      quantity: 3,
      total: 300.0,
    },
  ];

  loadOrderDetails() {
    let email = sessionStorage.getItem('email') || '';
    if (email) {
      this.apiService.get('/', 'order', {emailID : email}).subscribe((res: any) => {
        if (res.response.status == 'success') {
          this.orderDetails = res.response.data.list;
        }
      });
    }
  }

  loadOrderTrack(order:any){
    this.trackOrder = order.trackDetails
    this.orderTrack = true  
  }

  public closeOrederTrack(data:boolean):void {
    this.orderTrack = data
  }
}
