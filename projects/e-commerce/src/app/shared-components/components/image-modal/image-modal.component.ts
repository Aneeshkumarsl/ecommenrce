import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { productService } from '../../../sharedServices/productService';
import { SharedCartService } from 'projects/e-commerce/src/app/sharedServices/cartDataService';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent implements OnInit {
  @Output() closePoup = new EventEmitter<boolean>();
  @Input() items: any;
  itemCount: number = 1;
  singleItemview: Array<any> = [];

  constructor(
    private router: Router,
    private _prodcuctService: productService,
    private sharedCartService: SharedCartService
  ) {}
  ngOnInit(): void {
    this._prodcuctService
      .getproductDetails({ id: this.items })
      .subscribe((res: any) => {
        if (res.response.status == 'success') {
          this.singleItemview = res.response.data.list.map((res: any) => {
            res['offer'] = Math.round(
              (res.actualPrice / res.offerPrice) * 100 - 100
            );
            return res;
          });
        }
      });
  }

  cancelBtnClick() {
    this.closePoup.emit(false);
  }

  increament(Item: any): void {
    this.itemCount = Item + 1;
  }

  decreament(Item: any): void {
    this.itemCount = Item - 1;
  }

  public imageDetailedView(data: any): void {
    this.router.navigate(['home/product/view', data]);
  }
  public addToCart(value: any) {
    this.sharedCartService.updateUserCart({
      _id : value._id,
      name : value.name,
      quantity : this.itemCount
    });
    // this.toastService.show('Sucessfully Added cart', {  delay: 1000 });
  }
}
