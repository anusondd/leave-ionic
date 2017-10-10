import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TreeNode, Message } from 'primeng/primeng';
import { MenuAuthorities } from '../../models/MenuAuthorities';
import { ParameterTableDetail } from '../../models/parameter-table-detail-model';
import { Authorities } from '../../models/Authorities';
import { DropdownOptions } from '../../commons/auto-complete-dropdown/DropdownOptions';
import { MenuProvider } from '../../providers/menu/menu';
import { MenuAuthoritiesProvider } from '../../providers/menu-authorities/menu-authorities';
import { MenuAuthoritiesControlProvider } from '../../providers/menu-authorities-control/menu-authorities-control';


@IonicPage()
@Component({
  selector: 'page-menu-authorities',
  templateUrl: 'menu-authorities.html',
})
export class MenuAuthoritiesPage implements OnInit{
  
  @ViewChild("autoCompleteDropdownPosition") autoCompleteDropdownPosition: any;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private menuService: MenuProvider,
    private menuAuthoritiesService : MenuAuthoritiesProvider,
    private menuAuthorityControlService : MenuAuthoritiesControlProvider
  
  ) {}


  nodeMenuController: TreeNode[];
  operetion:any = false;
  tableCode=[];



  files: TreeNode[];
  expand : TreeNode[];
  collapse : TreeNode[];
  selectedFile: TreeNode[];
  MenuAuthoritiesform: FormGroup;
  MenuAuthoritiesControl: FormGroup;
  msgs:Message[] = [];
  
  
  menuAuthorities: MenuAuthorities;
  parameterTableDetail: ParameterTableDetail;
  authoritiesModel : Authorities;

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuAuthoritiesPage');
  }

  ngOnInit() {  
    
        this.MenuAuthoritiesform = this.formBuilder.group({
          'menuAuthorityId'   : new FormControl(),
          'authorities'       : new FormControl(),
          'menus'             : new FormControl(),
        });
    
        this.MenuAuthoritiesControl = this.formBuilder.group({
          'menuAuthority'             : new FormControl(),
          'menuAuthorityControlCode'  : new FormControl(),
          
        });
    
        //this.loadMenuAuthorities();
        this.DropdownAuthorities();  
    
        
      
    
      }
    
      DropdownAuthorities(){
        this.autoCompleteDropdownPosition.dropdownOptions = new DropdownOptions<Authorities>(
          "/api/authorities/load"
          , "TABLE_POSITION_TYPE"
          , "description"
          , "Authorities"
          , this.MenuAuthoritiesform
          , "authorities"
          , new FormControl('', Validators.required)
        )
    
      }
    
    
    
      loadMenuAuthorities(){
        this.menuService.loadTreemenu()
        .then(files =>this.files= files);
        console.log(this.files);
    
      }
    
      SelectDropdown(){
        
        this.authoritiesModel = this.MenuAuthoritiesform.controls['authorities'].value;
        console.log( this.authoritiesModel);
        if(this.authoritiesModel!=null){
          this.menuAuthoritiesService.loadTreeAuthorities(this.authoritiesModel)
          .then(selectedFile =>this.selectedFile = selectedFile);
          console.log(this.selectedFile );
          this.loadMenuAuthorities();
        }
        
      } 
    
      SelectNode(node){    
        this.MenuAuthoritiesform.controls['menus'].setValue(node.data);
        console.log(this.MenuAuthoritiesform.value);
        if(node.partialSelected==true){
          
          console.log(node.partialSelected);
          this.menuAuthoritiesService.save(this.MenuAuthoritiesform.value).then(result =>{
            console.log(result);
            this.SelectDropdown();   
             this.msgs.push(result);
            }),
            errors => {
              let error = errors.json();
              console.log(error);
              this.msgs.push(error);
            } 
          
        }else if(node.partialSelected==false){      
          console.log(node.partialSelected);
          this.menuAuthoritiesService.delete(this.MenuAuthoritiesform.value).then(result =>{
          console.log(result);  
          this.SelectDropdown(); 
          this.operetion = false;
           this.msgs.push(result);
          }),
          errors => {
            let error = errors.json();
            console.log(error);
            this.msgs.push(error);
          } 
        }
        
    
        
    
    
      }
    
      ControlMenu(node){
    
        this.nodeMenuController = node;
        //set menus&&authorities
        this.MenuAuthoritiesform.controls['menus'].setValue(node.data);
        console.log("menus",this.MenuAuthoritiesform.value);
        
        // Select menuAuthority && set id to menuAuthorityId
        this.menuAuthoritiesService.SelectMenuAuthority(this.MenuAuthoritiesform.value).then(result =>{
          this.menuAuthorities = result;
          console.log("menuAuthorities",this.menuAuthorities);
          this.MenuAuthoritiesControl.controls['menuAuthority'].setValue(this.menuAuthorities); 
          this.loadCodeTable();       
        })
        
        this.operetion = true;
        
      }
    
      loadCodeTable(){
        //loadCodeTable by TABLE_MENU_AUTHORITY_CONTROL&&menuAuthorities
        this.menuAuthorityControlService.loadCodeTable(this.MenuAuthoritiesControl.value).then(result =>{
          this.tableCode = result;
          console.log("tableCode",this.tableCode);
        });
    
      }
    
      AddOptionMenu(value){
        //MenuAuthoritiesControl
        //this.MenuAuthoritiesControl.controls['code'].setValue('');    
        this.parameterTableDetail = value.data;
        //console.log(value.status);
        this.MenuAuthoritiesControl.controls['menuAuthorityControlCode'].setValue(this.parameterTableDetail);
        //console.log(this.MenuAuthoritiesControl.value);
    
    
        if(value.status==true){
    
          this.menuAuthorityControlService.save(this.MenuAuthoritiesControl.value).then(result =>{
          console.log(result);   
           this.msgs.push(result);
          }),
          errors => {
            let error = errors.json();
            console.log(error);
            this.msgs.push(error);
          }
    
        }else if(value.status==false){
    
          this.menuAuthorityControlService.delete(this.MenuAuthoritiesControl.value).then(result =>{
            console.log(result);   
             this.msgs.push(result);
            }),
            errors => {
              let error = errors.json();
              console.log(error);
              this.msgs.push(error);
            }
          
        }
        
    
      }


  

}
