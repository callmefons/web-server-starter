import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {request} from "../helper/request";
import {storage} from "../helper/storage";

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class AuthService {

  apiUrl : string = 'http://localhost:3000/api/auth/';

  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private _http: Http) {}


  login(user: any): Observable<any> {
    const body = JSON.stringify(user);
    //console.log(body);
    return this._http.post(`${this.apiUrl}login`, body, {headers: request.getJsonHeaders()})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));

  }

  logout() {
    return this._http.post(`${this.apiUrl}logout`,{} ,{headers: request.getAuthorization()})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error));
  }

  isLoggedIn(){
    return !!storage.getAuthToken();
  }

  checkRole(role:string){
    return role === storage.getRoleToken();
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

