import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TableComponent } from '../../commons/table/table.component';
import { LOVOptions } from '../../commons/lov/LOVOptions';
import { FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the LovContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lov-content',
  templateUrl: 'lov-content.html',
})
export class LovContentPage implements OnInit{


  @ViewChild('tableLOVCommon') tableLOVCommon:TableComponent;
  lovOptions : LOVOptions<any>;
  
  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , public viewCtrl: ViewController
    
  ) {}
  
  ngOnInit(): void {

    this.lovOptions = (<LOVOptions<any>>this.navParams.get('lovOptions'));
    this.tableLOVCommon.tableOptions = this.lovOptions.tableOptions;
    let formControl : FormControl = this.lovOptions.formControl?
                                  new FormControl('', Validators.required)  //if
                                  :this.lovOptions.formControl;             //else

    this.lovOptions.formGroup.addControl(this.lovOptions.fieldFormGroup,formControl);

    if(this.lovOptions.tableOptions.lazyLoadEvents){
      this.tableLOVCommon.reloadDataTableLazy();
    }
  }//end init

  onRowSelect(data,{}){
    this.viewCtrl.dismiss(data);
  }

}
