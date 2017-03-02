import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {storage} from "../helper/storage";
import {AccountService} from "../services/account.service";

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})
export class NavbarComponent {

  constructor(private _authService: AuthService,
              private _accountService: AccountService,
              private _router : Router){}

  logout(){
    this._authService.logout()
      .subscribe((res:any)=>{
            if(res.status) {
              storage.removeAuthToken();
              this._router.navigate(['/']);
            }
          },error => console.log(error));
  }

  getMyProfile(){
    this._accountService.getMyProfile()
      .subscribe((res:any)=>{
        console.log(res);
      });
  }
}
