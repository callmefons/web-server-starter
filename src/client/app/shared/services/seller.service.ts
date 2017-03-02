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
export class SellerService {

  apiUrl : string = 'http://localhost:4000/api/seller/';

  constructor(private _http: Http) {}

  getAllUsers(): Observable<any> {
    return this._http.get(`${this.apiUrl}users`, {headers: request.getAuthorization()})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  getUserById(id:any): Observable<any> {
    return this._http.get(`${this.apiUrl}users/${id}`, {headers: request.getAuthorization()})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  editUserById(user:any,user_id:any){
    const body = JSON.stringify(user);
    return this._http.put(`${this.apiUrl}users/${user_id}`,body, {headers: request.getAuthorization()})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  deleteUserById(user_id:any){
    return this._http.delete(`${this.apiUrl}users/${user_id}`, {headers: request.getAuthorization()})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  createNewSeller(user:any){
    const body = JSON.stringify(user);
    return this._http.post(`${this.apiUrl}users`,body, {headers: request.getAuthorization()})
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

