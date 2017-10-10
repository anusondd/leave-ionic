import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuAuthoritiesPage } from './menu-authorities';
import { ButtonModule, CheckboxModule, DataTableModule, TreeTableModule, GrowlModule, InputMaskModule, AutoCompleteModule, PanelModule, TreeModule, FieldsetModule } from 'primeng/primeng';
import { AutoCompleteDropdownModule } from '../../commons/auto-complete-dropdown/auto-complete-dropdown.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MenuAuthoritiesProvider } from '../../providers/menu-authorities/menu-authorities';
import { MenuAuthoritiesControlProvider } from '../../providers/menu-authorities-control/menu-authorities-control';

@NgModule({
  declarations: [
    MenuAuthoritiesPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuAuthoritiesPage),
    TreeModule,
    PanelModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    InputMaskModule,
    AutoCompleteDropdownModule,
    GrowlModule,
    TreeTableModule,
    DataTableModule,
    CheckboxModule,
    ButtonModule,
    FieldsetModule
  ],
  providers:[
    MenuAuthoritiesProvider,
    MenuAuthoritiesControlProvider
  ]
})
export class MenuAuthoritiesPageModule {}
