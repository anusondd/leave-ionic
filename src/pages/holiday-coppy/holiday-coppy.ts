import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HolidayProvider } from '../../providers/holiday/holiday';
import { Holiday } from '../../models/Holiday';
import { CoppyHoliday } from '../../models/Coppy-holiday';

@IonicPage()
@Component({
  selector: 'page-holiday-coppy',
  templateUrl: 'holiday-coppy.html',
})
export class HolidayCoppyPage {

  holiday: Holiday[];
  selectedholiday: Holiday[];
  date:Date;
  

  coppyHolidayform: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private holidayProvider: HolidayProvider,
    public formBuilder: FormBuilder,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HolidayCoppyPage');
  }

  ngOnInit(){
    this.LoadAll();

    this.coppyHolidayform = this.formBuilder.group({
      'fromYear': new FormControl('2560',Validators.required),
      'toYear'  : new FormControl('2561',Validators.required)
    });

  }

  LoadAll() {
    this.holidayProvider.loadAll().then(result => {
      this.holiday = result;
      console.log(result);
    });    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit(value: CoppyHoliday){
    console.log(value);

  }

}
