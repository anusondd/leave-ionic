import { CommonFunctionComponent } from './../../commons/CommonFunctionComponent';
import { AuthoritiesProvider } from './../../providers/authorities/authorities';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { Authorities } from './../../models/Authorities';
import { FormGroup } from '@angular/forms';
import { Message } from 'primeng/components/common/message';
import { Component, OnInit } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';
import { SelectItem } from 'primeng/components/common/selectitem';

/**
 * Generated class for the AuthoritiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-authorities',
  templateUrl: 'authorities.html',
})
export class AuthoritiesPage implements OnInit {
  
  ionViewDidLoad() {}
  ngOnInit(): void {
    this.authoritiesform = this.fb.group({
      'authorityId': new FormControl(''),
      'authority': new FormControl('', Validators.required),
      'description': new FormControl(''),
      'activeFlag': new FormControl(false)
  });

  this.activeFlag = [];
  this.activeFlag.push({label: 'ทั้งหมด', value: null});
  this.activeFlag.push({label: 'ใช้งาน', value: true});
  this.activeFlag.push({label: 'ไม่ใช้งาน', value: false});
  }
    msgs: Message[] = [];
    authoritiesform: FormGroup;
    btnLabel = "Save";
    isModify = false;  
    authoritiesObj: Authorities[];
    selectedAuthorities: Authorities[];  
    totalRecords: number;
    globalEventAuthorities: LazyLoadEvent;
    activeFlag: SelectItem[];
    commonFnComp:CommonFunctionComponent = new CommonFunctionComponent();
    
  
    constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private fb: FormBuilder,
      private authorityService: AuthoritiesProvider,
      private alertCtrl:AlertController
    ) { }
  


  
    onSubmit(value: Authorities){
      this.msgs = [];
      this.authorityService.saveOrUpdate(value,this.isModify)
      .then(
        result => 
        {
        this.cancleUpdate();
        this.msgs.push(result);
        this.loadAuthoritiesLazy(this.globalEventAuthorities);
    },
    errors => {
      let error = errors.json();
      this.msgs.push(error);
      this.loadAuthoritiesLazy(this.globalEventAuthorities);    
    });
  
    }
  
    selectAuthorities(authoritiesTable: Authorities){
      (<FormGroup>this.authoritiesform).reset(authoritiesTable);    
      this.btnLabel = "Update";
      this.isModify = true;
    }
  
  
    onRemove() {
      let component :AuthoritiesPage = this;
      this.commonFnComp.ConfirmDialog(component, this.alertCtrl,
        function(){
          component.authorityService.removeAuthorities(component.selectedAuthorities)
                .then( 
                    result => {
                      component.resetForm();
                      component.selectedAuthorities = [];
                      component.msgs.push(result);
                        /* setTimeout(() => {
                          this.msgs.splice(this.msgs.indexOf(result), 1);
                          }, 3000) */
                          component.loadAuthoritiesLazy(component.globalEventAuthorities);
                    },
                    errors => {
                      let error = errors.json();
                      component.msgs.push(error);
                      component.loadAuthoritiesLazy(this.globalEventAuthorities);                    
                    }
              );
          },
         null
        );
        
        }
  
    resetForm(){
      (<FormGroup>this.authoritiesform).reset({});
      this.btnLabel = "Save";
      this.isModify = false;
    }
  
    cancleUpdate(){
      this.resetForm();
      this.btnLabel = "Save";
      this.isModify = false;
    }
  
    loadAuthoritiesLazy(event: LazyLoadEvent){
      this.globalEventAuthorities = event;
      this.authorityService.loadLazyAuthoritiesTableLazy(event)
      .then(result => {
        this.authoritiesObj = result.listOfData;
        this.totalRecords = result.totalRecords;      
      });	
    }
  }