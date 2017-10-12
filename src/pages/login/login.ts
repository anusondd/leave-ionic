import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/auth/authentication';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading: Loading;
  registerCredentials = { email: '', password: '' };
 
  constructor(private readonly navCtrl: NavController,
    private readonly loadingCtrl: LoadingController,
    private readonly authProvider: AuthenticationProvider,
    private readonly toastCtrl: ToastController) { }
 
    login(value: any) {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Logging in ...'
      });
  
      loading.present();
  
      this.authProvider
        .login(value)
        .finally(() => loading.dismiss())
        .subscribe(
          () => {},
          err => this.handleError(err));
    }
  
    handleError(error: any) {
      let message: string;
      if (error.status && error.status === 401) {
        message = 'Login failed';
      }
      else {
        message = `Unexpected error: ${error.statusText}`;
      }
  
      const toast = this.toastCtrl.create({
        message,
        duration: 5000,
        position: 'bottom'
      });
  
      toast.present();
    }

}
