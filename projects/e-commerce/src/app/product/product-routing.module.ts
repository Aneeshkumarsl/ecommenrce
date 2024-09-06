import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductContainerComponent } from './components/product-container/product-container.component';

const routes: Routes = [
  {
    path: 'list',
    component: ProductContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
