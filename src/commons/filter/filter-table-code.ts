import { Pipe, PipeTransform } from '@angular/core';
import { TableCode } from '../../models/TableCode';

@Pipe({name: 'Filter'})


export class FilterTableCode implements PipeTransform {
  
    transform(value : TableCode[], Code: TableCode): any {
      if(value!=null){
        value.filter(
          button => button.data.code === Code.data.code);
          Code = value.pop();
          return Code.status;
      }
      
    }
  }