import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the ExampleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let headers = new Headers({'Content-Type':'application/json'});
let options = new RequestOptions({headers:headers});

@Injectable()
export class ExampleProvider {

  constructor(public http: Http) {}

  getHelloworld(){
    /* return this.http.get('/api/json/hello')
    .map((response: Response) => response.json()); */

    return this.http.get("/api/json/hello", options)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleErrorPromise);
  }


  extractData(res: Response){
    let body =res.json();
    return body || {};
  }

  handleErrorPromise (error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }
}
