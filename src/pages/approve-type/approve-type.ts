import { SelectItem } from 'primeng/components/common/selectitem';
import { LOVOptions } from '../../commons/lov/LOVOptions';
import { LovIonPage } from './../lov-ion/lov-ion';
import { TableOptions } from './../../commons/table/TableOptions';
import { ParameterTableDetail } from './../../models/parameter-table-detail-model';
import { DropdownOptions } from './../../commons/auto-complete-dropdown/DropdownOptions';
import { Validators, FormArray, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ApproveTypeProvider } from './../../providers/approve-type/approve-type';
import { FormBuilder } from '@angular/forms';
import { CommonFunctionComponent } from './../../commons/CommonFunctionComponent';
import { Employees } from './../../models/Employees';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ApproveType } from './../../models/ApproveType';
import { Message } from 'primeng/primeng';
import { Component, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit, OnChanges} from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';
import { TableColumnOptions } from '../../commons/table/TableColumnOptions';

/**
 * Generated class for the ApproveTypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-approve-type',
  templateUrl: 'approve-type.html',
})
export class ApproveTypePage implements OnInit, AfterViewInit {

  @ViewChild("autoCompleteDropdownDepartment") autoCompleteDropdownDepartment: any;
  @ViewChildren("approveTypeLOV") approveTypeLOVs: QueryList<LovIonPage>;
  msgs: Message[] = [];
  btnLabel: string = "Save"
  isModify: boolean = false;

  approveTypeForm: FormGroup;

  approveTypeObj: ApproveType;
  totalRecordsApproveType: number;
  globalEventApproveType: LazyLoadEvent;
  selectedApproveType: ApproveType[];

  /* Employee */
  employeesObj: Employees[]

  selectEmployeeArr: Employees[] = [];
  globalEventEmployee: LazyLoadEvent;
  totalRecordsEmployee: number;

  displayEmployee: boolean = false;
  indexForAddEmp: FormGroup;
  indexCurrentApproveLevel: any;
  indexCurrentApprover: any;
  lovOptionGlobal: LOVOptions<any>;

  indexForAddEmpLevel: any[] = [];
  commonFnComp: CommonFunctionComponent = new CommonFunctionComponent();


  constructor(
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private approveTypeService: ApproveTypeProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
  ) { }

  ngOnInit() {

    this.approveTypeForm = this.fb.group({
      'approveTypeId': new FormControl(''),
      'approveTypeName': new FormControl('', Validators.required),
      'activeFlag': new FormControl(null),
      approveLevels: this.fb.array([])

    });

    this.addApproveLevel();

    this.autoCompleteDropdownDepartment.dropdownOptions = new DropdownOptions<ParameterTableDetail>(
      "/api/dropdown/employee"
      , "TABLE_DEPARTMENT_TYPE"
      , "description"
      , "ค้นหา 'หน่วยงาน/แผนก'"
      , this.approveTypeForm
      , "departmentCode"
      , new FormControl('', Validators.required)
    );

    console.log("approveLevel:", ((this.approveLevel.controls[0] as FormGroup)
      .controls['approvers'] as FormGroup).controls[0]
    );

    this.indexForAddEmp = (((this.approveLevel.controls[0] as FormGroup)
      .controls['approvers'] as FormGroup)
      .controls[0] as FormGroup);

    this.lovOptionGlobal = new LOVOptions<Employees>(
      "เลือกพนักงาน"
      , this.indexForAddEmp
      , "employee",
      "employeePrefixFullName"
      , new FormControl('')
      , new TableOptions<Employees>(
        "Employee"
        , "/api/approveType/loadLazyApproveTypeEmployee"
        , {}
        , "id"
        , [
          new TableColumnOptions("employeePrefix.description", "คำนำหน้า", true, true),
          new TableColumnOptions("employeeFullName", "ชื่อ - นามสกุล", true, true),
          new TableColumnOptions("employeeCode", "รหัสพนักงาน", true, true),
          new TableColumnOptions("employeePosition.description", "ตำแหน่ง", true, true),
          new TableColumnOptions("employeeDepartment.description", "แผนก", true, true),
        ]
      )
    );

  }

  ngAfterViewInit() {
  /* this.approveTypeLOVs.changes.subscribe(()=>{

  console.log("af : ",this.approveTypeLOVs.toArray());
  
}); */
    /* this.approveTypeLOVs.changes.subscribe((r) => { this.onApproverChange(); }); */

    //this.addLOVOption();
    /* console.log("approveTypeLOVs :",this.approveTypeLOVs);
    let a: LovIonPage[] = this.approveTypeLOVs.toArray();
    console.log("afterViewInit a :",a); */
  }


  onApproverChange(j) {
    this.employeeSelected();
    /* console.log("ApproveTypeLOVs : ", this.approveTypeLOVs); */
    /* this.approveTypeLOVs.forEach(approveTypeLOV => { */
      /* if (!approveTypeLOV.lovOptions) { */ //ตอนกดเพิ่ม
        /* console.log("if no options : ", this.indexForAddEmp); */
        this.lovOptionGlobal.formGroup = this.indexForAddEmp
        this.approveTypeLOVs.toArray()[j].lovOptions = this.lovOptionGlobal;
        this.approveTypeLOVs.toArray()[j].lovOptions.tableOptions.postDataList = this.selectEmployeeArr;
        console.log("ApproveTypeLOVs : ", this.approveTypeLOVs);
        /* approveTypeLOV.lovOptions = this.lovOptionGlobal; */
        /* approveTypeLOV.lovOptions.tableOptions.postDataList = this.selectEmployeeArr; */
        /* this.employeeSelected();
        approveTypeLOV.lovOptions.tableOptions.postDataList = this.selectEmployeeArr;
        console.log("Employee array :", this.selectEmployeeArr); */

     /*  } */ /* else { //ตอนกดลบ
        console.log("if have options : ");
        
        this.employeeSelected();
        approveTypeLOV.lovOptions.tableOptions.postDataList = this.selectEmployeeArr;
        console.log("Employee array :", this.selectEmployeeArr);
      } */
    /* }); */
 
  }

  onBeforeOpenModal(approversLoop, i, j){
    this.indexForAddEmp = (((this.approveLevel.controls[i] as FormGroup).controls['approvers'] as FormGroup).controls[j] as FormGroup);
    this.onApproverChange(j); //เช็คค่าว่างก็ได้
    /* let lovSetValue = this.approveTypeLOVs.find(lov => lov.lovOptions.formGroup === approversLoop);
    this.employeeSelected();
    lovSetValue.lovOptions.tableOptions.postDataList = this.selectEmployeeArr; */
    /* this.employeeSelected();
    this.onApproverChange() ;
    console.log("Employee array ========================:", this.selectEmployeeArr); */
  }


  /* addLOVOption(){
    this.approveTypeLOVs.forEach(approveTypeLOV => {
      console.log("approveTypeLOV : ",approveTypeLOV);
      
      if(!approveTypeLOV.lovOptions){
        console.log("if no options");
        approveTypeLOV.lovOptions = this.lovOptionGlobal;
        approveTypeLOV.lovOptions.tableOptions.postDataList = this.selectEmployeeArr;
      }
    });
  } */

  get approveLevel() { return <FormArray>this.approveTypeForm.get('approveLevels'); }

  onSubmit(value: ApproveType) {
    console.log(value);
    this.msgs = [];
    this.approveTypeService.saveOrUpdate(value, this.isModify).then(result => {
      this.resetForm();
      this.msgs.push(result);
      this.isModify = false;
      this.btnLabel = "Save";
      this.loadLazyApproveType(this.globalEventApproveType)
      this.loadLazyEmployee(this.globalEventEmployee);
    }),
      errors => {
        let error = errors.json();
        this.msgs.push(error);
        this.loadLazyApproveType(this.globalEventApproveType)
        this.loadLazyEmployee(this.globalEventEmployee);
      }

  }

  addApproveLevel() {
    this.approveLevel.push(this.fb.group({
      'approveLevelId': new FormControl(''),
      'approveLevelNo': new FormControl(''),
      approvers: this.fb.array([this.fb.group({
        'approversId': new FormControl(''),
        'approverNumber': new FormControl(''),
        'employee': new FormControl('', Validators.required)
      })
      ])
    }));
    /* this.indexForAddEmpLevel.push([""]); */
    this.indexForAddEmpLevel.push([""]);
  }

  addApprovers(approveLevelLoop) {

    approveLevelLoop.get('approvers').push(this.fb.group({
      'approversId': new FormControl(''),
      'approverNumber': new FormControl(''),
      'employee': new FormControl('', Validators.required)
    }));
    let ApproverList = (approveLevelLoop.get('approvers') as FormArray);
    console.log("approveLevelLoop:", (ApproverList.controls[ApproverList.length - 1]));

    /* this.indexForAddEmp = (ApproverList.controls[ApproverList.length - 1] as FormGroup); */

    //this.addLOVOption();
    //console.log("approveTypeLOVs :",this.approveTypeLOVs);

    /*    this.indexForAddEmpLevel[this.approveLevel.length - 1].push([""]);
   
       console.log("indexForAddEmpLevel : ", this.indexForAddEmpLevel);
       console.log("approveLevelLoop : ", approveLevelLoop.get('approvers')); */

  }

  removeApprovers(approveLevelLoop, i, j) {

    approveLevelLoop.get('approvers').removeAt(j);
    /*  this.indexForAddEmpLevel[i].splice(j, 1); */

    this.employeeSelected();
    console.log(this.selectEmployeeArr);

    this.loadLazyEmployee(this.globalEventEmployee);
    this.approveTypeForm.updateValueAndValidity();
    console.log("form On removeApprovers :", (<FormGroup>this.approveTypeForm));
  }

  removeApproveLevel(i) {
    /* this.indexForAddEmpLevel.splice(i, 1);
    console.log("delete :", this.indexForAddEmpLevel); */

    this.approveLevel.removeAt(i);
    this.employeeSelected();
    console.log(this.selectEmployeeArr);
    this.loadLazyEmployee(this.globalEventEmployee);
    this.approveTypeForm.updateValueAndValidity();
    console.log("On Remove Approlevel :", this.approveTypeForm);

  }

  resetForm() {
    this.approveTypeForm.controls['approveLevels'] = this.fb.array([]);
    (<FormGroup>this.approveTypeForm).reset({});
    /*  this.indexForAddEmpLevel = []; */
    this.selectEmployeeArr = [];
    this.addApproveLevel();
    this.btnLabel = "Save";
    this.isModify = false;
    this.autoCompleteDropdownDepartment.resetDropdown();
  }

  cancleUpdate() {
    this.resetForm();
    this.btnLabel = "Save";
    this.isModify = false;
  }

  loadLazyApproveType(event: LazyLoadEvent) {
    this.globalEventApproveType = event;
    this.approveTypeService.loadLazyApproveType(event).then(result => {
      //console.log("Result : ", result);
      this.approveTypeObj = result.listOfData;
      this.totalRecordsApproveType = result.totalRecords;
    });

  } // use lazy

  selectApproveType(approveType) {

    console.log("Edit :", approveType);
    this.autoCompleteDropdownDepartment.selectedDropdown(approveType.departmentCode.description);
    this.btnLabel = "Update"
    this.isModify = true;
    this.approveTypeService.editApproveType(approveType).then(result => {
      console.log("edit : ", result);

      this.approveTypeForm.controls['approveLevels'] = this.fb.array([]);

      /* this.indexForAddEmpLevel = [];  */
      let indexEditApproveLevel = 0;

      result.approveLevels.forEach(approveLevelResult => {
        /*   
         this.indexForAddEmpLevel.push([""]); */
        let approvers = this.fb.array([]);

        for (var approveLevelObject in approveLevelResult.approvers) {
          approvers.push(this.fb.group({
            'approversId': new FormControl(''),
            'approverNumber': new FormControl(''),
            'employee': new FormControl('', Validators.required)
          }));

          /*  this.indexForAddEmpLevel[indexEditApproveLevel][approveLevelObject] = (approveLevelResult.approvers[approveLevelObject].employee.employeePrefixFullName);
         */
        }

        this.approveLevel.push(this.fb.group({
          'approveLevelId': new FormControl(''),
          'approveLevelNo': new FormControl(''),
          approvers: approvers
        }));

        for (var index in approveLevelResult.approvers) {
        /* console.log("index :",index);
        console.log("toArray :",this.approveTypeLOVs.toArray()[index]);
         */
        /* this.indexForAddEmp = (((this.approveLevel.controls[indexEditApproveLevel] as FormGroup).controls['approvers'] as FormGroup).controls[index] as FormGroup);
        this.lovOptionGlobal.formGroup = this.indexForAddEmp;
        this.approveTypeLOVs.toArray()[index].lovOptions = this.lovOptionGlobal; */

      }

      indexEditApproveLevel += 1;

      });

      (<FormGroup>this.approveTypeForm).patchValue(result);
      this.approveTypeForm.updateValueAndValidity();
console.log("sum lov:",this.approveTypeLOVs.toArray());

    });
    
  }

  onRemove() {
    let component: ApproveTypePage = this;
    this.commonFnComp.ConfirmDialog(component, this.alertCtrl,
      function () {
        component.approveTypeService.removeApproveType(component.selectedApproveType)
          .then(
          result => {
            component.cancleUpdate();
            component.selectedApproveType = [];
            component.msgs.push(result);
            /*  setTimeout(() => {
               this.msgs.splice(this.msgs.indexOf(result), 1);
             }, 3000) */
            component.loadLazyApproveType(component.globalEventApproveType);
            component.loadLazyEmployee(component.globalEventEmployee)
          },
          errors => {
            let error = errors.json();
            component.msgs.push(error);
            component.loadLazyApproveType(component.globalEventApproveType);
            component.loadLazyEmployee(component.globalEventEmployee)
          }
          );
      },
      null
    );

  }

  loadLazyEmployee(event: LazyLoadEvent) {
    this.globalEventEmployee = event;
    //====== this.approveTypeLOV.lovOptions.tableOptions.postDataList = this.selectEmployeeArr;
    /* this.approveTypeLOV.tableLOV.reloadDataTableLazy(); */
  } // use lazy


  /* Employee */

  showTableEmployee(approversLoop, approveLevelLoop, i, j) {
    this.displayEmployee = true;
    this.indexForAddEmp = approversLoop;
    this.indexCurrentApproveLevel = i;
    this.indexCurrentApprover = j;

    (approversLoop.controls['employee'] as FormControl).markAsDirty();
    console.log(approversLoop.controls['employee']);

    console.log(this.approveTypeForm.controls['departmentCode']);


    approveLevelLoop.controls['approveLevelNo'].setValue(i + 1);
    approversLoop.controls['approverNumber'].setValue(j + 1);
    this.loadLazyEmployee(this.globalEventEmployee);

  }



  onRowSelectEmployee(event, data) {
    /*     this.displayEmployee = false;
        console.log("event:", event);
        this.indexForAddEmp.controls['employee'].setValue(event);
        this.indexForAddEmpLevel[this.indexCurrentApproveLevel][this.indexCurrentApprover] = event.employeePrefixFullName;
        console.log("value array at approveLevel:", this.indexForAddEmpLevel);
        console.log("On row selected form :", this.approveTypeForm);
    
     */
    //console.log(this.approveLevel.get('approvers'));
    data.approveLevelLoop.controls['approveLevelNo'].setValue(data.i + 1);
    data.approversLoop.controls['approverNumber'].setValue(data.j + 1);
    this.employeeSelected();
  }

  employeeSelected() {
    this.selectEmployeeArr = [];
    console.log("form : ", this.approveTypeForm.value);

    this.approveTypeForm.controls['approveLevels'].value.forEach(approveLevel => {
      approveLevel.approvers.forEach(approvers => {
        if (approvers.employee != null && approvers.employee) {
          this.selectEmployeeArr.push(approvers.employee);
        }

      });

    });
    console.log(this.selectEmployeeArr);
  }

}
