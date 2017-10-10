import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LeaveTypeProvider } from "../../providers/leave-type/leave-type";
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { LeaveType } from "../../models/leave-type";
import { LazyLoadEvent } from "primeng/components/common/lazyloadevent";
import { CommonFunctionComponent } from "../../commons/CommonFunctionComponent";

/**
 * Generated class for the LeaveTypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leave-type',
  templateUrl: 'leave-type.html',
})
export class LeaveTypePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private leaveService: LeaveTypeProvider,
    private fb: FormBuilder,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveTypePage');
  }

  rows: Array<string> = Array();
  htmlText: string;
  msgs: any[];

  leaveObj: LeaveType[];
  totalRecords: number;
  leavetypeform: FormGroup;
  btnLabel: string = "Save";
  probationSelected: LeaveType[];
  isModify: boolean = false;
  counts = [];
  count = 1;
  workingPeriodArr = [];

  globalEvent: LazyLoadEvent;
  toggleEvent = [];

  minDate: Date;
  maxDate: Date;
  th: any;

  currentDate: Date;

  isDisable: boolean = true;
  selectedLeavetype: LeaveType[];
  commonFnComp: CommonFunctionComponent = new CommonFunctionComponent();


  ngOnInit() {

    this.currentDate = new Date();
    this.th = {
      firstDayOfWeek: 0,
      dayNames: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์"],
      dayNamesShort: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
      dayNamesMin: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
      monthNames: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
      monthNamesShort: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."]
    };

    this.leavetypeform = this.fb.group({
      'leaveTypeId': new FormControl(''),
      'leaveTypeName': new FormControl('', Validators.required),
      'probationFlag': new FormControl('', Validators.required),
      'countWorkingFlag': new FormControl(''),
      'holidayFlag': new FormControl(''),
      'effectiveDate': new FormControl('', Validators.required),
      'activeFlag': new FormControl(''),
      'leaveDay': new FormControl('', Validators.required),
      'leaveCondition': new FormControl('', Validators.required),
      workingPeriodTypes: this.fb.array([])

    });
    //console.log(this.workingPeriodTypes.length);
    //  this.addBtn=false;
    this.addWorkingPeriodType();
    //this.workingPeriodTypes.disable();
    //this.booleanChecked = true;
    this.toggleDisabled();
    //this.leavetypeform.controls['leaveDay'].disable();
  }

  get workingPeriodTypes() { return <FormArray>this.leavetypeform.get('workingPeriodTypes'); }


  loadLazyLeaveType(event: LazyLoadEvent) {
    this.globalEvent = event;
    this.leaveService.loadLazyLeaveType(event).then(result => {
      console.log(result);
      this.leaveObj = result.listOfData;
      this.totalRecords = result.totalRecords;
      this.leaveObj.forEach(element => {
        element.effectiveDate = element.effectiveDate ? new Date(element.effectiveDate) : null;
        element.effectiveDate = element.effectiveDate ? new Date(element.effectiveDate) : null;

      });

    })
  }

  onSubmit(value: LeaveType) {
    console.log(value);

    this.msgs = [];
    this.leaveService.saveOrUpdate(value, this.isModify)
      .then(
      result => {

        this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Successfully' });
        this.onResetForm();
        this.isModify = false;
        this.btnLabel = "Save";
        this.loadLazyLeaveType(this.globalEvent);
        this.toggleDisabled();
        // this.removeWorkingPeriodTypeAfterUpdate();
      },
      errors => {
        let error = errors.json();
        this.msgs.push({ severity: 'error', summary: 'Error', detail: error.msg })
      }
      );


  }

  addWorkingPeriodType() {
     
    this.workingPeriodTypes.push(this.fb.group({
      'workingPeriodTypeId': new FormControl(''),
      'workingPeriodYear': new FormControl('', Validators.required),
      'leaveDay': new FormControl('', Validators.required)
    }));

    this.toggleDisabled();
   
    console.log("value : ", this.leavetypeform.value);
    console.log("control: ", this.leavetypeform.controls);

    

  }

  /*   removeWorkingPeriodTypeAfterUpdate() {
      if (this.workingPeriodArr.length != 0) {
        this.leaveService.onRemoveWorkingType(this.workingPeriodArr).then(result => {
          this.workingPeriodArr = [];
        });
      }
      console.log("value : ",this.leavetypeform.value);
    console.log("control: ",this.leavetypeform.controls);
    } */

  selectLeaveType(value) {

    value.effectiveDate = value.effectiveDate ? new Date(value.effectiveDate) : null;
    this.leavetypeform.controls['workingPeriodTypes'] = this.fb.array([]);


    if (value.countWorkingFlag == true) {
      value.workingPeriodTypes.forEach(element => {
        this.addWorkingPeriodType();
      });
    } else {
      this.addWorkingPeriodType();
    }


    this.leavetypeform.reset(value);
    this.isModify = true;
    this.btnLabel = "Update";
    this.toggleDisabled();

  }


  removeWorkingPeriodType(i) {

    /*  if (this.isModify == true) {
       this.workingPeriodArr.push(this.workingPeriodTypes.at(i).value);
     } */

    /*  console.log("Value : ",this.leavetypeform.value);
     console.log("Control : ",this.leavetypeform.controls); */
    //console.log(this.workingPeriodArr);
    //console.log(i);
    this.workingPeriodTypes.removeAt(i);
    this.leavetypeform.updateValueAndValidity();
  }



  toggleDisabled() {

    if (this.leavetypeform.controls['countWorkingFlag'].value == true) {
      //this.workingPeriodTypes.enable();
      this.leavetypeform.controls['workingPeriodTypes'].enable();
      this.leavetypeform.controls['leaveDay'].disable();
      //console.log("true");
    } else {
      //this.workingPeriodTypes.disable();
      this.leavetypeform.controls['workingPeriodTypes'].disable();
      this.leavetypeform.controls['leaveDay'].enable();
      //console.log("false");
    }

  }

  onRemove() {
    let component :LeaveTypePage = this;
    this.commonFnComp.ConfirmDialog(component, this.alertCtrl,
      function () {
        component.leaveService.onRemoveLeaveType(component.selectedLeavetype)
          .then(
          result => {

            console.log(result);
            component.onResetForm();
            component.loadLazyLeaveType(component.globalEvent);
            component.selectedLeavetype = [];
            component.msgs.push({ severity: 'success', summary: 'Success', detail: 'Successfully' });

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

  onResetForm() {
    this.leavetypeform.reset({});
    this.leavetypeform.controls['workingPeriodTypes'] = this.fb.array([]);
    this.addWorkingPeriodType();
  }

  getLeaveDay(workingPeriodType): string {

    let periodType: string = '';
    workingPeriodType.forEach(element => {
      periodType += 'อายุงาน ' + element.workingPeriodYear + ' ปี ลาได้ ' + element.leaveDay + ' วัน\n';
    });
    return periodType;

  }

  cancleUpdate() {
    this.onResetForm();
    this.isModify = false;
    this.btnLabel = "Save";
    this.workingPeriodArr = [];
    this.leavetypeform.controls['workingPeriodTypes'] = this.fb.array([]);
    this.addWorkingPeriodType();
  }

}
