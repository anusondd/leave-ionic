import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HolidayProvider } from '../../providers/holiday/holiday';
import { CommonFunctionComponent } from '../../commons/CommonFunctionComponent';
import { Message, LazyLoadEvent } from 'primeng/primeng';
import { Holiday } from '../../models/Holiday';



@IonicPage()
@Component({
  selector: 'page-holiday',
  templateUrl: 'holiday.html',
})
export class HolidayPage {

  commonFnComp: CommonFunctionComponent = new CommonFunctionComponent();
  holidayform: FormGroup;
  msgs: Message[] = [];
  isModify: boolean = false;
  btnLabel: string = "บันทึก";


  holiday: Holiday[];  
  totalRecords: number;
  selectedholiday: Holiday[];
  stacked: boolean;

  //set Button_control
  Button_Add: string;
  Button_Edit: string;
  Button_Remove: string;
  Button_Plint: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private holidayProvider: HolidayProvider,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HolidayPage');
  }

  ngOnInit() {

    //set Button_control
    this.Button_Add     = localStorage.getItem('Btnadd');
    this.Button_Edit    = localStorage.getItem('Btnedit');
    this.Button_Remove  = localStorage.getItem('Btnremove');

    this.holidayform = this.formBuilder.group({
      'holidayId': new FormControl(''),
      'holidayDate': new FormControl(),
      'referenceHoliday': new FormControl('',Validators.required),
      'description': new FormControl('', Validators.required),
      'activeFlag': new FormControl()
    });

  }

  loadLazy(event: LazyLoadEvent) {
    this.holidayProvider.loadlLazy(event).then(result => {
      this.holiday = result.listOfData;
      this.totalRecords = result.totalRecords;
    });

  }

  onReload() {
    this.holidayProvider.loadAll().then(result => {
      this.holiday = result;
      console.log(result);
    })

    this.ngOnInit();
  }

  onSubmit(value: Holiday) {
    console.log(value);
    this.msgs = [];
    this.holidayProvider.saveOrUpdate(value, this.isModify).then(result => {
      console.log(result);
      this.onResetForm();
      this.msgs.push(result);
      this.isModify = false;
      this.btnLabel = "Save";
      this.onReload();
    }),
      errors => {
        let error = errors.json();
        console.log(error);
        this.msgs.push(error);
        this.onReload();
      }
  }

  onResetForm() {
    this.holidayform.reset({});
  }

  onRemove() {
    let component: HolidayPage = this;
    this.commonFnComp.ConfirmDialog(component, this.alertCtrl,
      function () {
        component.holidayProvider.onRemove(component.selectedholiday)
          .then(
          result => {
            component.selectedholiday = [];
            component.msgs.push({ severity: 'success', summary: 'Success', detail: 'Successfully' });
            component.onReload();
          },
          errors => {
            let error = errors.json();
            component.msgs.push({ severity: 'error', summary: 'Error', detail: error.msg })
          }
          );
      },
      null
    );
  
  }

  select(holiday: Holiday) {
    console.log("Holiday", holiday);
    (<FormGroup>this.holidayform).reset(holiday, { onlySelf: true });

    this.isModify = true;
    this.btnLabel = "แก้ไข";

  }

  cancleUpdate() {
    this.onResetForm();
    this.isModify = false;
    this.btnLabel = "บันทึก";
  }

}
