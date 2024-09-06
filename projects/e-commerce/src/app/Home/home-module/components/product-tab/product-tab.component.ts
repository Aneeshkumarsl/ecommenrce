import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { productService } from 'projects/e-commerce/src/app/sharedServices/productService';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-product-tab',
  templateUrl: './product-tab.component.html',
  styleUrls: ['./product-tab.component.scss']
})
export class ProductTabComponent implements OnInit {
  productItems: Array<any> = [];
  public SWIPER_CONFIG: SwiperConfigInterface = {};
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective | undefined;
  
  constructor(private _prodcuctService: productService) { }

  ngOnInit(): void {
    this.featuredProducts('isFeatured')
  }

  featuredProducts(val: any): void {
    const params = new HttpParams().append(val, 'true');
    this._prodcuctService.getproductDetails(params).subscribe((res: any) => {
      if (res.response.status == 'success') {
        this.productItems = res.response.data.list.map((res: any) => {
          res['offer'] = Math.round((res.actualPrice / res.offerPrice) * 100 - 100);
          return res;
        }
        )
      }
    })
  }
  ngAfterViewInit() {
    this.SWIPER_CONFIG = {
      observer: false,
      direction: "horizontal",
      threshold: 50,
      slidesPerView: 5,
      keyboard: true,
      mousewheel: false,
      scrollbar: false,
      navigation: true,
      pagination: false,
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        540: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      }
    };
  }


}
