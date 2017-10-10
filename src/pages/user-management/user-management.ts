import { EmployeesProvider } from './../../providers/employees/employees';
import { CommonFunctionComponent } from './../../commons/CommonFunctionComponent';
import { UserManagementProvider } from './../../providers/user-management/user-management';
import { DropdownOptions } from './../../commons/auto-complete-dropdown/DropdownOptions';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng/components/common/selectitem';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { Usermanagement } from './../../models/UserManagement';
import { FormGroup } from '@angular/forms';
import { Message } from 'primeng/components/common/message';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { Employees } from '../../models/Employees';

/**
 * Generated class for the UserManagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-management',
  templateUrl: 'user-management.html',
})
export class UserManagementPage  implements OnInit {
  
    @ViewChild("autoCompleteDropdown") autoCompleteDropdown: any;
    msgs: Message[] = [];
  
    /* User */
    userManagementForm: FormGroup;
    userObj: Usermanagement[];
    selectedUser: Usermanagement[];
    btnLabel = "Save";
    isModify = false;
    totalRecordsUserManagement: number;
    th: any;
    display: boolean = false;
    globalEventUsermanageMent: LazyLoadEvent;
    disabled: boolean = true;
    
    /* Employee */
    employeesObj: Employees[];
    globalEventEmployee: LazyLoadEvent;
    totalRecordsEmployee: number
    employeeCodeFullname:string;
    enabled: SelectItem[];
    commonFnComp:CommonFunctionComponent = new CommonFunctionComponent();
    
  
  
    constructor(private fb: FormBuilder,
      private usersManagementService: UserManagementProvider,
      private alertCtrl:AlertController,
      private employeesService: EmployeesProvider) { }
  
    ngOnInit() {
      this.userManagementForm = this.fb.group({
        'effectiveDate': new FormControl('', Validators.required),
        'username': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required),
        'enabled': new FormControl(false),
        'userType': new FormControl(null)
      });
      this.userManagementForm.addControl('employeeObjectemployeeId',new FormControl());
      
      this.th = {
        firstDayOfWeek: 0,
        dayNames: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์"],
        dayNamesShort: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
        dayNamesMin: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
        monthNames: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
        monthNamesShort: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."]
      };
  
      this.autoCompleteDropdown.dropdownOptions = new DropdownOptions<Usermanagement>(
        "/api/dropdown/authorities"
        , {}
        , "authority"
        , "คำค้นหา"
        , this.userManagementForm
        , "authorities"
        , new FormControl('', Validators.required)
      )
  
      this.enabled = [];
      this.enabled.push({label: 'ทั้งหมด', value: null});
      this.enabled.push({label: 'ใช้งาน', value: true});
      this.enabled.push({label: 'ไม่ใช้งาน', value: false});
      
    }
  
    onSubmit(value: Usermanagement) {
      this.msgs = [];
      this.usersManagementService.saveOrUpdate(value, this.isModify)
        .then(
          result => 
          {
          this.cancleUpdate();
          this.msgs.push(result);
          this.loadUserManagementLazy(this.globalEventUsermanageMent);
          this.loadEmployeeLazy(this.globalEventEmployee);
          this.employeeCodeFullname = null;
        },
        errors => {
          let error = errors.json();
          this.msgs.push(error);
          this.loadUserManagementLazy(this.globalEventUsermanageMent);
          this.loadEmployeeLazy(this.globalEventEmployee);
        });
  
    }
  
    onRemove() {
      /* this.commonFnComp.ConfirmDialog(this.alertCtrl,
        function(){      
          this.usersManagementService.removeUserManagement(this.selectedUser)
            .then(
            result => {
              this.formReset();
              this.selectedUser = [];
              this.msgs.push(result);
              this.loadUserManagementLazy(this.globalEventUsermanageMent);
              this.loadEmployeeLazy(this.globalEventEmployee);
            },
            errors => {
              let error = errors.json();
              this.msgs.push(error);
              this.loadUserManagementLazy(this.globalEventUsermanageMent);
              this.loadEmployeeLazy(this.globalEventEmployee);
            }
            );
        },
        null
      );
       */
      }
  
    loadUserManagementLazy(event: LazyLoadEvent) {
      this.globalEventUsermanageMent = event;
      this.usersManagementService.loadUserManagementTableLazy(event)
        .then(result => {
          this.userObj = result.listOfData;
          this.totalRecordsUserManagement = result.totalRecords;
        });
    }
  
    formReset() {
      (<FormGroup>this.userManagementForm).reset({});;
      this.employeeCodeFullname = null;
      this.btnLabel = "Save";
      this.isModify = false;
    }
  
    cancleUpdate() {
      this.formReset();
      this.btnLabel = "Save";
      this.isModify = false;
    }
  
    showDialog() {
      this.display = true;
    }
  
    loadEmployeeLazy(event: LazyLoadEvent) {
      this.globalEventEmployee = event;    
      this.employeesService.loadLazyEmployeeForLOV(event).then(result => {
        this.employeesObj = result.listOfData;
        this.totalRecordsEmployee = result.totalRecords;
      });
  
    }
  
    onRowSelectEmployee(event) {
      console.log(event.data);
      this.userManagementForm.controls['employeeObjectemployeeId'].setValue(event.data);
      this.employeeCodeFullname = event.data.employeeCode + " : "+ event.data.employeePrefix.description +" "+ event.data.employeeFullName;
      
      this.btnLabel = "Save";
      this.isModify = false;
      this.display = false;
    }
  
    selectUserManagement(value: Usermanagement){
      console.log(value.effectiveDate);
      
      this.employeeCodeFullname = value.employeeObjectemployeeId.employeePrefixFullName;
      value.effectiveDate = value.effectiveDate ? new Date(value.effectiveDate):null;
      
      (<FormGroup>this.userManagementForm).reset(value);
      this.btnLabel = "Update";
      this.isModify = true;
    }
  
  }
