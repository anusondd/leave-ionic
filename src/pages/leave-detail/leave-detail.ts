import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { Employees } from '../../models/Employees';
import { ParameterTableDetail } from '../../models/parameter-table-detail-model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LeaveDetail } from '../../models/leave-detail';
import { LeaveDetailProvider } from '../../providers/leave-detail/leave-detail';
import { EmployeesProvider } from '../../providers/employees/employees';
import { DropdownOptions } from '../../commons/auto-complete-dropdown/DropdownOptions';
import { CommonFunctionComponent } from '../../commons/CommonFunctionComponent';
import { LeaveType } from '../../models/leave-type';
import { ParameterTableDetailProvider } from '../../providers/parameter-table-detail/parameter-table-detail';
import { LazyLoadEventRequestWithObject } from '../../models/LazyLoadEventRequestWithObject';

/**
 * Generated class for the LeaveDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let common = new CommonFunctionComponent();
@IonicPage()
@Component({
  selector: 'page-leave-detail',
  templateUrl: 'leave-detail.html',
})
export class LeaveDetailPage {

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveDetailPage');
  }

  msgs: any[];
  totalRecords: any;
  leaveDetailObj: any;
  globalEvent: LazyLoadEvent;
  th: { firstDayOfWeek: number; dayNames: string[]; dayNamesShort: string[]; dayNamesMin: string[]; monthNames: string[]; monthNamesShort: string[]; };
  currentDate: Date;

  @ViewChild("autoCompleteDropdownLeavetype") autoCompleteDropdownLeavetype: any;
  @ViewChild("autoCompleteDropdownEmployee") autoCompleteDropdownEmployee: any;

  employeesObject: Employees;
  dateOfLeave: number;
  probation: any;
  statusA00: ParameterTableDetail;
  diffDate: string;
  leaveTypeCondition: any;
  leaveTypeObj: LeaveType;
  WorkingYear: number;
  minDate: Date;
  maxDate: Date;
  startLeaveDate: Date;
  endLeaveDate: Date
  date: Date;
  startLeaveDateString: string;
  endLeaveDateString: string
  leaveOneDay: boolean = null;
  leaveMoreDay: boolean = null;
  leavedetailform: FormGroup;

  selectionLeaveDetail: LeaveDetail[];

  constructor(public formBuilder: FormBuilder, public leaveDetailService: LeaveDetailProvider,
    public employeesService: EmployeesProvider, private alertCtrl: AlertController,
    private parameterTableDetailService: ParameterTableDetailProvider, public navCtrl: NavController,
    public navParams: NavParams) {

  }

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
    var that = this;

    this.leavedetailform = this.formBuilder.group({
      'leaveDetailId': new FormControl(''),
      'dateStart': new FormControl('', Validators.required),
      'dateEnd': new FormControl('', Validators.required),
      'timeStartFlag': new FormControl('', Validators.required),
      'timeEndFlag': new FormControl(''),
      'description': new FormControl('', Validators.required),
    });

    /*  this.employeesService.loadEmployee().then(result => {
       this.employeesObject = result[0];
       var startDate = new Date(this.employeesObject.employeeStartDate);
       if (this.employeesObject.employeeResignDate > this.currentDate) {
         var endDate = new Date();
       } else {
         var endDate = new Date(this.employeesObject.employeeResignDate);
       }
       this.diffDate = common.getDiffdate(startDate, endDate);
       this.WorkingYear = common.getDiffYear(startDate, endDate);
 
       this.leavedetailform.addControl("employee", new FormControl(''));
       this.leavedetailform.controls['employee'].setValue(this.employeesObject);
     }); */


    this.parameterTableDetailService.loadParameterTableDetail("A00").then(result => {
      this.statusA00 = result[0];
      this.leavedetailform.addControl("leaveStatus", new FormControl(''));
      this.leavedetailform.controls['leaveStatus'].setValue(this.statusA00);
    });



    this.autoCompleteDropdownLeavetype.dropdownOptions = new DropdownOptions<LeaveType>(
      "/api/dropdown/leavetype"
      , true
      , "leaveTypeName"
      , "ค้นหา 'ประเภทการลา'"
      , this.leavedetailform
      , "leaveType"
      , new FormControl('', Validators.required)
    ),
      this.autoCompleteDropdownEmployee.dropdownOptions = new DropdownOptions<Employees>(
        "/api/dropdown/allemp"
        , {}
        , "employeeCode"
        , "ค้นหา 'ค้นหาพนักงาน'"
        , this.leavedetailform
        , "employee"
        , new FormControl('')
      )
  }

  onSubmit(value: LeaveDetail) {
    this.msgs = [];

    this.leaveDetailService.saveLeaveDetail(this.leavedetailform.value)
      .then(
      result => {

        this.cancleUpdate();
        this.msgs.push(result);
        this.loadLeaveDetailLazy(this.globalEvent);
        this.loadLeaveDetailLazyEmployee(this.globalEvent);
      },
      errors => {
        let error = errors.json();
        this.msgs.push(error)
        this.loadLeaveDetailLazy(this.globalEvent);
        this.loadLeaveDetailLazyEmployee(this.globalEvent);
      }
      );
  }

  cancleUpdate() {
    this.resetForm();
    this.disabled = true;
    this.minDate = null;
    this.maxDate = null;
  }

  resetForm() {
    (<FormGroup>this.leavedetailform).reset({});
  }


  onSelection(data) {
    console.log(data);
    this.leaveTypeObj = data;
    this.leavedetailform.controls['dateStart'].setValue("");
    this.leavedetailform.controls['dateEnd'].setValue("");
    this.leaveOneDay = null;
    this.leaveMoreDay = null;
  }

  onSelectEmployeecode(data) {
    console.log(data);
    this.employeesObject = data;

  }

  disabled = true;
  onChangeDateStart(data: any) {
    this.minDate = data;
    this.leaveOneDay = null;
    this.leaveMoreDay = null;
    this.startLeaveDate = data;

    this.startLeaveDateString = this.getStringDate(this.startLeaveDate);
    this.disabled = false;
    this.leavedetailform.controls['dateEnd'].setValue("");

    if (this.leaveTypeObj.countWorkingFlag == false) {
      var someDate = new Date(this.minDate);
      var numberOfDaysToAdd = this.leaveTypeObj.leaveDay;
      someDate.setDate(someDate.getDate() + (numberOfDaysToAdd - 1));
      this.maxDate = someDate;
    } // ลาไม่นับอายุงาน
    else {
      this.leaveTypeObj.workingPeriodTypes.sort((a, b) => {
        if (a.workingPeriodYear > b.workingPeriodYear) return -1;
        else if (a.workingPeriodYear < b.workingPeriodYear) return 1;
        else return 0;
      });

      this.leaveTypeObj.workingPeriodTypes.forEach(element => {
        if (this.WorkingYear <= element.workingPeriodYear) {
          var someDate = new Date(this.minDate);
          var numberOfDaysToAdd = element.leaveDay;
          someDate.setDate(someDate.getDate() + (numberOfDaysToAdd - 1));
          this.maxDate = someDate;
        } else {

        }
      });
    }//ลาแบบนับอายุงาน
  }

  onChangeDateEnd(data: any) {
    this.endLeaveDate = data;
    this.endLeaveDateString = this.getStringDate(this.endLeaveDate);

    if (this.endLeaveDateString == this.startLeaveDateString) {
      this.leaveOneDay = true;
    } else {
      this.leaveOneDay = false;
    } // ลาวันเดียว

    if (this.startLeaveDate < this.endLeaveDate) {
      this.leaveMoreDay = true;
      /* this.leavedetailform.controls['timeEndFlag'].setValidators();
      this.leavedetailform.controls['timeEndFlag'].markAsDirty(); */

    } else {
      this.leaveMoreDay = false;
    } // ลามากกว่า 1 วัน
  }

  getStringDate(data: Date) {
    return data.getDate() + "" + data.getMonth() + "" + data.getFullYear();
  }

  loadLeaveDetailLazy(event: LazyLoadEvent) {
    this.globalEvent = event;


    this.leaveDetailService.loadLazyLeaveDetail(event).then(result => {

      this.leaveDetailObj = result.listOfData;
      this.totalRecords = result.totalRecords;
      console.log(this.leaveDetailObj);
      this.leaveDetailObj.forEach(element => {
        element.dateStart = element.dateStart ? new Date(element.dateStart) : null;
        element.dateEnd = element.dateEnd ? new Date(element.dateEnd) : null;

      });
    });

  } // use lazy

  loadLeaveDetailLazyEmployee(event: LazyLoadEvent) {
    this.globalEvent = event;

    let lazyWithObj = new LazyLoadEventRequestWithObject(event, this.employeesObject, null);
    this.leaveDetailService.loadLazyLeaveDetailEmployee(lazyWithObj).then(result => {
      this.leaveDetailObj = result.listOfData;
      this.totalRecords = result.totalRecords;
      console.log(this.leaveDetailObj);
      this.leaveDetailObj.forEach(element => {
        element.dateStart = element.dateStart ? new Date(element.dateStart) : null;
        element.dateEnd = element.dateEnd ? new Date(element.dateEnd) : null;
      });
    });

  }

  loadLeaveDetailLazyAll(event: LazyLoadEvent) {
    this.globalEvent = event;

    let lazyWithObj = new LazyLoadEventRequestWithObject(event, this.employeesObject, null);
    this.leaveDetailService.loadLazyLeaveDetailAll(lazyWithObj).then(result => {
      this.leaveDetailObj = result.listOfData;
      this.totalRecords = result.totalRecords;
      console.log(this.leaveDetailObj);
      this.leaveDetailObj.forEach(element => {
        element.dateStart = element.dateStart ? new Date(element.dateStart) : null;
        element.dateEnd = element.dateEnd ? new Date(element.dateEnd) : null;
      });
    });
  }

  leaveTimeStartCheck(leaveTime: string) {
    let time = "";
    if (leaveTime == "MORNING") {
      time = "เช้า";
    } else if (leaveTime == "AFTERNOON") {
      time = "บ่าย";
    } else {
      time = "ทั้งวัน";
    }
    return time;
  }

  leaveTimeEndCheck(leaveTime: string): string {
    let time = "";
    if (leaveTime == "MORNING") {
      time = "เช้า";
    } else if (leaveTime == "AFTERNOON") {
      time = "บ่าย";
    } else {
      time = "ทั้งวัน";
    }
    return time;
  }

  calLeaveDate(startDate: Date, endDate: Date): string {
    let startdate = startDate.getDate();
    let enddate = endDate.getDate();
    return
  }



  onTabChange(event) {
    if (event.index == 0) {
      /* this.loadLeaveDetailLazyAll(this.globalEvent); */
    } else if (event.index == 1) {
      this.loadLeaveDetailLazyEmployee(this.globalEvent);
    } else {

    }


  }



}
