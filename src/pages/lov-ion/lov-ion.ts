import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { LOVOptions } from '../../commons/lov/LOVOptions';
import { FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the LovIonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'common-lov',
  templateUrl: 'lov-ion.html',
})
export class LovIonPage implements OnInit{
  lovOptions: LOVOptions<any>;
  @Output() onSelectTableRow = new EventEmitter();
  valueInputLOV:string = "";

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , private modalCtrl: ModalController) {
  }

  ngOnInit(): void {
    let formControl:FormControl = this.lovOptions.formControl == null?
    new FormControl('', Validators.required)    //if
  :this.lovOptions.formControl;                 //else

    this.lovOptions.formGroup.addControl(this.lovOptions.fieldFormGroup,formControl);
  }

  openModal(){
    let controlsObj = (this.lovOptions.formGroup.controls[this.lovOptions.fieldFormGroup] as FormControl);
    const modal = this.modalCtrl.create('LovContentPage',{ lovOptions: this.lovOptions });
    modal.present();  
    modal.onDidDismiss(data => {
      
      this.onSelectTableRow.emit(data);
      this.valueInputLOV = data != null?eval("data."+this.lovOptions.fieldLabel):data;
      let fieldValue = this.lovOptions.fieldValue!=null?
                  this.lovOptions.fieldValue
                  :data;

      controlsObj.markAsDirty();
      controlsObj.setValue(fieldValue);
    });
  }

  setDataLOV(data){
    if(data){

      let controlsObj = (this.lovOptions.formGroup.controls[this.lovOptions.fieldFormGroup] as FormControl);
      this.valueInputLOV = data != null?eval("data."+this.lovOptions.fieldLabel):data;
      let fieldValue = this.lovOptions.fieldValue!=null?
                  this.lovOptions.fieldValue
                  :data;

      controlsObj.markAsDirty();
      controlsObj.setValue(fieldValue);
    }
  }

}
