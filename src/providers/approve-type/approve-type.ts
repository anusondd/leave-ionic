import { LazyLoadEventRequestWithObject } from './../../models/LazyLoadEventRequestWithObject';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { CommonOptions } from './../../commons/CommonOptions';
import { Message } from 'primeng/components/common/message';
import { ApproveType } from './../../models/ApproveType';
import { CommonFunction } from './../../commons/CommonFunction';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/*
  Generated class for the ApproveTypeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let rootPath = "/api/approveType/";
@Injectable()
export class ApproveTypeProvider {
  
    constructor(private http: Http) { }
    common = new CommonFunction(this.http);
  
    saveOrUpdate(formValue: ApproveType, isModify: boolean): Promise<Message>{
      var path = isModify?"update":"save";
      return this.common.post(new CommonOptions(rootPath+path, formValue));
    }
  
    loadLazyApproveType(lazy: LazyLoadEvent){
      return this.common.post(new CommonOptions(rootPath+"loadLazy", lazy));
    }
  
    removeApproveType(approveType: ApproveType[]){
      return this.common.post(new CommonOptions(rootPath+"remove", approveType));
    }
  
    editApproveType(approveType){
      return this.common.post(new CommonOptions(rootPath+"edit", approveType));
    }

    loadLazyEmployee(data: LazyLoadEventRequestWithObject) {
      return this.common.post(new CommonOptions(rootPath+"loadLazyApproveTypeEmployee", data));
    }
  }
  
