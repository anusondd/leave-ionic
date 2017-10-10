import { LazyLoadEvent } from 'primeng/primeng';
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { CommonFunction } from "../../commons/CommonFunction";
import { CommonOptions } from "../../commons/CommonOptions";
import { Authorities } from "../../models/Authorities";
import { Message } from "primeng/components/common/message";



/*
  Generated class for the AuthoritiesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let rootPath = "/api/authorities/";
@Injectable()
export class AuthoritiesProvider {

  constructor(private http: Http) {}
  common = new CommonFunction(this.http);

  loadAuthoritiesTable(){
    return this.common.post(new CommonOptions(rootPath+"load",{}));
  }

  removeAuthorities(authoritiesTable: Authorities[]){
    return this.common.post(new CommonOptions(rootPath+"remove", authoritiesTable));
  }

  saveOrUpdate(formValue: Authorities, isModify: boolean): Promise<Message>{
    var path = isModify?"update":"save";
    return this.common.post(new CommonOptions(rootPath+path, formValue));
  }

  loadLazyAuthoritiesTableLazy(lazy: LazyLoadEvent){
    return this.common.post(new CommonOptions(rootPath+"loadLazy", lazy));
  }
 
}
