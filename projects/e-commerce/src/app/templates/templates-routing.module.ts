import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderSubmitComponent } from './components/order-submit/order-submit.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: 'order-list',
    component: OrderListComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'check-out',
    component: OrderSubmitComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule { }
