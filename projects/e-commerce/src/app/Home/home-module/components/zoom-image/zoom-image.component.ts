import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedCartService } from 'projects/e-commerce/src/app/sharedServices/cartDataService';
import { productService } from 'projects/e-commerce/src/app/sharedServices/productService';

@Component({
  selector: 'app-zoom-image',
  templateUrl: './zoom-image.component.html',
  styleUrls: ['./zoom-image.component.scss'],
})
export class ZoomImageComponent implements OnInit {
  @ViewChild('zoomViewer') zoomViewer: any;
  public zoomImage: any = '';
  itemCount: number = 1;
  idNo!: any;
  zoomItemView!: Array<any>;
  relatedItem!: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private _prodcuctService: productService,
    private sharedCartService: SharedCartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idNo = params.get('id');
    });
    this.getProductItems(this.idNo);
  }

  getProductItems(data: any): void {
    this._prodcuctService
      .getproductDetails({ id: data })
      .subscribe((res: any) => {
        if (res.response.status == 'success') {
          this.zoomItemView = res.response.data.list.map((res: any) => {
            res['offer'] = Math.round(
              (res.actualPrice / res.offerPrice) * 100 - 100
            );
            this.zoomImage = res.images[0];
            this.relatedItems(res.section);
            return res;
          });
        }
      });
  }

  public relatedItems(data: any): void {
    this._prodcuctService
      .getproductDetails({ section: data })
      .subscribe((res: any) => {
        if (res.response.status == 'success') {
          console.log(res, 'resssssssssss');
          this.relatedItem = res.response.data.list.map((res: any) => {
            res['offer'] = Math.round(
              (res.actualPrice / res.offerPrice) * 100 - 100
            );
            return res;
          });
        }
      });
  }

  public selectImage(image: any) {
    this.zoomImage = image;
  }

  public onMouseMove(e: any) {
    if (window.innerWidth >= 768) {
      let image, offsetX, offsetY, x, y, zoomer;
      image = e.currentTarget;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      x = (offsetX / image.offsetWidth) * 100;
      y = (offsetY / image.offsetHeight) * 100;
      if (this.zoomImage) {
        zoomer = this.zoomViewer.nativeElement.children[0];
      }
      if (zoomer) {
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
        zoomer.style.display = 'block';
        zoomer.style.height = image.height + 'px';
        zoomer.style.width = image.width + 'px';
      }
    }
  }

  public addToCart(value: any) {
    this.sharedCartService.updateUserCart({
      _id: value._id,
      name: value.name,
      quantity: this.itemCount,
    });
    // this.toastService.show('Sucessfully Added cart', {  delay: 1000 });
  }

  public onMouseLeave(event: any) {
    this.zoomViewer.nativeElement.children[0].style.display = 'none';
  }

  increament(Item: any): void {
    this.itemCount = Item + 1;
  }

  decreament(Item: any): void {
    this.itemCount = Item - 1;
  }
}
