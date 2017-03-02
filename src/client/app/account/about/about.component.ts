import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../shared/services/account.service";
import {Observable} from "rxjs";
import {Validators, FormBuilder} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {storage} from "../../shared/helper/storage";
import {Router} from "@angular/router";

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.css']
})
export class AboutComponent implements OnInit{

  sub:any;
  user:any;
  $accountService:Observable<any>;
  editProfileForm:any;
  updatePasswordForm:any;

  editProfile: boolean = false;

  constructor(
    private _formBuilder:FormBuilder,
    private _authService:AuthService,
    private _router:Router,
    private _accountService: AccountService){
  }

  ngOnInit(){
    this.createForm();
    this.getMyProfile();
  }

  createForm() {
    this.editProfileForm = this._formBuilder.group({
      'name': ['', [Validators.required]]
    });
    this.updatePasswordForm = this._formBuilder.group({
      'oldPassword': ['', Validators.required],
      'newPassword': ['', Validators.required]
    });
  }

  private getMyProfile() {
    this.$accountService = this._accountService.getMyProfile();
    this.sub = this.$accountService.subscribe((res:any)=>{
     this.user = res.data['user'];
      //console.log(this.user);
    });
  }

  onEditProfile(){
    this.$accountService = this._accountService.editMyProfile(this.editProfileForm.value);
    this.sub = this.$accountService.subscribe((res:any)=>{
      this.editProfile = false;
      this.getMyProfile();
    });
    //console.log(this.editProfileForm.value);
  }

  msgPassword : string;
  errorMessage: string;
  dismissable: boolean = false;
  onUpdatePassword(){
    this._accountService.updatePassword(this.updatePasswordForm.value)
      .subscribe((res:any)=>{
        //console.log(res);
        this.msgPassword = res.message;
    },error => {
        this.errorMessage = <any>error.message;
      });
  }

    onDeactivateAccount(){
      this._accountService.deactivateAccount()
        .subscribe((res:any)=>{
          //console.log(res);
          this.msgPassword = res.message;
          this.logout();
        },error => {
          this.errorMessage = <any>error.message;
        });
  }

  logout(){
    this._authService.logout()
      .subscribe((res:any)=>{
        if(res.status) {
          storage.removeAuthToken();
          this._router.navigate(['/']);
        }
      },error => console.log(error));
  }

}
