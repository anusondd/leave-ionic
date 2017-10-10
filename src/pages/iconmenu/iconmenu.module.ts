import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IconmenuPage } from './iconmenu';
import { MenusPage } from '../menus/menus';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IconmenuPage,
  ],
  imports: [
    IonicPageModule.forChild(IconmenuPage),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class IconmenuPageModule {}
