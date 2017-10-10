import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { CommonFunction } from '../../commons/CommonFunction';
import { Employees } from '../../models/Employees';
import { CommonOptions } from '../../commons/CommonOptions';
import { Message } from 'primeng/primeng';
import { LazyLoadEvent } from 'primeng/components/common/api';


/*
  Generated class for the EmployeesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let rootPath = "/api/employee/";


@Injectable()
export class EmployeesProvider {

  constructor(private http: Http) { }
  common = new CommonFunction(this.http);



  loadEmployee() : Promise<Employees[]>{
    return this.common.post(new CommonOptions(rootPath + "load", {}));
  }


  saveUpdate(formValue: Employees): Promise<Employees> {
    return this.common.post(new CommonOptions("/api/employee/save", formValue));
  }


  saveOrUpdateEmployee(formValue: Employees, isModify: boolean): Promise<Message> {
    var path = isModify ? "update" : "save";
    return this.common.post(new CommonOptions(rootPath + path, formValue));

  }


  removeEmployee(employees: Employees[]): Promise<Message> {
    return this.common.post(new CommonOptions(rootPath + "remove", employees));
  }

  loadEmployeeDropdown() {
    return this.common.post(new CommonOptions("/api/employee/dropdown/employee", {}));
  }

   loadLazyEmployee(lazy: LazyLoadEvent) {
    return this.common.post(new CommonOptions(rootPath+"loadLazy", lazy));
  }

  loadLazyEmployeeForLOV(lazy: LazyLoadEvent) {
    return this.common.post(new CommonOptions(rootPath+"loadLazyEmployeeForLOV", lazy));
  }
  
 
}
