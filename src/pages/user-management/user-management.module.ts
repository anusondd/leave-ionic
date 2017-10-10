import { EmployeesProvider } from './../../providers/employees/employees';
import { UserManagementProvider } from './../../providers/user-management/user-management';
import { AutoCompleteDropdownModule } from './../../commons/auto-complete-dropdown/auto-complete-dropdown.module';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { InputSwitchModule } from 'primeng/components/inputswitch/inputswitch';
import { SharedModule } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { TabViewModule } from 'primeng/components/tabview/tabview';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { GrowlModule } from 'primeng/components/growl/growl';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/components/button/button';
import { PanelModule } from 'primeng/components/panel/panel';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserManagementPage } from './user-management';
import { PasswordModule } from 'primeng/components/password/password';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { DialogModule } from 'primeng/components/dialog/dialog';

@NgModule({
  declarations: [
    UserManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(UserManagementPage),
    PanelModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    GrowlModule,
    InputTextModule,
    TabViewModule,
    DataTableModule,
    SharedModule,
    InputSwitchModule,
    PasswordModule,
    CalendarModule,
    DropdownModule,
    AutoCompleteDropdownModule,
    DialogModule
  ],
  providers:[UserManagementProvider,EmployeesProvider]
})
export class UserManagementPageModule {}
