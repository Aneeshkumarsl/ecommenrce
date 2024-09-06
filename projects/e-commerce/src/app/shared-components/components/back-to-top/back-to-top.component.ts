import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.scss']
})
export class BackToTopComponent implements OnInit {
  
  public showBackToTop = false;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event:any) {
      ($event.target.documentElement.scrollTop > 300) ? this.showBackToTop = true : this.showBackToTop = false;
  }

  public scrollToTop() {
    const scrollDuration = 900;
    const scrollStep = -window.pageYOffset / (scrollDuration / 20);
    const scrollInterval = setInterval(() => {
        if (window.pageYOffset !== 0) {
            window.scrollBy(0, scrollStep);
        } else {
            clearInterval(scrollInterval);
        }
    }, 10);
    if (window.innerWidth <= 768) {
        setTimeout(() => {
            window.scrollTo(0, 0);
        });
    }
}
}
