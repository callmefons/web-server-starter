import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {Subscription, Observable} from "rxjs";
import {storage} from "../shared/helper/storage";
import {Validators, FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {AccountService} from "../shared/services/account.service";

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'sd-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {

  sub: Subscription;
  $authService: Observable<any>;
  errorMessage:string;
  object : any;
  user: any;
  loginForm: any;


  constructor(private _authService: AuthService,
              private _accountService: AccountService,
              private _formBuilder: FormBuilder,
              private _router: Router){
  }

  createForm() {
    this.loginForm = this._formBuilder.group({
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });
  }

  ngOnInit(){
    this.createForm();
  }
  ngOnDestroy(){
    if(this.sub)
      this.sub.unsubscribe();
  }

  onLogin(){
    this.$authService = this._authService.login(this.loginForm.value);
    this.sub = this.$authService.subscribe(
      (res:any)=> {
        this.user = res;
        const role = res.user.role;
        storage.setAuthToken(res.user['token']);
        storage.setRoleToken(res.user['role']);
        storage.setNameToken(res.user['name']);
        localStorage.setItem('user_id', res.user['user_id']);

        //console.log(res);

        if(role == 'Buyer'){
          this._router.navigate(['about']);
        }else if(role == 'Admin') {
          this._router.navigate(['admin']);
        }else {
          this._router.navigate(['seller']);
        }

      },
      error => {
        //console.log(error);
        this.errorMessage = <any>error.message;
        },
    );
  }

  sending: boolean = false;
  forgottenMessage: string;
  emailForgotInput: string;

  onForgotPassword(email: string){

    this.sending = true;
    this.forgottenMessage = 'sending...';

    if (this.validateEmail(email)){
        this._accountService.forgotPassword({email: email})
        .subscribe((res:any) => {
          this.sending = false;
          this.forgottenMessage = res.msg;
          this.emailForgotInput = '';
        }, err => {
          this.forgottenMessage = `${err.msg}`;
        });
    }else {
      this.forgottenMessage = `Your email address is invalid.`;
    }
  }

  cancel(){
    this.forgottenMessage = '';
    this.emailForgotInput = '';
  }

  validateEmail(email:string) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
