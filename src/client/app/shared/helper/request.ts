import { storage } from './storage';
import { Http, Headers, Response } from '@angular/http';
class Request {

  getAuthorization(){
    let headers = new Headers();
    headers.append('Authorization', storage.getAuthToken());
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  getJsonHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  getxhrHeaders(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('X-Requested-With','XMLHttpRequest');
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');
    headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Request-With');
    headers.append('Access-Control-Allow-Credentials', 'true');
    return {headers};
  }
}
export const request = new Request();
