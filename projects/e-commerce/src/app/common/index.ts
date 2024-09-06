import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponentComponent} from './layout-component/layout-component.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';



export const CONTAINERS = {
    LayoutComponentComponent
};
@NgModule({
  imports: [
      CommonModule,
      SharedComponentsModule,
  ],
  declarations: [],
  providers: []
})
export class ContainerModule {
}