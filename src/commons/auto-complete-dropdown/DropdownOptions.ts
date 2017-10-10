
import { EventEmitter } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

export class DropdownOptions<T> {
  fieldLabel:string;
  path:string;
  placeholder:string;
  dataList:any[];
  postData:{};
  filteredData:T[];
  callback: EventEmitter<T>
  formGroup: FormGroup;
  fieldFormGroup:string;
  formControl: FormControl;
  fieldValue:string = null;

  constructor(path:string,postData:{},fieldLabel:string,placeholder:string, formGroup: FormGroup,fieldFormGroup:string,formControl: FormControl) {
    this.path = path;
    this.postData = postData;
    this.fieldLabel = fieldLabel;
    this.placeholder = placeholder;
    this.formGroup = formGroup;
    this.fieldFormGroup = fieldFormGroup;
    this.formControl = formControl;
  }
}