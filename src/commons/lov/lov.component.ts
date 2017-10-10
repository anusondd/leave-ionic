import { LOVOptions } from './LOVOptions';
import { LovService } from './lov.service';
import { ViewChild, Input, Output, OnInit, Component, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-lov',
  templateUrl: './lov.component.html',
  /* styleUrls: ['./lov.component.scss'], */
  providers: [LovService]
})
export class LovComponent implements OnInit {
  @Input() lovOptions : LOVOptions<any>;
  @Input() display:boolean;
  @Output() displayChange = new EventEmitter();
  @Output() onSelectTableRow = new EventEmitter();

  @ViewChild('tableLOV') tableLOV;

  constructor() { }

  ngOnInit() {
    this.tableLOV.tableOptions = this.lovOptions.tableOptions; 
    
    let formControl:FormControl = this.lovOptions.formControl?
                                  new FormControl('', Validators.required)//if
                                  :this.lovOptions.formControl;//else
    console.log("formGroup:",(<FormGroup>this.lovOptions.formGroup));

    this.lovOptions.formGroup.addControl(this.lovOptions.fieldFormGroup,formControl);
  

  }

  onClose(data:any){
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onRowSelect(data){
    this.onSelectTableRow.emit(data);
    this.onClose(data);
  }
}
