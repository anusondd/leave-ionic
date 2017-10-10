import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { CommonFunction } from '../CommonFunction';
import { DropdownOptions } from './DropdownOptions';

@Injectable()
export class AutoCompleteDropdownService {

  constructor(private http : Http) { }
  commonFn = new CommonFunction(this.http);

  loadDataDropdown(commonOpt: DropdownOptions<any>){
    return this.commonFn.postDropdown(commonOpt);
  }

}
