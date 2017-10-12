import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TreeNode } from 'primeng/primeng';
import { MenuProvider } from '../providers/menu/menu';
import { MenuAuthorities } from '../models/MenuAuthorities';
import { Menu } from '../models/Menu';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Authorities } from '../models/Authorities';
import { MenuAuthoritiesControlProvider } from '../providers/menu-authorities-control/menu-authorities-control';
import { AuthenticationProvider } from '../providers/auth/authentication';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { JwtHelper } from 'angular2-jwt';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  isPageExpands:number[]=[];
  files: TreeNode[];
  rootPage: any = null;

  pages: Array<{title: string, component: any}> = [];

  Page:string; 

  menuAuthorities : MenuAuthorities;
  authorities : Authorities;
  menu : Menu;

  tableCode=[];

  MenuAuthoritiesform: FormGroup;
  MenuAuthoritiesControl: FormGroup;

  user:String;
  page:String;

  constructor(public platform: Platform, public statusBar: StatusBar
    , public splashScreen: SplashScreen
    , private menuService : MenuProvider
    , public loadingCtrl: LoadingController
    , private formBuilder: FormBuilder
    , private menuAuthorityControlService : MenuAuthoritiesControlProvider
    , private authProvider: AuthenticationProvider,
    jwtHelper: JwtHelper,) {
    this.initializeApp();
    
    console.log("Hello");
    authProvider.authUser.subscribe(jwt => {
      console.log("jwt : ",jwt);
      
      if (jwt) {

        //load menu
        this.menuService.loadTreemenu().then(files => {
          console.log(files);
          this.files= files;
        });
        this.menuService.findAuthority().then(Authority => { 
          this.authorities = Authority;
          console.log('UserType :',this.authorities)
        });

        //get username
        this.authProvider.authUser.subscribe(jwt => {
            if (jwt) {
              const decoded = jwtHelper.decodeToken(jwt);
              this.user = decoded.sub
            }else {
              this.user = null;
            }
          });

        this.page = "Home";
        this.rootPage = HomePage;
      }else {
        console.log("LoginPage");
        this.page = "Login";
        this.rootPage = LoginPage;
      }
    });

    authProvider.checkLogin();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.MenuAuthoritiesform = this.formBuilder.group({
      'menuAuthorityId'   : new FormControl(),
      'authorities'       : new FormControl(),
      'menus'             : new FormControl(),
    });

    this.MenuAuthoritiesControl = this.formBuilder.group({
      'menuAuthority'             : new FormControl(),
      'menuAuthorityControlCode'  : new FormControl(),
      
    });
  }

  openPage(tree) {


    /* this.MenuAuthoritiesform.controls['authorities'].setValue(this.authorities);
    console.log('authorities :',this.MenuAuthoritiesform.value);
    this.MenuAuthoritiesform.controls['menus'].setValue(tree.data);  */   

    
    if(tree.children.length>0 && tree.data.link == '#' && tree.data.link == ''){

      console.log('Here :'+tree.label);

    }else if(tree.children.length==0){

      this.loadingCtrl.create({
        content: 'กรุณารอ...',
        duration: 3000,
        dismissOnPageChange: true
      }).present();


      /* if(this.MenuAuthoritiesform.controls['menus'].value!=null){
          console.log('authorities+menus :',this.MenuAuthoritiesform.value);
        this.menuService.findMenuAuthority(this.MenuAuthoritiesform.value)
          .then(MenuAuthoritie =>{
            this.menuAuthorities = MenuAuthoritie; 
            console.log('menuAuthorities :',this.menuAuthorities);
            this.MenuAuthoritiesControl.controls['menuAuthority'].setValue(this.menuAuthorities);
            this.menuAuthorityControlService.loadCodeTable(this.MenuAuthoritiesControl.value).then(result =>{
              this.tableCode = result;
              console.log("tableCode",this.tableCode);

              this.page = tree.data.name;
              this.nav.setRoot(tree.data.link, { tableCode : this.tableCode }); 
            }) 
                      
        });
        
        
      
      } */
       
    }
    
   
    
  }


  addExpandClass(tree) {
    try {

        if(this.isPageExpands.indexOf(tree.data.id)==-1){
            this.isPageExpands.push(tree.data.id);
        }else{
            this.isPageExpands.splice(this.isPageExpands.indexOf(tree.data.id), 1);
        } 

        if(tree.data.link && tree.children.length == 0 && tree.data.link != "#"){
          this.openPage( { title: tree.data.name, component: tree.data.link });
        }
    } catch (error) {
        console.log("error=:"+error);
    } 
  
  }

  hasClassExpand = false;
  isChild(tree){
    this.hasClassExpand = tree.children.length != 0 ?true:false;
    let isShow = this.isPageExpands.indexOf(tree.data.id)==-1;

    return (isShow&&this.hasClassExpand);
  }


  logout() {
    this.authProvider.logout();
  }

}
