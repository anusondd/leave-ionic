import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AutoCompleteDropdownComponent } from './auto-complete-dropdown.component';
import { ButtonModule } from 'primeng/components/button/button';
import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';


@NgModule({
  imports: [
    CommonModule,
    AutoCompleteModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AutoCompleteDropdownComponent],
  exports: [AutoCompleteDropdownComponent]
})
export class AutoCompleteDropdownModule { }
