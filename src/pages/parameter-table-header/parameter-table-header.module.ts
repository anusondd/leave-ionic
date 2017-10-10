import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParameterTableHeaderPage } from './parameter-table-header';
import { ParameterTableHeaderProvider } from '../../providers/parameter-table-header/parameter-table-header';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GrowlModule } from 'primeng/components/growl/growl';
import { PanelModule } from 'primeng/components/panel/panel';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { ButtonModule } from 'primeng/components/button/button';
import { TabViewModule } from 'primeng/components/tabview/tabview';
import { CodeHighlighterModule } from 'primeng/components/codehighlighter/codehighlighter';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { SharedModule } from 'primeng/components/common/shared';

@NgModule({
  declarations: [
    ParameterTableHeaderPage,
  ],
  imports: [
    IonicPageModule.forChild(ParameterTableHeaderPage),
    FormsModule,
    ReactiveFormsModule,
    GrowlModule,
    PanelModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    TabViewModule,
    CodeHighlighterModule,
    DataTableModule,
    SharedModule
  ],
  providers:[ParameterTableHeaderProvider]
})
export class ParameterTableHeaderPageModule {}
