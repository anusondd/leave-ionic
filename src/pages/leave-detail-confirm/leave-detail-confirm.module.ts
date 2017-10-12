import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveDetailConfirmPage } from './leave-detail-confirm';

@NgModule({
  declarations: [
    LeaveDetailConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveDetailConfirmPage),
  ],
})
export class LeaveDetailConfirmPageModule {}
