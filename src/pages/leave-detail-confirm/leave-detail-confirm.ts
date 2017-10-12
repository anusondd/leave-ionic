import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LeaveDetail } from '../../models/leave-detail';

/**
 * Generated class for the LeaveDetailConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leave-detail-confirm',
  templateUrl: 'leave-detail-confirm.html',
})
export class LeaveDetailConfirmPage {
  leaveDetailData: LeaveDetail;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveDetailConfirmPage');
  }

  ionViewWillLoad() {
    this.leaveDetailData = this.navParams.get('data');
    console.log("=========================================");

    console.log(this.leaveDetailData);

  }

}
