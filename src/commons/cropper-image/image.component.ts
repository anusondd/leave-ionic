import { Component, OnInit, ViewChild } from '@angular/core';

import { FileUpload } from "primeng/components/fileupload/fileupload";
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';

@Component({
  selector: 'cropper-image',
  templateUrl: './image.component.html',
  //styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

blocked: boolean=false;

 @ViewChild('cropper', undefined)
 cropper:ImageCropperComponent;


@ViewChild('fileUpload', undefined)
 fileUpload:FileUpload;

 data:any;

/*  @Output()
 formInputFile:EventEmitter<any>; */

 //@Input()
 cropperSettings: CropperSettings;
 
  constructor() { 
     //this.formInputFile = new EventEmitter();
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
        this.cropperSettings.width = 100;
        this.cropperSettings.height = 100;
        this.cropperSettings.croppedWidth =100;
        this.cropperSettings.croppedHeight = 100;
        this.cropperSettings.canvasWidth = 400;
        this.cropperSettings.canvasHeight = 300;
        this.data = {};
        var that = this;
        this.cropperSettings.resampleFn=function(canvas){
             that.copyImageToFile() ;
        }
  }

  copyImageToFile(){
    try {
          var file = this.fileUpload.files[0];

          console.log("file ==>"+file );
         // var fileCropper =  new File([this.dataURItoBlob(this.data.image)], file.name, {type:file.type});
         /// this.formInputFile.emit(fileCropper);
    } catch (error) {
      console.log("error=>"+error);
    }finally{
       this.blocked=false;
    }

  }

  ngOnInit() {
  }

  resetCropperImage(){
    this.data={};
    this.cropper.reset();
    this.fileUpload.clear();
  }


   dataURItoBlob(dataURI) {
      var binary = atob(dataURI.split(',')[1]);
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      var array = [];
      for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {type: mimeString});
};

fileChangeListener(event) {
  this.blocked=true;
  var image  = new Image();
    var file:File =event.files[0];
    //this.fileUpload=file;
    console.log(file);
    var myReader:FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent:any) {
        image.src = loadEvent.target.result;
        that.cropper.setImage(image); 
         that.copyImageToFile();   
    };
    myReader.readAsDataURL(file);
}

}
