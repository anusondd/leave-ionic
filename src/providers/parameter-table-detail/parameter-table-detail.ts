import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { CommonOptions } from "../../commons/CommonOptions";
import { Observable } from "rxjs/Observable";
import { ParameterTableDetail } from "../../models/parameter-table-detail-model";
import { CommonFunction } from "../../commons/CommonFunction";
import { LazyLoadEvent } from "primeng/components/common/lazyloadevent";

/*
  Generated class for the ParameterTableDetailProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let rootPath = "/api/parametertabledetail/";
@Injectable()
export class ParameterTableDetailProvider {

  constructor(private http: Http) { }
  common = new CommonFunction(this.http);

  saveOrUpdate(parametertabledetaill: ParameterTableDetail, isModify: boolean): Promise<ParameterTableDetail> {

    var path = isModify ? "update" : "save";
    return this.common.post(new CommonOptions(rootPath + path, parametertabledetaill));
  }

  loadParameterTableDetail(value: string) {
    return this.common.post(new CommonOptions(rootPath + "load", value));
  }


  onRemoveParameterTableDetail(parameterTableDetail: ParameterTableDetail[]) {
    return this.common.post(new CommonOptions(rootPath + "remove", parameterTableDetail));
  }

  loadLazyParameterTableDetail(lazy: LazyLoadEvent) {
    return this.common.post(new CommonOptions(rootPath + "loadLazy", lazy));
  }

 /*  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
 */
/*   private handleErrorObsevable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  } */

  private handleErrorPromise(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }


}
