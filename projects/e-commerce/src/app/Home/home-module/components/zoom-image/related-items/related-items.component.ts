import { Component, Input, OnInit } from '@angular/core';
import { SwiperConfigInterface } from "ngx-swiper-wrapper";

@Component({
  selector: 'app-related-items',
  templateUrl: './related-items.component.html',
  styleUrls: ['./related-items.component.scss']
})
export class RelatedItemsComponent implements OnInit {

  @Input() items:any

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
  constructor() { }

  ngOnInit(): void {
  }

}
