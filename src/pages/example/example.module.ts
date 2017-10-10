import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExamplePage } from './example';
import { TableModule } from "../../commons/table/table.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/components/button/button";
import { TreeModule } from "primeng/components/tree/tree";
import { AutoCompleteDropdownModule } from "../../commons/auto-complete-dropdown/auto-complete-dropdown.module";
import { LovModule } from "../../commons/lov/lov.module";
import { ImageModule } from "../../commons/cropper-image/image.module";
import { ButtonControlModule } from "../../commons/button-control/button-control.module";
import { ExampleProvider } from './example-service';
import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';
import { LovIonPageModule } from '../lov-ion/lov-ion.module';

@NgModule({
  declarations: [
    ExamplePage,
  ],
  imports: [
    IonicPageModule.forChild(ExamplePage),
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    TreeModule,
    AutoCompleteModule,

    AutoCompleteDropdownModule,
    LovModule,
    ImageModule,
    ButtonControlModule,

    LovIonPageModule
  ],
  providers:[ExampleProvider]
})
export class ExamplePageModule {}
