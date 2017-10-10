
import { FormGroup, FormControl } from "@angular/forms";
import { TableOptions } from "../table/TableOptions";

export class LOVOptions<T> {
    title:string;
    formGroup: FormGroup;
    fieldFormGroup:string;
    formControl: FormControl;
    tableOptions:TableOptions<T>;

    fieldLabel:string;
    fieldValue:string;

    constructor(
        title:string,
        formGroup: FormGroup,
        fieldFormGroup:string,
        fieldLabel:string,
        formControl: FormControl,
        tableOptions:TableOptions<T>
    ){
        this.title = title;
        this.formGroup = formGroup;
        this.fieldFormGroup = fieldFormGroup;
        this.fieldLabel = fieldLabel;
        this.formControl= formControl;
        this.tableOptions = tableOptions;
    }
}
