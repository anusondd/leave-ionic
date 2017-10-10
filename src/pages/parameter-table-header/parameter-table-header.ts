import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Message } from 'primeng/components/common/message';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ParameterTableHeader } from '../../models/parameter-table-header-model';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ParameterTableHeaderProvider } from '../../providers/parameter-table-header/parameter-table-header';
import { CommonFunctionComponent } from '../../commons/CommonFunctionComponent';

/**
 * Generated class for the ParameterTableHeaderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parameter-table-header',
  templateUrl: 'parameter-table-header.html',
})
export class ParameterTableHeaderPage implements OnInit {


  ionViewDidLoad() {}
  ngOnInit(): void {
    
    this.pmhform = this.fb.group({
        'pHeaderId': new FormControl(''),
        'pHeaderCode': new FormControl('', Validators.required),
        'pHeaderName': new FormControl('', Validators.required),
        'pHeaderDescription': new FormControl(''),
        'brand': new FormControl('')
    });
  }

  msgs: Message[] = [];
  pmhform: FormGroup;
  lazyLoadEventGlobal:LazyLoadEvent;

  btnLabel = "Save";
  isModify = false;
  selectedParameterTableHeader:ParameterTableHeader[];
  parameterTableHeaders: ParameterTableHeader[];

  totalRecords: number;
  commonFnComp:CommonFunctionComponent = new CommonFunctionComponent();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder,
    private ptService: ParameterTableHeaderProvider,

    private alertCtrl:AlertController
  ) {
    
  }

  onSubmit(value: string) {
    this.msgs = [];
    this.ptService.saveOrUpdateParameterTableHeader(this.pmhform.value,this.isModify)
      .then( 
          result => {
              this.formReset();
              this.msgs.push({severity:'success', summary:'Success', detail:'Successfully'});
              
              this.loadParameterTableHeaderLazy(this.lazyLoadEventGlobal);
              this.cancleUpdate();
          },
          errors => {
            let error = errors.json();
            this.msgs.push({severity:'error', summary:'Error', detail:error.msg}) 
          }
    );
}

selectParameterTableHeader(parameterTableHeader: ParameterTableHeader){
  (<FormGroup>this.pmhform).reset(parameterTableHeader, {onlySelf: true});
  this.btnLabel = "Update";
  this.isModify = true;
}

formReset(){
  (<FormGroup>this.pmhform).reset({});
}

onRemove() {
  let component :ParameterTableHeaderPage = this;
  this.commonFnComp.ConfirmDialog(component,this.alertCtrl,
    function(){
      component.ptService.removeParameterTableHeader(component.selectedParameterTableHeader)
      .then( 
          result => {
            component.formReset();
            component.selectedParameterTableHeader = [];
            component.msgs.push({severity:'success', summary:'Success', detail:'Successfully'});	
             
            component.loadParameterTableHeaderLazy(component.lazyLoadEventGlobal);
          },
          errors => {
            let error = errors.json();
            component.msgs.push({severity:'error', summary:'Error', detail:error.msg}) 
          }
      );
    },
    null
  );

}

cancleUpdate(){
    this.btnLabel = "Save";
    this.isModify = false;
    this.formReset();
}

loadParameterTableHeaderLazy(event: LazyLoadEvent){
  this.lazyLoadEventGlobal = event;
  this.ptService.loadLazyParameterTableHeader(event).then(result => {
    this.parameterTableHeaders = result.listOfData;
    this.totalRecords = result.totalRecords;
  });
}

}
