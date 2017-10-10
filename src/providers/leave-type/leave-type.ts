import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { CommonFunction } from "../../commons/CommonFunction";
import { LeaveType } from "../../models/leave-type";
import { CommonOptions } from "../../commons/CommonOptions";
import { LazyLoadEvent } from "primeng/components/common/lazyloadevent";
import { WorkingPeriodType } from "../../models/working-period-type";
import { Observable } from "rxjs/Observable";

/*
  Generated class for the LeaveTypeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let rootPath = "/api/leavetype/";
@Injectable()
export class LeaveTypeProvider {

  constructor(public http: Http) {
    console.log('Hello LeaveTypeProvider Provider');
  }

   common = new CommonFunction(this.http);

  saveOrUpdate(leavetype: LeaveType, isModify: boolean): Promise<LeaveType> {

       var path = isModify?"update":"save";
    return this.common.post(new CommonOptions(rootPath+path, leavetype));
  }

  loadLeaveType() {
   return this.common.post(new CommonOptions(rootPath+"load", {}));
  }

  onRemoveLeaveType(leavetype: LeaveType[]) {
    return this.common.post(new CommonOptions(rootPath+"remove", leavetype));
  }

    loadLazyLeaveType(lazy: LazyLoadEvent){
    return this.common.post(new CommonOptions(rootPath+"loadLazy", lazy));
  }

  onRemoveWorkingType(workingType : WorkingPeriodType[]){
    return this.common.post(new CommonOptions(rootPath+"removeWorkingType", workingType));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleErrorObsevable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

  private handleErrorPromise(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }

}
