import { Component, OnInit,ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap'
import { ApiService } from 'projects/e-commerce/src/app/sharedServices/apiService';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  images = [
   { image:"img10.jpg",
      offerSubject:"Huge Sale",
      offerVal:"Up to 70%"
    }, 
   { image:"img11.jpg",
   offerSubject:"Biggest Sale",
   offerVal:"Don't miss it"
  }, 
   { image:"img12.jpg",
   offerSubject:"Our Best Product",
   offerVal:"Special selection"
  }, 
    {image:"img13.jpg",
    offerSubject:"Massive Sale",
      offerVal:"Only for today"
    }, 
  //  { image:"img5.jpg",
  //  offerSubject:"Biggest Discount",
  //  offerVal:"Check the promotion"
  // },
  { image:"img7.jpg",
   offerSubject:"Biggest Discount",
   offerVal:"Check the promotion"
  }
  ];
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', { static: true }) carousel:any ;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  constructor(private apiSevice:ApiService) { }

  ngOnInit(): void {
    
  }

}
