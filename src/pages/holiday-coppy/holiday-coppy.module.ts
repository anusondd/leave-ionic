import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HolidayCoppyPage } from './holiday-coppy';
import { PanelModule, DataTableModule, SharedModule, CalendarModule, ButtonModule, InputTextModule, InputTextareaModule, GrowlModule, ConfirmDialogModule, AutoCompleteModule, InputSwitchModule, DropdownModule, TreeModule, DialogModule, SplitButtonModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ButtonControlModule } from '../../commons/button-control/button-control.module';
import { AutoCompleteDropdownModule } from '../../commons/auto-complete-dropdown/auto-complete-dropdown.module';
import { RadioButtonModule } from 'primeng/components/radiobutton/radiobutton';

@NgModule({
  declarations: [
    HolidayCoppyPage,
  ],
  imports: [
    IonicPageModule.forChild(HolidayCoppyPage),
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
})
export class HolidayCoppyPageModule {}
