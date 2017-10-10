import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { CommonFunction } from '../../commons/CommonFunction';
import { CommonOptions } from '../../commons/CommonOptions';
import { MenuAuthorityControl } from '../../models/MenuAuthorityControl';

let rootPath = "/api/MenuAuthoritiesControl/";
@Injectable()
export class MenuAuthoritiesControlProvider {

  constructor(public http: Http) {
    console.log('Hello MenuAuthoritiesControlProvider Provider');
  }

  common = new CommonFunction(this.http);
  
  
    loadCodeTable(fromvalue:MenuAuthorityControl) {   
      return this.common.post(new CommonOptions(rootPath + "loadCodeTable", fromvalue));  
  
    }
  
    save(fromvalue:MenuAuthorityControl) {   
      return this.common.post(new CommonOptions(rootPath + "save", fromvalue));  
  
    }
  
    delete(fromvalue:MenuAuthorityControl) {   
      return this.common.post(new CommonOptions(rootPath + "delete", fromvalue));  
  
    }

}
