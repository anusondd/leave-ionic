import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { CommonFunction } from '../CommonFunction';
import { TableOptions } from './TableOptions';

@Injectable()
export class TableService {

  constructor(
    private http : Http) { }
    common = new CommonFunction(this.http);

    loadDataTableLazy(tableOptions:TableOptions<any>){
      return this.common.postTable(tableOptions);
    }

}
