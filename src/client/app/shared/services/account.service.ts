import { Injectable } from '@angular/core';
import {Http, Response, Jsonp} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {request} from "../helper/request";
import {storage} from "../helper/storage";
// import 'rxjs/add/operator/do';  // for debugging

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class AccountService {

  apiUrl : string = 'http://localhost:4000/api/account/';

  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private _http: Http, private jsonp: Jsonp) {}

  createAccount(user:any): Observable<any> {
    const body = JSON.stringify(user);

    console.log(user.role);

    return this._http.post(`${this.apiUrl}user`,body, {headers: request.getJsonHeaders()})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));

  }



  editMyProfile(user:Object): Observable<any> {
    const body = JSON.stringify(user);
    return this._http.put(`${this.apiUrl}user`,body,{headers: request.getAuthorization()})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }



  getMyProfile(): Observable<any> {
    return this._http.get(`${this.apiUrl}user`, {headers: request.getAuthorization()})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  forgotPassword(user:Object): Observable<any> {
    const body = JSON.stringify(user);
    return this._http.post(`${this.apiUrl}user/forgot`,body,{headers: request.getJsonHeaders()})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  resetPassword(){

  }

  updatePassword(user:Object){
    const body = JSON.stringify(user);
    return this._http.post(`${this.apiUrl}user/password`,body,{headers: request.getAuthorization()})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  deactivateAccount(){
    return this._http.post(`${this.apiUrl}user/deactivate`,{},{headers: request.getAuthorization()})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }




  /**
   * Handle HTTP error
   */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

