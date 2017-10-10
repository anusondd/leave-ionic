import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ModalController, ViewController } from 'ionic-angular';
import { Message, TreeNode, LazyLoadEvent } from 'primeng/primeng';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Menu } from '../../models/Menu';
import { CommonFunctionComponent } from '../../commons/CommonFunctionComponent';
import { MenuProvider } from '../../providers/menu/menu';
import { TableCode } from '../../models/TableCode';



@IonicPage()
@Component({
  selector: 'page-menus',
  templateUrl: 'menus.html'
})
export class MenusPage implements OnInit {

  commonFnComp: CommonFunctionComponent = new CommonFunctionComponent();
  public menuform: FormGroup;
  msgs: Message[] = [];
  isModify: boolean = false;
  btnLabel: string = "บันทึก";
  menu: Menu[];

  menu_name = [];

  totalRecords: number;
  stacked: boolean;
  selectedmenu: Menu[];
  activeFlag: boolean = false;

  displayTree: boolean = false;
  Icon: String='fa fa-plus';
  ionicIcon: Array<{ icon: string }> = [];


  files: TreeNode[];
  selectedFiles: TreeNode[];

  status: boolean;

  
  //set Button_control
  Button_Add: string;
  Button_Edit: string;
  Button_Remove: string;
  Button_Plint: string;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private menuService: MenuProvider,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController
  ) {}



  ionViewDidLoad() {

    console.log('ionViewDidLoad MenusPage');
  }




  ngOnInit() {

    //set Button_control
    this.Button_Add = sessionStorage.getItem('Btnadd');
    this.Button_Edit = sessionStorage.getItem('Btnedit');
    this.Button_Remove = sessionStorage.getItem('Btnremove');

    this.menuform = this.formBuilder.group({
      'id': new FormControl(''),
      'parent': new FormControl(),
      'name': new FormControl('Admin', Validators.required),
      'order': new FormControl('1', Validators.required),
      'link': new FormControl('#', Validators.required),
      'picturePath': new FormControl('fa fa-plus', Validators.required),
      'menuIcon': new FormControl('fa fa-plus', Validators.required),
      'activeFlag': new FormControl(false),

    },
      //{validator: this.CustomValidate},

    );
    



  }


  nodeSelect(event) {

    //console.log(event);   
    let parent = event.node.data;
    this.menuform.controls['parent'].setValue(parent);
    this.displayTree = false;

  }
  
  hideTreemenu() {
    this.menuform.controls['parent'].setValue(null);
    this.displayTree = false;
    console.log(this.menuform.value);
  }

  showTreemenu() {
    this.displayTree = true;
    this.menuService.loadTreemenu()
      .then(files => this.files = files);
    console.log(this.files);

  }





  onSubmit(value: Menu) {
    console.log(value);
    this.msgs = [];
    // this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Order submitted' });
    this.menuService.saveOrUpdate(value, this.isModify).then(result => {
      console.log(result);
      this.onResetForm();
      this.msgs.push(result);
      this.isModify = false;
      this.btnLabel = "Save";
      this.onReload();
    }),
      errors => {
        let error = errors.json();
        console.log(error);
        this.msgs.push(error);
        this.onReload();
      }
  }

  onResetForm() {
    this.menuform.reset({});
  }

  onLoadMenu() {
    this.menuService.loadMenu().then(result => {
      this.menu = result;
      console.log(result);
    })
  }



  loadMenuLazy(event: LazyLoadEvent) {
    //console.log(event);
    this.menuService.loadMenulLazy(event).then(result => {
      //this.menu = result;
      this.menu = result.listOfData;
      this.totalRecords = result.totalRecords;
    }


    );

  }

  selectMenu(menu: Menu) {
    //(<FormGroup>this.menuform).reset(value);
    console.log("menu ", menu);
    (<FormGroup>this.menuform).reset(menu, { onlySelf: true });

    this.isModify = true;
    this.btnLabel = "แก้ไข";

  }

  onRemove() {
    let component: MenusPage = this;
    this.commonFnComp.ConfirmDialog(component, this.alertCtrl,
      function () {
        component.menuService.onRemovemenu(component.selectedmenu)
          .then(
          result => {
            component.selectedmenu = [];
            component.msgs.push({ severity: 'success', summary: 'Success', detail: 'Successfully' });
            component.onReload();
          },
          errors => {
            let error = errors.json();
            component.msgs.push({ severity: 'error', summary: 'Error', detail: error.msg })
          }
          );
      },
      null
    );
  
  }

  cancleUpdate() {
    this.onResetForm();
    this.isModify = false;
    this.btnLabel = "บันทึก";
  }


  onReload() {
    this.menuService.loadMenu().then(result => {
      this.menu = result;
      console.log(result);
    })

    this.ngOnInit();
  }

  presentIconModal() {
    let modal  = this.modalCtrl.create('IconmenuPage');
    modal.present();
    modal.onDidDismiss(data=>{
      console.log('result',data);
      this.menuform.controls['menuIcon'].setValue(data);
    });
  }
  

}
