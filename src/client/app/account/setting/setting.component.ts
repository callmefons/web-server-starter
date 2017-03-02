import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../shared/services/account.service";
import {Observable} from "rxjs";
import {Validators, FormBuilder} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {storage} from "../../shared/helper/storage";
import {Router} from "@angular/router";
declare var $: any;
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-setting',
  templateUrl: 'setting.component.html',
  styleUrls: ['setting.component.css']
})
export class SettingComponent implements OnInit{

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


  msgPassword : string;
  errorMessage: string;
  dismissable: boolean = false;

  onUpdatePassword(){

    this.errorMessage = null;

    this._accountService.updatePassword(this.updatePasswordForm.value)
      .subscribe((res:any)=>{
        //console.log(res);

        this.dismissable = true;
        this.msgPassword = res.message;

        setTimeout(() => {
          this.dismissable = false;
        }, 3000);


    },error => {
        this.errorMessage = <any>error.message;
      });
  }

  onDeactivateAccount(){
    $('#myModal').modal('show')
  }

  DeactivateAccount(){
    this._accountService.deactivateAccount()
      .subscribe((res:any)=>{
        //console.log(res);
        $('#myModal').modal('hide');
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
