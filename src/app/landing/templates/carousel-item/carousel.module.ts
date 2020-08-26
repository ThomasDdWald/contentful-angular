import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarouselComponent, CarouselItemDirective} from './carousel';

@NgModule({
  exports: [
    CarouselComponent,
    CarouselItemDirective
  ],
  declarations: [
    CarouselComponent,
    CarouselItemDirective
  ],
  providers: [],
  imports: [CommonModule]
})
export class CarouselModule { }
