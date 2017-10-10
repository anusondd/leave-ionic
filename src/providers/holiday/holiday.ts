import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { CommonFunction } from '../../commons/CommonFunction';
import { Holiday } from '../../models/Holiday';
import { CommonOptions } from '../../commons/CommonOptions';
import { LazyLoadEvent, Message } from 'primeng/primeng';

let rootPath = "/api/Holiday/";
@Injectable()
export class HolidayProvider {

  constructor(public http: Http) {
    console.log('Hello HolidayProvider Provider');
  }

  common = new CommonFunction(this.http);

  saveOrUpdate(formValue: Holiday, isModify: boolean):Promise<Message> {
    var path = isModify ? "update" : "save";
    return this.common.post(new CommonOptions(rootPath + path, formValue));   

  }
  
  loadlLazy(Lazy: LazyLoadEvent) {
    console.log(Lazy.filters);
    return this.common.post(new CommonOptions(rootPath+"loadLazy", Lazy));
  }

  onRemove(holiday: Holiday[]): Promise<Message> {
    return this.common.post(new CommonOptions(rootPath + "delete", holiday));
  }
  
  loadAll() {
    
        return this.common.post(new CommonOptions(rootPath + "loadAll", {}));
        
  }
}
