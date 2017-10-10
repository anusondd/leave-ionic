import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { LazyLoadEvent } from "primeng/primeng";
import { CommonFunction } from '../CommonFunction';
import { CommonOptions } from '../CommonOptions';

let rootPath = "/api/parameterTableHeader/";

@Injectable()
export class LovService {

  constructor(private http: Http) { }
  common = new CommonFunction(this.http);

  loadDataTableLazy(lazy: LazyLoadEvent){
    return this.common.post(new CommonOptions(rootPath+"loadLazy", lazy));
  }
}
