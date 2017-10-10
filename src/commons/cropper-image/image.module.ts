import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperComponent } from "ng2-img-cropper";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BlockUIModule } from "primeng/components/blockui/blockui";
import {FileUploadModule} from 'primeng/primeng';
import { ImageComponent } from './image.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BlockUIModule,
    FileUploadModule
  ],
  declarations: [ImageComponent,ImageCropperComponent],
  exports: [ImageComponent]
})
export class ImageModule { }
