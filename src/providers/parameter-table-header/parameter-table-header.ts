import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { CommonFunction } from '../../commons/CommonFunction';
import { ParameterTableHeader } from '../../models/parameter-table-header-model';
import { CommonOptions } from '../../commons/CommonOptions';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

/*
  Generated class for the ParameterTableHeaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let rootPath = "/api/parameterTableHeader/";
@Injectable()
export class ParameterTableHeaderProvider {

  constructor(public http: Http) {}
  
  common = new CommonFunction(this.http);
  
    saveOrUpdateParameterTableHeader(parameterTableHeaderl: ParameterTableHeader,isModify: boolean): Promise<ParameterTableHeader>{
      var path = isModify?"update":"save";
      return this.common.post(new CommonOptions(rootPath+path, parameterTableHeaderl));
    }
  
    loadParameterTableHeader(){
      return this.common.post(new CommonOptions(rootPath+"load", {}));
    }
    
    removeParameterTableHeader(parameterTableHeaders: ParameterTableHeader[]){
      return this.common.post(new CommonOptions(rootPath+"remove", parameterTableHeaders)); 
    }
  
    loadLazyParameterTableHeader(lazy: LazyLoadEvent){
      return this.common.post(new CommonOptions(rootPath+"loadLazy", lazy));
    }

}
