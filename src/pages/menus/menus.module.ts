import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenusPage} from './menus';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelModule, ButtonModule, InputTextModule, InputTextareaModule, GrowlModule, DataTableModule, ConfirmDialogModule, RadioButtonModule, AutoCompleteModule, InputSwitchModule, DropdownModule, TreeModule, DialogModule } from 'primeng/primeng';
import { HttpModule } from '@angular/http';
import { MenuProvider } from '../../providers/menu/menu';
import { ButtonControlModule } from '../../commons/button-control/button-control.module';
import { FilterTableCode } from '../../commons/filter/filter-table-code';



@NgModule({
  declarations: [
    MenusPage,
    FilterTableCode,
  ],
  imports: [
    IonicPageModule.forChild(MenusPage),
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
  ],
  providers:[MenuProvider]
})
export class MenusPageModule {}
