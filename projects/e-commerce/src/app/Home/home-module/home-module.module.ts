import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModuleRoutingModule } from './home-module-routing.module';
import { CarouselComponent } from './components/carousel/carousel.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { InstuctionsComponent } from './components/instuctions/instuctions.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { ProductTabComponent } from './components/product-tab/product-tab.component';
import { FeaturedComponent } from './components/product-tab/featured/featured.component';
import { LatestComponent } from './components/product-tab/latest/latest.component';
import { OnsaleComponent } from './components/product-tab/onsale/onsale.component';
import { DealDayComponent } from './components/deal-day/deal-day.component';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';
import { ZoomImageComponent } from './components/zoom-image/zoom-image.component';
import { DescriptionComponent } from './components/zoom-image/description/description.component';
import { RelatedItemsComponent } from './components/zoom-image/related-items/related-items.component';
import { BannerComponent } from './components/banner/banner.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

@NgModule({
  declarations: [CarouselComponent, InstuctionsComponent, ProductTabComponent, FeaturedComponent, LatestComponent, OnsaleComponent, DealDayComponent, ZoomImageComponent, DescriptionComponent, RelatedItemsComponent, BannerComponent, CheckoutComponent],
  imports: [
    CommonModule,
    HomeModuleRoutingModule,
    NgbModule,
    SwiperModule,
    SharedComponentsModule
  ],
  exports:[]
})
export class HomeModuleModule { }
