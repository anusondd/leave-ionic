import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LovContentPage } from './lov-content';
import { TableModule } from '../../commons/table/table.module';

@NgModule({
  declarations: [
    LovContentPage,
  ],
  imports: [
    IonicPageModule.forChild(LovContentPage),
    TableModule
  ]
})
export class LovContentPageModule {}
