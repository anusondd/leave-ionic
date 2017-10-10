import { LazyLoadEventRequestWithObject } from './../../models/LazyLoadEventRequestWithObject';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LazyLoadEvent } from "primeng/primeng";
import { TableService } from './table.service';
import { TableOptions } from './TableOptions';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  /* styleUrls: ['./table.component.scss'], */
  providers: [TableService]
})
export class TableComponent implements OnInit {

  tableOptions : TableOptions<any>;
  @Output() onRowSelectEvent = new EventEmitter<any>();
  lazyWithObj:LazyLoadEventRequestWithObject;
  constructor(private tableService:TableService) { }

  ngOnInit() {
    
  }

  loadDataTableLazy(lazy:LazyLoadEvent){
     /* lazy.globalFilter = this.tableOptions.postData; */

    this.lazyWithObj = new LazyLoadEventRequestWithObject(lazy,this.tableOptions.postData,this.tableOptions.postDataList);
    this.tableOptions.lazyLoadEvents = this.lazyWithObj;

    this.tableService.loadDataTableLazy(this.tableOptions).then(
      result => {
        this.tableOptions.dataList = result.listOfData;
        this.tableOptions.totalRecords = result.totalRecords;
      },
      errors => {
        this.tableOptions.dataList = [];
        this.tableOptions.totalRecords = 0;
      }
    );
  }

  reloadDataTableLazy(){
    this.loadDataTableLazy(this.tableOptions.lazyLoadEvents.loadLazyEvent);
  }

  onRowSelect(event:any){
    this.onRowSelectEvent.emit(event.data);
  }
}
