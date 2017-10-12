import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ReplaySubject, Observable } from "rxjs";
import { JwtHelper, AuthHttp } from "angular2-jwt";
import { Storage } from "@ionic/Storage";
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class AuthenticationProvider {

  authUser = new ReplaySubject<any>(1);
  constructor(private readonly http: Http,
    private readonly authHttp: AuthHttp,
    private readonly storage: Storage,
    private readonly jwtHelper: JwtHelper) {
}

checkLogin() {
  this.storage.get('jwt').then(jwt => {

    if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {
      
      this.authHttp.get(`/api/authenticate`)
        .subscribe(() => this.authUser.next(jwt),
          (err) => this.storage.remove('jwt').then(() => this.authUser.next(null)));
      // OR
      // this.authUser.next(jwt);
    }
    else {
      this.storage.remove('jwt').then(() => this.authUser.next(null));
    }
  });
}

login(values: any): Observable<any> {
  return this.http.post(`/api/login`, values)
    .map(response => response.text())
    .map(jwt => this.handleJwtResponse(jwt));
}

logout() {
  this.storage.remove('jwt').then(() => this.authUser.next(null));
}


private handleJwtResponse(jwt: string) {
  return this.storage.set('jwt', jwt)
    .then(() => this.authUser.next(jwt))
    .then(() => jwt);
}

}
