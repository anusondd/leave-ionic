import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button-control',
  templateUrl: './button-control.component.html',
  //styleUrls: ['./button-control.component.scss']
})
export class ButtonControlComponent implements OnInit {

  @Input('type') type;
  @Input('class') btnClass;
  @Input('icon') icon;
  @Input('label') label;
  @Input('btnTemplate') btnTemplate;
  @Input('disabled') disabled:boolean;
 

  @Output() onClick = new EventEmitter<any>();
  

  constructor() { }

  ngOnInit() {

    if(this.btnTemplate=="Add"){
      this.btnClass = "ui-button-primary";
      this.icon = "fa-check";
      this.label = "Save";
      this.type = "submit";
    }else if(this.btnTemplate=="Edit"){
      this.btnClass = "ui-button-primary";
      this.icon = "fa-check";
      this.label = "Update";
      this.type = "submit";
    }

  }

  onClicked(data){
    this.onClick.emit(data);
    console.log("data : ", data);
  }

}
