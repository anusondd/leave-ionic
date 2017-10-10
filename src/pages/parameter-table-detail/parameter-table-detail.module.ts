import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParameterTableDetailPage } from './parameter-table-detail';
import { PanelModule } from "primeng/components/panel/panel";
import { ButtonModule } from "primeng/components/button/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/components/inputtext/inputtext";
import { InputTextareaModule } from "primeng/components/inputtextarea/inputtextarea";
import { GrowlModule } from "primeng/components/growl/growl";
import { DataTableModule } from "primeng/components/datatable/datatable";
import { ConfirmDialogModule } from "primeng/components/confirmdialog/confirmdialog";
import { RadioButtonModule } from "primeng/components/radiobutton/radiobutton";
import { AutoCompleteModule } from "primeng/components/autocomplete/autocomplete";
import { InputSwitchModule } from "primeng/components/inputswitch/inputswitch";
import { AutoCompleteDropdownModule } from "../../commons/auto-complete-dropdown/auto-complete-dropdown.module";
import { ButtonControlModule } from "../../commons/button-control/button-control.module";
import { ParameterTableDetailProvider } from "../../providers/parameter-table-detail/parameter-table-detail";
import { ConfirmationService } from "primeng/components/common/confirmationservice";

@NgModule({
  declarations: [
    ParameterTableDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ParameterTableDetailPage),
    PanelModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    GrowlModule,
    DataTableModule,
    ConfirmDialogModule,
    RadioButtonModule,
    AutoCompleteModule,
    InputSwitchModule,
    AutoCompleteDropdownModule,
    ButtonControlModule
  ],
  providers:[ParameterTableDetailProvider,ConfirmationService]
})
export class ParameterTableDetailPageModule {}
