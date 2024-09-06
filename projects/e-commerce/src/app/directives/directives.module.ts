import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { numberDirective} from './directives-item/number.directive'
 

@NgModule({
  declarations: [numberDirective],
  imports: [
    CommonModule
  ],
  exports:[numberDirective]
})
export class DirectivesModule { }
