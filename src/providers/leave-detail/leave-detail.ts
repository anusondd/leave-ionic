import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { CommonFunction } from '../../commons/CommonFunction';
import { LeaveDetail } from '../../models/leave-detail';
import { Message } from 'primeng/components/common/message';
import { CommonOptions } from '../../commons/CommonOptions';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { Observable } from 'rxjs/Observable';
import { LazyLoadEventRequestWithObject } from '../../models/LazyLoadEventRequestWithObject';

/*
  Generated class for the LeaveDetailProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let rootPath = "/api/leavedetail/";
@Injectable()
export class LeaveDetailProvider {

  constructor(public http: Http) {
    console.log('Hello LeaveDetailProvider Provider');
  }

  common = new CommonFunction(this.http);
  
  
    saveLeaveDetail(formValue: LeaveDetail): Promise<Message> {
      return this.common.post(new CommonOptions(rootPath + "save", formValue));
  
    }
  
    loadLazyLeaveDetail(lazy: LazyLoadEvent) {
      return this.common.post(new CommonOptions(rootPath + "loadLazy", lazy));
    }

    loadLazyLeaveDetailEmployee(lazy: LazyLoadEventRequestWithObject) {
      return this.common.post(new CommonOptions(rootPath + "loadLazyEmployee", lazy));
    }

    loadLazyLeaveDetailAll(lazy: LazyLoadEventRequestWithObject) {
      return this.common.post(new CommonOptions(rootPath + "loadLazyAll", lazy));
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
