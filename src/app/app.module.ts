import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuProvider } from '../providers/menu/menu';

import { CommonModule } from '@angular/common';
import { MenuAuthoritiesControlProvider } from '../providers/menu-authorities-control/menu-authorities-control';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { Storage, IonicStorageModule } from '@ionic/Storage';
import { CustomFormsModule } from 'ng2-validation'
import { AuthenticationProvider } from '../providers/auth/authentication';
import { CommonProvider } from '../providers/common/common';

export function authHttpServiceFactory(http: Http, options: RequestOptions, storage: Storage) {
  const authConfig = new AuthConfig({
    tokenGetter: (() => storage.get('jwt')),
  });
  return new AuthHttp(authConfig, http, options);
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),    
    IonicStorageModule.forRoot({
      name: 'leave-online',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    }),
    CustomFormsModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MenuProvider,
    MenuAuthoritiesControlProvider,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticationProvider,
    JwtHelper, {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions, Storage]
    },
    CommonProvider
  ]
})
export class AppModule {}
