import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LovIonPage } from './lov-ion';
import { ButtonModule } from 'primeng/components/button/button';

@NgModule({
  declarations: [
    LovIonPage,
  ],
  imports: [
    IonicPageModule.forChild(LovIonPage),


    ButtonModule,
  ],
  exports: [LovIonPage]
})
export class LovIonPageModule {}
