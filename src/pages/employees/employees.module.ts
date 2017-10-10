import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployeesPage } from './employees';
import { PanelModule, InputMaskModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/components/button/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GrowlModule } from 'primeng/components/growl/growl';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { CodeHighlighterModule } from 'primeng/components/codehighlighter/codehighlighter';
import { SplitButtonModule } from 'primeng/components/splitbutton/splitbutton';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { SharedModule } from 'primeng/components/common/shared';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { RadioButtonModule } from 'primeng/components/radiobutton/radiobutton';
import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';
import { InputSwitchModule } from 'primeng/components/inputswitch/inputswitch';
import { AutoCompleteDropdownModule } from '../../commons/auto-complete-dropdown/auto-complete-dropdown.module';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { TabViewModule } from 'primeng/components/tabview/tabview';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { EmployeesProvider } from '../../providers/employees/employees';

@NgModule({
  declarations: [
    EmployeesPage,
  ],
  imports: [
    IonicPageModule.forChild(EmployeesPage),
    PanelModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    GrowlModule,
    InputTextModule,
    InputTextareaModule,
    CodeHighlighterModule,
    SplitButtonModule,
    DataTableModule,
    SharedModule,
    ConfirmDialogModule,
    RadioButtonModule,
    AutoCompleteModule,
    InputSwitchModule,
    AutoCompleteDropdownModule,
    CalendarModule,
    DropdownModule,
    TabViewModule,
    InputMaskModule
  ],
  providers:[EmployeesProvider],
  exports:[EmployeesPage]
})
export class EmployeesPageModule { }
