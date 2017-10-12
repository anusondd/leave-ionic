import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';
import { CommonOptions } from '../../commons/CommonOptions';
import { DropdownOptions } from '../../commons/auto-complete-dropdown/DropdownOptions';
import { TableOptions } from '../../commons/table/TableOptions';
import { TreeNode } from 'primeng/components/common/treenode';

/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let headers = new Headers({'Content-Type':'application/json'});
let options = new RequestOptions({headers:headers});
@Injectable()
export class CommonProvider {

  constructor(private readonly authHttp: AuthHttp) { }

  post(commonOptions: CommonOptions){
    return this.authHttp.post(commonOptions.path,commonOptions.data, options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleErrorPromise);
}

postDropdown(commonOptions:DropdownOptions<any>){
    return this.authHttp.post(commonOptions.path,commonOptions.postData, options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleErrorPromise);
}

postTable(tableOptions:TableOptions<any>){
    return this.authHttp.post(tableOptions.path,tableOptions.lazyLoadEvents, options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleErrorPromise);
}

postTree(commonOptions: CommonOptions){
    return this.authHttp.post(commonOptions.path,commonOptions.data, options)
    .toPromise()
    .then(res => <TreeNode[]> res.json().data); 
}


extractData(res: Response){
    let body = res.json();
    return body || {};
}

handleErrorPromise (error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
}

}
