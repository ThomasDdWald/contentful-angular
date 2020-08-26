import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';

@NgModule({
  exports: [
    ModalComponent
  ],
  declarations: [
    ModalComponent
  ],
  providers: [],
  imports: [
    CommonModule,
  ]
})

export class ModalModule { }
