import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HolidayPage } from './holiday';
import { HolidayProvider } from '../../providers/holiday/holiday';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ButtonControlModule } from '../../commons/button-control/button-control.module';
import { PanelModule } from 'primeng/components/panel/panel';
import { ButtonModule, InputTextModule, InputTextareaModule, GrowlModule, DataTableModule, ConfirmDialogModule, RadioButtonModule, AutoCompleteModule, InputSwitchModule, DropdownModule, TreeModule, DialogModule, CalendarModule, SplitButtonModule } from 'primeng/primeng';
import { AutoCompleteDropdownModule } from '../../commons/auto-complete-dropdown/auto-complete-dropdown.module';

@NgModule({
  declarations: [
    HolidayPage,
  ],
  imports: [
    IonicPageModule.forChild(HolidayPage),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ButtonControlModule,

    PanelModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule, 
    GrowlModule,
    DataTableModule,  
    ConfirmDialogModule, 
    RadioButtonModule,
    AutoCompleteModule,
    InputSwitchModule,
    DropdownModule,
    TreeModule,
    DialogModule,
    CalendarModule,
    SplitButtonModule,
    AutoCompleteDropdownModule
  ],
  providers:[HolidayProvider]
})
export class HolidayPageModule {}
