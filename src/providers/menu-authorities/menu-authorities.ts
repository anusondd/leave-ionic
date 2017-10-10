import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { CommonFunction } from '../../commons/CommonFunction';
import { MenuAuthorities } from '../../models/MenuAuthorities';
import { CommonOptions } from '../../commons/CommonOptions';
import { TreeNode } from 'primeng/primeng';
import { Authorities } from '../../models/Authorities';




let headers = new Headers({ 'Content-Type': 'application/json' });
let options = new RequestOptions({ headers: headers });

let rootPath = "/api/MenuAuthorities/";
@Injectable()
export class MenuAuthoritiesProvider {

  constructor(public http: Http) {
    console.log('Hello MenuAuthoritiesProvider Provider');
  }

  common = new CommonFunction(this.http);
  
    
  
  
    save(formValue: MenuAuthorities):Promise<MenuAuthorities> {
      console.log(formValue);
      return this.common.post(new CommonOptions(rootPath + "save", formValue));
    }
  
    delete(formValue: MenuAuthorities):Promise<MenuAuthorities> {
      console.log(formValue);
      return this.common.post(new CommonOptions(rootPath + "delete", formValue)); 
    }
  
    SelectMenuAuthority(formValue: MenuAuthorities):Promise<MenuAuthorities> {
      console.log(formValue);
      return this.common.post(new CommonOptions(rootPath + "SelectMenuAuthority", formValue)); 
    }
  
    loadTreeAuthorities(authoritiesModel: Authorities){
      return this.http.post('/api/Menu/loadTreeAutorities',authoritiesModel, options).toPromise()
      .then(res => <TreeNode[]> res.json().data);
    } 

}
