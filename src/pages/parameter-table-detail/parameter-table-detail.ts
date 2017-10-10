import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Message } from "primeng/primeng";
import { ParameterTableDetail } from "../../models/parameter-table-detail-model";
import { LazyLoadEvent } from "primeng/components/common/lazyloadevent";
import { DropdownOptions } from "../../commons/auto-complete-dropdown/DropdownOptions";
import { ParameterTableHeader } from "../../models/parameter-table-header-model";
import { ParameterTableDetailProvider } from "../../providers/parameter-table-detail/parameter-table-detail";
import { CommonFunctionComponent } from "../../commons/CommonFunctionComponent";

/**
 * Generated class for the ParameterTableDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parameter-table-detail',
  templateUrl: 'parameter-table-detail.html',
})
export class ParameterTableDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder,
    private PTService: ParameterTableDetailProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParameterTableDetailPage');
  }

  @ViewChild("autoCompleteDropdownSearch") autoCompleteDropdownSearch: any;
  @ViewChild("autoCompleteDropdownTableCode") autoCompleteDropdownTableCode: any;
  ptform: FormGroup;
  msgs: Message[] = [];
  btnLabel: string = "Save";
  isModify: boolean = false;
  ptDetails: ParameterTableDetail[];
  stacked: boolean;
  selectedPTDetail: ParameterTableDetail[];
  totalRecords: number;
  filter: any;
  lazyEvent: LazyLoadEvent;
  commonFnComp: CommonFunctionComponent = new CommonFunctionComponent();


  ngOnInit() {

    this.ptform = this.fb.group({
      'id': new FormControl(''),
      /* 'tableCode': new FormControl('', Validators.required), */
      'code': new FormControl('', Validators.required),
      'description': new FormControl(''),
      'activeFlag': new FormControl(''),
    });

    this.autoCompleteDropdownSearch.dropdownOptions = new DropdownOptions<ParameterTableHeader>(
      "/api/dropdown/loadTableCode"
      , {}
      , "pHeaderCode"
      , "ค้นหา 'รหัส'"
      , this.ptform
      , "tableSearch"
      , new FormControl('')
    );
    this.autoCompleteDropdownSearch.dropdownOptions.fieldValue = "pHeaderCode";
    
    this.autoCompleteDropdownTableCode.dropdownOptions = new DropdownOptions<ParameterTableHeader>(
      "/api/dropdown/loadTableCode"
      , {}
      , "pHeaderCode"
      , "ค้นหา 'รหัส'"
      , this.ptform
      , "tableCode"
      , new FormControl('', Validators.required)
    );
    this.autoCompleteDropdownTableCode.dropdownOptions.fieldValue = "pHeaderCode";
  }

  onSubmit(value: ParameterTableDetail) {
    console.log(value);
    this.msgs = [];
    //this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Order submitted' });
    this.PTService.saveOrUpdate(value, this.isModify).then(result => {
      this.onResetForm();
      this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Successfully' });
      this.isModify = false;
      this.btnLabel = "Save";
      this.loadParameterTableDetailLazy(this.lazyEvent);
    }),
      errors => {
        let error = errors.json();
        this.msgs.push({ severity: 'error', summary: 'Error', detail: error.msg })
        this.loadParameterTableDetailLazy(this.lazyEvent);
      }
  }

  onResetForm() {
    console.log(this.ptform.value);
    this.ptform.reset({});
  }

  selectParameterTableDetail(value) {
    (<FormGroup>this.ptform).reset(value);
    this.isModify = true;
    this.btnLabel = "Update";
  }

  onRemove() {
    /*  let jsonStr = JSON.stringify(this.selectedPTDetail);
 
     this.confirmationService.confirm({
       message: 'Are you sure that you want to proceed?',
       header: 'Confirmation',
       icon: 'fa fa-question-circle',
       accept: () => {
         this.PTService.onRemoveParameterTableDetail(this.selectedPTDetail)
           .then(
           result => {
             console.log(result);
             this.onResetForm();
             this.selectedPTDetail = [];
             this.msgs.push(result);
             this.loadParameterTableDetailLazy(this.lazyEvent);
           },
           errors => {
             let error = errors.json();
             //console.log(error);
             this.msgs.push(error)
           }
           );
       },
       reject: () => {
         //console.log("Reject");
       }
     }); */
     let component :ParameterTableDetailPage = this;
    this.commonFnComp.ConfirmDialog(component, this.alertCtrl,
      function () {
        component.PTService.onRemoveParameterTableDetail(component.selectedPTDetail)
          .then(
          result => {
            this.onResetForm();
            component.selectedPTDetail = [];
            component.msgs.push({ severity: 'success', summary: 'Success', detail: 'Successfully' });

            component.loadParameterTableDetailLazy(component.lazyEvent);
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

  cancleUpdate() {
    this.onResetForm();
    this.isModify = false;
    this.btnLabel = "Save";
  }

  loadParameterTableDetailLazy(event: LazyLoadEvent) {
    // event.globalFilter="kk";
    this.lazyEvent = event;
    this.lazyEvent.globalFilter = this.filter;
    //  console.log(event.globalFilter);
    this.PTService.loadLazyParameterTableDetail(this.lazyEvent).then(result => {
      this.ptDetails = result.listOfData;
      this.totalRecords = result.totalRecords;
      console.log(result);
    })
  }

  onSelectTableSearch(data) {
    
    this.filter = data;
    this.loadParameterTableDetailLazy(this.lazyEvent);
    this.autoCompleteDropdownTableCode.selectedDropdown(data);
    //console.log(this.ptform.controls["tableCode"].value);
  }

  onSelectTableCode(data){
    this.ptform.controls["tableCode"].setValue(data);
  }



  onClicked() {
    console.log("kkkkk");
  }

}
