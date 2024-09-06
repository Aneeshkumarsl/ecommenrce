import { Component, OnInit } from '@angular/core';
import { productService } from '../../../sharedServices/productService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.scss'],
})
export class ProductContainerComponent implements OnInit {
  public viewType = 'grid';
  public productItems: Array<any> = [];
  public valueNumber: number = 0;
  public pageLimit: number = 5;
  public pageNumber: number = 0;
  public pages: Array<number> = [];
  public totalCount: number = 0;
  public filterParams : any = {};
  public skip:number = 0;
  public filterData:any;

  constructor(
    private _prodcuctService: productService,
    private route: ActivatedRoute
  ) {
    this.route.queryParamMap.subscribe((params) => {
      var section = params.get('section');
      var subsection = params.get('subsection');
      var likeSearch = params.get('likeSearch');
      this.filterParams = {
        section: section,
        subsection : subsection,
        likeSearch : likeSearch
      }
      // this.productList(this.filterParams);
    });
  }

  ngOnInit(): void {
  
    
  }

  public changeViewType(viewType: any) {
    this.viewType = viewType;
  }

  public productList(filterData: any = {}): void {

    this.filterData = filterData;

    let params: any = {};

    if (filterData.section) {
      params.section = this.filterData.section.join(',');
    }
    if (filterData.subsection) {
      params.subsection = this.filterData.subsection.join(',');
    }
    if (filterData.offers) {
      params.offer = this.filterData.offers.join(',');
    }

    if (filterData.priceRange) {
      params.minPrice = this.filterData.priceRange.minVal;
      params.maxPrice = this.filterData.priceRange.maxVal;
    }
    if(filterData.likeSearch){
      params.likeSearch = this.filterData.likeSearch
    }

    if (this.pageLimit) {
      params.limit = this.pageLimit;
    }
      params.skip = this.skip;

    this._prodcuctService.getproductDetails(params).subscribe((res: any) => {
      if (res.response.status == 'success') {
        this.totalCount = res.response.data.totalCount;
        this.productItems = res.response.data.list.map((res: any) => {
          res['offer'] = Math.round(
            (res.actualPrice / res.offerPrice) * 100 - 100
          );
          return res;
        });
        this.pages = new Array(Math.ceil(this.totalCount / this.pageLimit));
        this.valueNumber = Math.min(
          (this.pageNumber + 1) * this.pageLimit,
          this.totalCount
        );
      }
    });
  };

  previous(data:any) {
      this.skip =  data  * this.pageLimit;
      this.productList(this.filterData);
  }
  setPage(pageNo:any) {
    this.skip = pageNo * this.pageLimit;
     this.productList(this.filterData );
      }
  next(data:any) {
      this.skip =  data  * this.pageLimit;
      this.productList(this.filterData );
  }
}
