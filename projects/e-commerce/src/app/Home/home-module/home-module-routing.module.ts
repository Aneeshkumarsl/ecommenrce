import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { InstuctionsComponent } from './components/instuctions/instuctions.component';
import { ZoomImageComponent } from './components/zoom-image/zoom-image.component';

const routes: Routes = [
  {
    path: '',
    component: CarouselComponent,
  },
  {
    path: 'product/view/:id',
    component: ZoomImageComponent,
  },
  {
    path: 'cart',
    component: CheckoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeModuleRoutingModule {}
