import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Message } from 'primeng/primeng';
import { Employees } from '../../models/Employees';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { EmployeesProvider } from '../../providers/employees/employees';
import { DropdownOptions } from '../../commons/auto-complete-dropdown/DropdownOptions';
import { ParameterTableDetail } from '../../models/parameter-table-detail-model';
import { CommonFunctionComponent } from '../../commons/CommonFunctionComponent';

/**
 * Generated class for the EmployeesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

let common = new CommonFunctionComponent();

@IonicPage()

@Component({
  selector: 'page-employees',
  templateUrl: 'employees.html',
})


export class EmployeesPage implements OnInit {

  @ViewChild("autoCompleteDropdownPrefix") autoCompleteDropdownPrefix: any;
  @ViewChild("autoCompleteDropdownPosition") autoCompleteDropdownPosition: any;
  @ViewChild("autoCompleteDropdownDepartment") autoCompleteDropdownDepartment: any;
  @ViewChild("autoCompleteDropdownCauseOfResign") autoCompleteDropdownCauseOfResign: any;
  commonFnComp: CommonFunctionComponent = new CommonFunctionComponent();
  totalRecords: number;
  employeeform: FormGroup;
  errorMessage: string;
  msgs: Message[] = [];
  employeeResignDate: any;
  employeeStartDate: any;
  th: any;
  disabledCauseOfProbationfail = false;
  currentDate: Date;
  workingAge: string
  workStatus: boolean = null;
  workStatusText: string = "";
  btnLabel = "Save";
  isModify = false;
  probationFlag: string;
  selectedEmployees: Employees[];
  employeesObj: Employees[];
  datatest: {};

  globalEvent: LazyLoadEvent;

  minDate: Date;
  maxDate: Date;

  durationDate: number;
  durationMonth: number;
  durationYear: number;
  diffDate: string;
  eventStartTime: Date;
  eventEndTime: Date;
  constructor(public formBuilder: FormBuilder, public employeesService: EmployeesProvider, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.currentDate = new Date();
    this.th = {
      firstDayOfWeek: 0,
      dayNames: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์"],
      dayNamesShort: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
      dayNamesMin: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
      monthNames: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
      monthNamesShort: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."],
      today: 'Today',
      clear: 'Clear'
    };

    this.employeeform = this.formBuilder.group({
      'employeeId': new FormControl(''),
      'employeeCode': new FormControl('', Validators.required),
      'employeeFirstName': new FormControl('', Validators.required),
      'employeeLastName': new FormControl('', Validators.required),
      'employeeNickname': new FormControl('', Validators.required),
      'emailAddress': new FormControl('', Validators.required),
      'employeeTelNo': new FormControl('', Validators.required),
      'activeFlag': new FormControl(true),
      'causeOfResign': new FormControl(''),
      'employeeAddress': new FormControl(''),
      'employeeStartDate': new FormControl('', Validators.required),
      'employeeResignDate': new FormControl(''),
      'identificationNumber': new FormControl('', Validators.required),
      'probationFlag': new FormControl('', Validators.required),
      'causeOfProbationFail': new FormControl(''),
    });
    this.autoCompleteDropdownPrefix.dropdownOptions = new DropdownOptions<ParameterTableDetail>(
      "/api/dropdown/employee"
      , { "tableCode": "TABLE_NAME_PREFIX_TYPE" }
      , "description"
      , "ค้นหา 'คำนำหน้า'"
      , this.employeeform
      , "employeePrefix"
      , new FormControl('', Validators.required)
    ),
      this.autoCompleteDropdownPosition.dropdownOptions = new DropdownOptions<ParameterTableDetail>(
        "/api/dropdown/employee"
        , { "tableCode": "TABLE_POSITION_TYPE" }
        , "description"
        , "ค้นหา 'ตำแหน่ง'"
        , this.employeeform
        , "employeePosition"
        , new FormControl('', Validators.required)
      ),
      this.autoCompleteDropdownDepartment.dropdownOptions = new DropdownOptions<ParameterTableDetail>(
        "/api/dropdown/employee"
        , { "tableCode": "TABLE_DEPARTMENT_TYPE" }
        , "description"
        , "ค้นหา 'หน่วยงาน/แผนก'"
        , this.employeeform
        , "employeeDepartment"
        , new FormControl('', Validators.required)
      ),
      this.autoCompleteDropdownCauseOfResign.dropdownOptions = new DropdownOptions<ParameterTableDetail>(
        "/api/dropdown/employee"
        , { "tableCode": "TABLE_CAUSE_OF_VALUE_TYPE" }
        , "description"
        , "ค้นหา 'สาเหตุที่ออก'"
        , this.employeeform
        , "causeOfResign"
        , new FormControl('')
      )
    this.employeeform.controls['probationFlag'].setValue('probation');
    this.employeeform.controls['causeOfProbationFail'].disable();


  }


  onSubmit(value: Employees) {
    this.msgs = [];

    this.employeesService.saveOrUpdateEmployee(this.employeeform.value, this.isModify)
      .then(
      result => {

        this.cancleUpdate();
        this.msgs.push(result);
        this.loadEmployeesLazy(this.globalEvent);
      },
      errors => {
        let error = errors.json();
        this.msgs.push(error)
        this.loadEmployeesLazy(this.globalEvent);
      }
      );
  }


  onRemove() {
    let component: EmployeesPage = this
    this.commonFnComp.ConfirmDialog(component, this.alertCtrl,
      function () {
        component.employeesService.removeEmployee(component.selectedEmployees)
          .then(
          result => {
            component.msgs.push(result);
            /* setTimeout(() => {
              this.msgs.splice(this.msgs.indexOf(result), 1);
            }, 3000) */
            component.resetForm();
            component.selectedEmployees = [];

            component.loadEmployeesLazy(component.globalEvent);
          },
          errors => {
            let error = errors.json();
            component.msgs.push(error)
          }
          );
      },
      null
    );

  }

  reloadEmployee() {
    this.employeesService.loadEmployee().then(result => {
      this.employeesObj = result;
    });
  }

  selectEmployee(employee: Employees) {
    var emp = employee;
    this.autoCompleteDropdownPrefix.selectedDropdown(employee.employeePrefix.description);
    this.autoCompleteDropdownPosition.selectedDropdown(employee.employeePosition.description);
    this.autoCompleteDropdownDepartment.selectedDropdown(employee.employeeDepartment.description);
    if (emp.causeOfResign == null) {
    } else {
      this.autoCompleteDropdownCauseOfResign.selectedDropdown(employee.causeOfResign.description);
    }

    //this.employeeform.controls["employeePrefix"].setValue(emp.employeePrefix.description);
    employee.employeeStartDate = employee.employeeStartDate ? new Date(employee.employeeStartDate) : null;
    employee.employeeResignDate = employee.employeeResignDate ? new Date(employee.employeeResignDate) : null;

    (<FormGroup>this.employeeform).reset(employee);
    this.btnLabel = "Update";
    this.isModify = true;
    this.disabled = false;

    this.minDate = new Date(employee.employeeStartDate);

    this.workingAge = employee.workingAge;

    if (employee.employeeResignDate == null) {
      this.onChangeStartDate(this.eventStartTime);
    } else {
      this.eventStartTime = new Date(employee.employeeStartDate);
      this.eventEndTime = new Date(employee.employeeResignDate);
      this.onChangeResignDate(employee.employeeResignDate);
      this.diffDate = this.calDiffDate(employee.employeeStartDate, employee.employeeResignDate);
    }

    if (employee.causeOfProbationFail == null) {
      this.employeeform.controls['causeOfProbationFail'].disable();
    } else {
      this.employeeform.controls['causeOfProbationFail'].enable();

    }

  }

  resetForm() {
    (<FormGroup>this.employeeform).reset({});
    this.btnLabel = "Save";
    this.isModify = false;
    this.diffDate = "";
    this.workStatus = null;
    this.workStatusText = "";
    this.disabled = true;
    this.minDate = null;
    this.maxDate = null;
    this.workingAge = ""
    this.autoCompleteDropdownPrefix.resetDropdown();
    this.autoCompleteDropdownPosition.resetDropdown();
    this.autoCompleteDropdownDepartment.resetDropdown();
    this.autoCompleteDropdownCauseOfResign.resetDropdown();
  }

  cancleUpdate() {
    this.resetForm();
    this.btnLabel = "Save";
    this.isModify = false;
    this.disabled = true;
    this.minDate = null;
    this.maxDate = null;
  }

  loadEmployeesLazy(event: LazyLoadEvent) {
    this.globalEvent = event;

    this.employeesService.loadLazyEmployee(event).then(result => {

      this.employeesObj = result.listOfData;
      this.totalRecords = result.totalRecords;

      this.employeesObj.forEach(element => {
        element.employeeStartDate = element.employeeStartDate ? new Date(element.employeeStartDate) : null;
        element.employeeResignDate = element.employeeResignDate ? new Date(element.employeeResignDate) : null;

      });
    });

  } // use lazy

  disabled = true;
  onChangeStartDate(data: any) {

    this.minDate = new Date(data);
    this.eventStartTime = data;

    if (this.eventStartTime <= this.currentDate) {
      this.diffDate = common.getDiffdate(data, null);
    } else this.diffDate = "0 ปี 0 เดือน 0 วัน";

    this.disabled = false;

    if (this.eventStartTime > this.currentDate && this.eventEndTime == null) {
      this.workStatus = null;
      this.workStatusText = "รอปฏิบัติงาน";
    } else {
      this.workStatus = true;
      this.workStatusText = "ปฏิบัติงาน";
    }

  }

  onChangeResignDate(data: any) {
    console.log(data);
    console.log(this.currentDate);

    if (this.eventStartTime > this.currentDate) {
      this.workStatusText = "รอปฏิบัติงาน";
      this.eventStartTime = new Date();
      this.eventEndTime = new Date();
    }

    if (this.eventStartTime <= this.currentDate && data > this.currentDate) {
      this.workStatus = true;
      this.workStatusText = "ปฏิบัติงาน";
      this.eventEndTime = new Date();
    } else if (this.eventStartTime <= this.currentDate && data <= this.currentDate) {
      this.workStatus = false;
      this.workStatusText = "ลาออก";
      this.eventEndTime = new Date(data);
    }
    this.maxDate = new Date(data);

    if (this.eventStartTime <= this.currentDate) {
      this.diffDate = common.getDiffdate(this.eventStartTime, this.eventEndTime);
    } else this.diffDate = "";
  }

  onClearClick() {
    this.onChangeStartDate(this.eventStartTime);
    console.log("hii");

  }

  calDiffDate(startDate: Date, endDate: Date): string {

    let diffDate: string;

    if (endDate > this.currentDate) {
      endDate = new Date();
    } else if (endDate <= this.currentDate) {
      endDate = new Date(endDate);
    }

    if (startDate <= this.currentDate) {
      diffDate = common.getDiffdate(startDate, endDate);
    }

    return diffDate;
  }

  onRadioClick(data) {
    if (data == "probationFail") {
      this.employeeform.controls['causeOfProbationFail'].enable();

    } else {
      this.employeeform.controls['causeOfProbationFail'].disable();
    }

  }

}
