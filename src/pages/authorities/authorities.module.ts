import { AuthoritiesPage } from './authorities';
import { AuthoritiesProvider } from './../../providers/authorities/authorities';
import { SharedModule } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { CodeHighlighterModule } from 'primeng/components/codehighlighter/codehighlighter';
import { TabViewModule } from 'primeng/components/tabview/tabview';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { GrowlModule } from 'primeng/components/growl/growl';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/components/button/button';
import { PanelModule } from 'primeng/components/panel/panel';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InputSwitchModule } from 'primeng/components/inputswitch/inputswitch';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';

@NgModule({
  declarations: [
    AuthoritiesPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthoritiesPage),
    PanelModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    GrowlModule,
    InputTextModule,
    InputTextareaModule,
    TabViewModule,
    CodeHighlighterModule,
    DataTableModule,
    SharedModule,
    InputSwitchModule,
    DropdownModule
  ],
  providers:[AuthoritiesProvider]
})
export class AuthoritiesPageModule {}
