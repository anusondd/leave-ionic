import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveTypePage } from './leave-type';
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
import { CalendarModule } from "primeng/components/calendar/calendar";
import { CheckboxModule } from "primeng/components/checkbox/checkbox";
import { LeaveTypeProvider } from "../../providers/leave-type/leave-type";

@NgModule({
  declarations: [
    LeaveTypePage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveTypePage),
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
    CalendarModule,
    CheckboxModule
  ],
  providers: [LeaveTypeProvider]
})
export class LeaveTypePageModule { }
