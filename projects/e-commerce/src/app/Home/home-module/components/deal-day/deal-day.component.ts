import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperConfigInterface } from "ngx-swiper-wrapper";
import { productService } from 'projects/e-commerce/src/app/sharedServices/productService';


@Component({
  selector: 'app-deal-day',
  templateUrl: './deal-day.component.html',
  styleUrls: ['./deal-day.component.scss']
})
export class DealDayComponent implements OnInit {
  dealDayItems:Array<any> = [];
  public ONSALE_SWIPER_CONFIG: SwiperConfigInterface = {
		observer: true,
		direction: "horizontal",
		threshold: 50,
		slidesPerView: 5,
		keyboard: true,
		mousewheel: false,
		scrollbar: false,
		navigation: true,
    pagination: false,
    breakpoints:{
      0:{
        slidesPerView: 3,
        spaceBetween: 5,
      },
      540: {
        slidesPerView: 4,
        spaceBetween: 5,
      },
      768: {
        slidesPerView: 5,
        spaceBetween: 5,
      },
      1024: {
        slidesPerView: 7,
        spaceBetween: 5,
      },
      1200: {
        slidesPerView: 8,
        spaceBetween: 5,
      },
   }
};

  constructor(private _prodcuctService:productService) { }

  ngOnInit(): void {
    this.getDetails();
  }
  getDetails(){
    this._prodcuctService.getproductDetails({isOffer:true}).subscribe((res:any)=>{
      if(res.response.status == 'success'){
        this.dealDayItems =  res.response.data.list.map((res:any) => {
          res['offer'] = Math.round(( res.actualPrice / res.offerPrice) * 100 - 100);  
          return res;  
        }       
        )
      }            
    })
  }
}
