import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveDetailPage } from './leave-detail';
import { PanelModule } from 'primeng/components/panel/panel';
import { ButtonModule } from 'primeng/components/button/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { GrowlModule } from 'primeng/components/growl/growl';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { RadioButtonModule } from 'primeng/components/radiobutton/radiobutton';
import { AutoCompleteDropdownModule } from '../../commons/auto-complete-dropdown/auto-complete-dropdown.module';
import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';
import { InputSwitchModule } from 'primeng/components/inputswitch/inputswitch';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { CheckboxModule } from 'primeng/components/checkbox/checkbox';
import { TabViewModule } from 'primeng/components/tabview/tabview';
import { LeaveDetailProvider } from '../../providers/leave-detail/leave-detail';
import { EmployeesProvider } from '../../providers/employees/employees';
import { ParameterTableDetailProvider } from '../../providers/parameter-table-detail/parameter-table-detail';

@NgModule({
  declarations: [
    LeaveDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveDetailPage),
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
    AutoCompleteDropdownModule,
    AutoCompleteModule,
    InputSwitchModule,
    CalendarModule,
    CheckboxModule,
    TabViewModule
  ],
  providers: [LeaveDetailProvider, EmployeesProvider, ParameterTableDetailProvider]
})
export class LeaveDetailPageModule {}
