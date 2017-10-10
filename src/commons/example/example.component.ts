import { Component, OnInit } from '@angular/core';
import { ExampleService } from './example.service';
/* import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { TreeNode } from "primeng/primeng";
import { TableOptions } from '../table/TableOptions';
import { ParameterTableHeader } from '../../masters/parameter-table-header/ParameterTableHeader';
import { TableColumnOptions } from '../table/TableColumnOptions';
import { DropdownOptions } from '../auto-complete-dropdown/DropdownOptions';
import { Employees } from '../../masters/employees/Employees';
import { LOVOptions } from '../lov/LOVOptions'; */

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  //styleUrls: ['./example.component.scss'],
  providers:[ExampleService]
})
export class ExampleComponent implements OnInit {
  ngOnInit() {}
  /* addStatus:boolean = false;
  addStatus2:boolean = true;
  @ViewChild("autoCompleteDropdown") autoCompleteDropdown:any;
  @ViewChild("autoCompleteDropdown2") autoCompleteDropdown2:any;
  @ViewChild("autoCompleteDropdown3") autoCompleteDropdown3:any;

  @ViewChild('tableExample') tableExample;
  @ViewChild('lovPTHeader') lovPTHeader;
  @ViewChild('lovPTHeader2') lovPTHeader2;
  

  exampleform: FormGroup;

  labelSelect:any = null;
  labelSelect2:any = null;
  
  displayModalEmp:boolean = false;
  displayModalEmp2:boolean = false;

  
  filesTree1: TreeNode[];
  
  selectedFile1: TreeNode[] ;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    //form group
    this.exampleform = this.fb.group({});

    //table common
    this.tableExample.tableOptions = new TableOptions<ParameterTableHeader>(
      "ptHeaderTB",
      "/api/parameterTableHeader/loadLazy",
      {},
      "pHeaderId",
      [
        new TableColumnOptions("pHeaderId","pHeaderId",true,true),
        new TableColumnOptions("pHeaderCode","pHeaderCode",true,true),
        new TableColumnOptions("pHeaderName","pHeaderName",true,true),
        new TableColumnOptions("pHeaderDescription","pHeaderDescription",false,false)
      ]
    );

    //dropdown validation
    this.autoCompleteDropdown.dropdownOptions = new DropdownOptions<Employees>(
      "/api/employee/load"
      ,{}
      ,"employeeFirstName"
      ,"คำค้นหา1"
      ,this.exampleform
      ,"fieldObject1"
      ,new FormControl('', Validators.required)
    );

  //dropdown on selected
  this.autoCompleteDropdown2.dropdownOptions = new DropdownOptions<Employees>(
      "/api/employee/load"
      ,{}
      ,"employeeFirstName"
      ,"คำค้นหา2"
      ,this.exampleform
      ,"fieldObject2"
      ,new FormControl('', Validators.required)
  );

  //dropdown with data fix
  this.autoCompleteDropdown3.dropdownOptions = new DropdownOptions<Employees>(
    ""
    ,{}
    ,"name"
    ,"คำค้นหา3"
    ,this.exampleform
    ,"fieldObject3"
    ,new FormControl('', Validators.required)
  );
  this.autoCompleteDropdown3.dropdownOptions.dataList = [
    {key:"01",name:"Test01" },
    {key:"02",name:"Test02" },
    {key:"03",name:"Test03" },
  ];

  //lov
  this.lovPTHeader.lovOptions = new LOVOptions<ParameterTableHeader>(
    "เลือกพนักงาน",
    this.exampleform,
    "fieldObject",
    new FormControl('', Validators.required),
    new TableOptions<ParameterTableHeader>(
      "ptHeaderTB",
      "/api/parameterTableHeader/loadLazy",
      {},
      "pHeaderId",
      [
        new TableColumnOptions("pHeaderId","pHeaderId",true,true),
        new TableColumnOptions("pHeaderCode","pHeaderCode",true,true),
        new TableColumnOptions("pHeaderName","pHeaderName",true,true),
        new TableColumnOptions("pHeaderDescription","pHeaderDescription",false,false)
      ]
    )
  );

  //lov2
  this.lovPTHeader2.lovOptions = new LOVOptions<ParameterTableHeader>(
    "เลือกพนักงาน",
    this.exampleform,
    "fieldObject",
    new FormControl('', Validators.required),
    new TableOptions<ParameterTableHeader>(
      "ptHeaderTB",
      "/api/parameterTableHeader/loadLazy",
      {},
      "pHeaderId",
      [
        new TableColumnOptions("pHeaderId","pHeaderId",true,true),
        new TableColumnOptions("pHeaderCode","pHeaderCode",true,true),
        new TableColumnOptions("pHeaderName","pHeaderName",true,true),
        new TableColumnOptions("pHeaderDescription","pHeaderDescription",false,false)
      ]
    )
  );

this.filesTree1 =[
  {
      "label": "Documents",
      "data": "Documents Folder",
      "expandedIcon": "fa-folder-open",
      "collapsedIcon": "fa-folder",
      "children": [{
              "label": "Work",
              "data": "Work Folder",
              "expandedIcon": "fa-folder-open",
              "collapsedIcon": "fa-folder",
              "children": [{"label": "Expenses.doc", "icon": "fa-file-word-o", "data": "Expenses Document"}, {"label": "Resume.doc", "icon": "fa-file-word-o", "data": "Resume Document"}]
          },
          {
              "label": "Home",
              "data": "Home Folder",
              "expandedIcon": "fa-folder-open",
              "collapsedIcon": "fa-folder",
              "children": [{"label": "Invoices.txt", "icon": "fa-file-word-o", "data": "Invoices for this month"}]
          }]
  },
  {
      "label": "Pictures",
      "data": "Pictures Folder",
      "expandedIcon": "fa-folder-open",
      "collapsedIcon": "fa-folder",
      "children": [
          {"label": "barcelona.jpg", "icon": "fa-file-image-o", "data": "Barcelona Photo"},
          {"label": "logo.jpg", "icon": "fa-file-image-o", "data": "PrimeFaces Logo"},
          {"label": "primeui.png", "icon": "fa-file-image-o", "data": "PrimeUI Logo"}]
  },
  {
      "label": "Movies",
      "data": "Movies Folder",
      "expandedIcon": "fa-folder-open",
      "collapsedIcon": "fa-folder",
      "children": [{
              "label": "Al Pacino",
              "data": "Pacino Movies",
              "children": [{"label": "Scarface", "icon": "fa-file-video-o", "data": "Scarface Movie"}, {"label": "Serpico", "icon": "fa-file-video-o", "data": "Serpico Movie"}]
          },
          {
              "label": "Robert De Niro",
              "data": "De Niro Movies",
              "children": [{"label": "Goodfellas", "icon": "fa-file-video-o", "data": "Goodfellas Movie"}, {"label": "Untouchables", "icon": "fa-file-video-o", "data": "Untouchables Movie"}]
          }]
  }
];

this.selectedFile1 = [this.filesTree1[0],this.filesTree1[1]]
console.log("selectedFile1",this.selectedFile1);


  }//end init


  //Event on selected(dropdown2)
  onSelection(data){
    console.log(data);
  }

  onClickBtnLOV(event:any){
    this.displayModalEmp = true;;
  }

  onClickBtnLOV2(event:any){
    this.displayModalEmp2 = true;;
  }

  onRowSelect(data){
    console.log(data);
  }

  onSelectTableRowInLOV(data){
    console.log("onSelectTableRowInLOV in example",data);
    this.labelSelect = data.pHeaderName;
  }

  onSelectTableRowInLOV2(data){
    console.log("onSelectTableRowInLOV2 in example",data);
    this.labelSelect2 = data.pHeaderName;
  }

  dropdownReset(data){
    this.autoCompleteDropdown3.resetDropdown();
  }

  dropdownSetSelect(key){
    this.autoCompleteDropdown3.selectedDropdown();
  }

 */
}
