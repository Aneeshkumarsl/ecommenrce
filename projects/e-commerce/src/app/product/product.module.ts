import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductContainerComponent } from './components/product-container/product-container.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { ProductListViewComponent } from './components/product-list-view/product-list-view.component';
import { ProductSmallGridComponent } from './components/product-small-grid/product-small-grid.component';
import { ProductLargeGridComponent } from './components/product-large-grid/product-large-grid.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { PaginationComponent } from './components/pagination/pagination.component';


@NgModule({
  declarations: [ProductContainerComponent, ProductFilterComponent, ProductListViewComponent, ProductSmallGridComponent, ProductLargeGridComponent, PaginationComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedComponentsModule,
    NgxSliderModule
  ]
})
export class ProductModule { }
