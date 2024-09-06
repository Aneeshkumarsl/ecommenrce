import { Component, Input, OnInit, Output, SimpleChanges,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss'],
})
export class ViewOrdersComponent implements OnInit {
  @Input() trackOrder: any;
  @Output() closeTrack = new EventEmitter<boolean>();
  orderDetails : any = [];
  constructor() {}

  val=[
    {
      status: "Order Placed"
    },
    {
      status: "Order Shipping"
    },
    {
      status: "Order Delivering will soon"
    }
  ]
  ngOnInit(): void {
    console.log(this.trackOrder, 'trackOrdertrackOrder');
  }
  ngOnChanges(changes: SimpleChanges) {
    this.orderDetails = changes.trackOrder.currentValue;
    this.orderDetails = this.orderDetails.map((el:any, i:any) => el === null ? this.val[i] : el);
    this.orderDetails.push(...this.val.slice(this.orderDetails.length));    
  }

  public trackClose(){
    this.closeTrack.emit(false)
  }
}
