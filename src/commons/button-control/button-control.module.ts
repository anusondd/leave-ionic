import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from "primeng/components/button/button";
import { ButtonControlComponent } from './button-control.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule
  ],
  declarations: [ButtonControlComponent],
  exports: [ButtonControlComponent]
})
export class ButtonControlModule { }
