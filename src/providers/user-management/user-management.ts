import { LazyLoadEvent } from 'primeng/primeng';
import { Http } from '@angular/http';
import { Injectable } from "@angular/core";
import { CommonFunction } from '../../commons/CommonFunction';
import { Usermanagement } from '../../models/UserManagement';
import { Message } from 'primeng/components/common/message';
import { CommonOptions } from '../../commons/CommonOptions';



/*
  Generated class for the UserManagementProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let rootPath = "/api/users/";
@Injectable()
export class UserManagementProvider {
    
  constructor(private http: Http) {}
  common = new CommonFunction(this.http);

  saveOrUpdate(formValue: Usermanagement, isModify: boolean): Promise<Message>{
    var path = isModify?"update":"save";
    return this.common.post(new CommonOptions(rootPath+path, formValue));
  }
  
  loadUserManagementTableLazy(lazy: LazyLoadEvent){
    return this.common.post(new CommonOptions(rootPath+"loadLazy", lazy));
  }

  removeUserManagement(userManagementTable: Usermanagement[]){
    return this.common.post(new CommonOptions(rootPath+"remove", userManagementTable));
  }
}
