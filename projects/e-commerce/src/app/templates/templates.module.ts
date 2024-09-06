import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { TemplatesRoutingModule } from './templates-routing.module';
import { OrderListComponent } from './components/order-list/order-list.component';
import { ViewOrdersComponent } from './components/order-list/view-orders/view-orders.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FaqComponent } from './components/profile/faq/faq.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressComponent } from './components/profile/address/address.component';
import { OrderSubmitComponent } from './components/order-submit/order-submit.component';

@NgModule({
  declarations: [
    OrderListComponent,
    ViewOrdersComponent,
    ProfileComponent,
    FaqComponent,
    AddressComponent,
    OrderSubmitComponent,
  ],
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
})
export class TemplatesModule {}
