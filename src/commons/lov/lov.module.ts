import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule, ButtonModule, DataTableModule, SharedModule } from "primeng/primeng";
import { TableModule } from '../table/table.module';
import { LovComponent } from './lov.component';

@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    DataTableModule,
    SharedModule,
    TableModule
  ],
  declarations: [LovComponent],
  exports: [LovComponent]
})
export class LovModule { }
