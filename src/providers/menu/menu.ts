import { Injectable } from '@angular/core';
import { Http, RequestOptions ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { CommonFunction } from '../../commons/CommonFunction';
import { Menu } from '../../models/Menu';
import { CommonOptions } from '../../commons/CommonOptions';
import { TreeNode, LazyLoadEvent, Message } from 'primeng/primeng';
import { MenuAuthorities } from '../../models/MenuAuthorities';

let headers = new Headers({ 'Content-Type': 'application/json' });
let options = new RequestOptions({ headers: headers });


let rootPath = "/api/Menu/";
//new



@Injectable()
export class MenuProvider {

  constructor(public http: Http) {
    console.log('Hello MenuProvider Provider');
  }


    common = new CommonFunction(this.http);
  
    saveOrUpdate(formValue: Menu, isModify: boolean):Promise<Menu> {
      var path = isModify ? "update" : "save";
      return this.common.post(new CommonOptions(rootPath + path, formValue));   
  
    }  
    
  
    loadMenu() {
  
      return this.common.post(new CommonOptions(rootPath + "loadAll", {}));
      
    }
  
    loadTreemenu(){
      return this.http.post('/api/Menu/loadTree', {}, options).toPromise()
      .then(res => <TreeNode[]> res.json().data);
    }
  
    loadMenulLazy(Lazy: LazyLoadEvent) {
          console.log(Lazy.filters);
          return this.common.post(new CommonOptions(rootPath+"loadLazy", Lazy));
    }
  
    onRemovemenu(menu: Menu[]): Promise<Message> {
      return this.common.post(new CommonOptions(rootPath + "delete", menu));
    }

    findAuthority(){
      return this.common.post(new CommonOptions(rootPath + "findAuthority", {}));
    }

    findMenuAuthority(formValue:MenuAuthorities){
      return this.common.post(new CommonOptions(rootPath + "findMenuAuthority",formValue));
    }
      
  
    
  

}
