import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleRoutingModule } from './example-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule, TreeModule } from "primeng/primeng";
import { TableModule } from '../table/table.module';
import { AutoCompleteDropdownModule } from '../auto-complete-dropdown/auto-complete-dropdown.module';
import { LovModule } from '../lov/lov.module';
import { ImageModule } from '../cropper-image/image.module';
import { ButtonControlModule } from '../button-control/button-control.module';
import { ExampleComponent } from './example.component';

@NgModule({
  imports: [
    CommonModule,
    ExampleRoutingModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    TreeModule,

    AutoCompleteDropdownModule,
    LovModule,
    ImageModule,
    ButtonControlModule
  ],
  declarations: [ExampleComponent]
})
export class ExampleModule { }
