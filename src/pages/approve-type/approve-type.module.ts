import { LovIonPageModule } from './../lov-ion/lov-ion.module';
import { DataTableModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/components/panel/panel';
import { SharedModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { GrowlModule } from 'primeng/components/growl/growl';
import { AutoCompleteDropdownModule } from './../../commons/auto-complete-dropdown/auto-complete-dropdown.module';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/components/button/button';
import { ApproveTypeProvider } from './../../providers/approve-type/approve-type';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApproveTypePage } from './approve-type';
   
@NgModule({
  declarations: [
    ApproveTypePage,
  ],
  imports: [
    IonicPageModule.forChild(ApproveTypePage),
    ButtonModule,

    FormsModule,
    DropdownModule,
    AutoCompleteDropdownModule,
    GrowlModule,
    ReactiveFormsModule,
    InputTextModule,
    SharedModule,
    PanelModule,
    DataTableModule,
    LovIonPageModule
  ],
  providers: [ApproveTypeProvider]
})
export class ApproveTypePageModule {}
