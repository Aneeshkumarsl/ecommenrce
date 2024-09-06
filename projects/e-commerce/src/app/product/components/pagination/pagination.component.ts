import { Component, Input, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() valueNumber: any;
  @Input() totalCount:any;
  @Input() pages:any;
  @Input() pageNumber:any
  @Output() previousFun = new EventEmitter<any>()
  @Output() setPageFun = new EventEmitter<any>()
  @Output() nextFun = new EventEmitter<any>()




  constructor() { }

  ngOnInit(): void {
  }

  previous() {
    if (this.pageNumber !== 0) {
      this.pageNumber--;
      this.previousFun.emit(this.pageNumber);
    }
  }
  setPage(pageNo: number) {
    this.pageNumber = pageNo;
     this.setPageFun.emit(pageNo);
      }

  next() {
    if (this.pageNumber < this.pages.length - 1) {
      this.pageNumber++
      this.nextFun.emit(this.pageNumber);
    }
  }

}
