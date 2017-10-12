import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { AutoCompleteDropdownService } from "./auto-complete-dropdown.service";
import { FormControl, Validators } from "@angular/forms";
import { DropdownOptions } from './DropdownOptions';

@Component({
  selector: 'app-auto-complete-dropdown',
  templateUrl: './auto-complete-dropdown.component.html',
  //styleUrls: ['./auto-complete-dropdown.component.scss'],
  providers: [AutoCompleteDropdownService]
})

export class AutoCompleteDropdownComponent implements OnInit {
  @Input() dropdownOptions: DropdownOptions<any>;

  @Input() value:any;
  @Output() getValueChange = new EventEmitter<any>();
  @Output() onSelection = new EventEmitter<any>();
  @ViewChild('autoCompleteCommon') autoCompleteCommon;
  constructor(private autoCompleteService : AutoCompleteDropdownService) {}

  ngOnInit() {
    if(this.dropdownOptions.path != ""){
      this.reloadDropdown(null);
    }
    let formControl:FormControl = this.dropdownOptions.formControl == null?
                                  new FormControl('', Validators.required)//if
                                  :this.dropdownOptions.formControl;//else

    this.dropdownOptions.formGroup.addControl(this.dropdownOptions.fieldFormGroup,formControl);
  }

  reloadDropdown(postData:any){
    if(postData != null){
      this.dropdownOptions.postData = postData;
    }
    this.autoCompleteService.loadDataDropdown(this.dropdownOptions).then(result => {
      this.dropdownOptions.dataList = result;
    });	

  }

  search(event) {
    this.dropdownOptions.filteredData = [];
    this.dropdownOptions.formGroup.controls[this.dropdownOptions.fieldFormGroup].setValue(null);
    (this.dropdownOptions.formGroup.controls[this.dropdownOptions.fieldFormGroup] as FormControl).markAsDirty();

    for(let i = 0; i < this.dropdownOptions.dataList.length; i++) {
        let object = this.dropdownOptions.dataList[i];
        let fieldLabel = eval("object."+this.dropdownOptions.fieldLabel);

        if(fieldLabel.toLowerCase().indexOf(event.query.toLowerCase()) >= 0) {
          this.dropdownOptions.filteredData.push(object);
        }

        if(fieldLabel.toLowerCase() == event.query.toLowerCase()){
          var data = (this.dropdownOptions.fieldValue != null)?eval("object."+this.dropdownOptions.fieldValue):object;
          this.dropdownOptions.formGroup.controls[this.dropdownOptions.fieldFormGroup].setValue(data);
        }
    }
  }

  handleDropdownClick() {
    this.dropdownOptions.filteredData = [];
      //mimic remote call
      setTimeout(() => {
        this.dropdownOptions.filteredData = this.dropdownOptions.dataList;
      }, 100)
  }

  onSelectItem(object){

    var data = (this.dropdownOptions.fieldValue != null)?eval("object."+this.dropdownOptions.fieldValue):object;
    this.dropdownOptions.formGroup.controls[this.dropdownOptions.fieldFormGroup].setValue(data);
    this.value = "Child";
    this.getValueChange.emit(this.value);
     let fieldLabel = eval("object."+this.dropdownOptions.fieldLabel);
    this.onSelection.emit(data)
    
  }

  resetDropdown(){
    this.autoCompleteCommon.inputFieldValue=null;
    this.dropdownOptions.formGroup.controls[this.dropdownOptions.fieldFormGroup].setValue(null);
  }

  selectedDropdown(key:any){
      let object = this.dropdownOptions.dataList.find(obj => eval("obj."+this.dropdownOptions.fieldLabel) == key );
      var data = (this.dropdownOptions.fieldValue != null)?eval("object."+this.dropdownOptions.fieldValue):object;
      console.log("object",object);
      console.log("data",data);
      
      this.dropdownOptions.formGroup.controls[this.dropdownOptions.fieldFormGroup].setValue(data);
      this.autoCompleteCommon.inputFieldValue = eval("object."+this.dropdownOptions.fieldLabel);

  }
  

}
