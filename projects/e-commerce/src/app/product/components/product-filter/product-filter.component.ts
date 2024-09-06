import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnInit, OnChanges {
  public isMenuOpen: Array<any> = [true, true, true];
  @Output() filterProduct = new EventEmitter<any>();
  @ViewChildren('checkboxes') checkboxes!: QueryList<ElementRef<any>>;
  @Input() filterParams: any;

  options: Options = {
    floor: 0,
    ceil: 10000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min:</b>₹' + value;
        case LabelType.High:
          return '<b>Max:</b>₹' + value;
        default:
          return '₹' + value;
      }
    },
  };
  public filter: any = {
    section: [],
    subSection: [],
    likeSearch : "",
    offers: [],
    priceRange: {
      minVal: 0,
      maxVal: 10000,
    },
  };
  public filterItems: Array<any> = [];

  constructor() {}

  ngOnInit(): void {
    // console.log('filterParams', this.filterParams);
    // this.filter.section.push(this.filterParams.section)
    // this.filter.subSection.push(this.filterParams.subsection)
    // this.setFilterValue(this.filter);
  }

  ngOnChanges(changes: SimpleChanges) {
     console.log(changes);
    
    if(!this.filter.section.includes(changes.filterParams.currentValue.section)){
      this.filter.section.push(changes.filterParams.currentValue.section)
    }
    if(!this.filter.subSection.includes(changes.filterParams.currentValue.subsection)){
      this.filter.subSection.push(changes.filterParams.currentValue.subsection)
    }

    if(changes.filterParams.currentValue.likeSearch){
      this.filter.likeSearch = changes.filterParams.currentValue.likeSearch
    }

    // this.filter.subSection.push(changes.filterParams.currentValue.subsection)
    console.log(this.filter, 'this.filterParams');
    this.setFilterValue(this.filter);
  }
 
  setFilterValue(filter:any) {
  //  this.header = this.defaultHeader 
   let section = this.header.find(x => x.title == "Products").checkBox.find((y:any) => y.val == filter.section[filter.section.length -1 ])
   if(section){
    section.checked = true 

   }
   this.filterProduct.emit(this.filter);


  }

  public toggleAccordion(index: number): void {
    this.isMenuOpen[index] = !this.isMenuOpen[index];
  }

  public clearFilters(): void {
    this.filterItems = [];
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.filter.section = [];
    this.filter.subSection = [];
    this.filter.offers = [];
    this.filterProduct.emit(this.filter);
  }

  public priceClear(): void {
    this.filter.priceRange = {
      minVal: 0,
      maxVal: 10000,
    };

    this.filterProduct.emit(this.filter);
  }

  valueChange() {
    this.filterProduct.emit(this.filter);
  }

  onChange(val: any, checked: any, itemName: any) {
    if (checked.target.checked) {
      if (itemName === 'Products') {
        this.filter.section.push(val);
        this.filterItems.push(val);
      } else if (itemName === 'offers') {
        this.filter.offers.push(val);
        this.filterItems.push(val);
      }
    } else {
      if (itemName === 'Products') {
        this.filter.section = this.filter.section.filter(
          (res: any) => res !== val
        );
        this.filterItems = this.filterItems.filter((res: any) => res !== val);
      } else if (itemName === 'offers') {
        this.filter.offers = this.filter.offers.filter(
          (res: any) => res !== val
        );
        this.filterItems = this.filterItems.filter((res: any) => res !== val);
      }
    }
    this.filterProduct.emit(this.filter);
  }

  defaultHeader: Array<any> = [
    {
      title: 'Products',
      checkBox: [
        {
          val: 'Cashew',
          checked: false,
        },
        {
          val: 'Almond',
          checked: false,
        },
        {
          val: 'Mecadamia',
          checked: false,
        },
        {
          val: 'Pistachio',
          checked: false,
        },
        {
          val: 'Walnut',
          checked: false,
        },
      ],
    },
    {
      title: 'Price Range',
      val: 'subi',
    },
    {
      title: 'SPECIAL',
      checkBox: [
        {
          val: 'isFeatured',
          display: 'Featured Products',
        },
        {
          val: 'isOffer',
          display: 'Offer Products',
        },
        {
          val: 'isTopSelling',
          display: 'Top Selling',
        },
      ],
    },
  ];

  header = this.defaultHeader

}
