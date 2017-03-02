import { Component } from '@angular/core';
import {AccountService} from "../../shared/services/account.service";
import {Observable, Subscription} from "rxjs";
import {Validators, FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent {

  sub: Subscription;
  $accountService: Observable<any>;
  errorMessage:string;
  object : any;
  user: any;
  role:string;
  registerForm: any;


  constructor(private _accountService: AccountService,
              private _formBuilder: FormBuilder,
              private _router: Router){

    this.role = 'Buyer';
  }

  createForm() {
    this.registerForm = this._formBuilder.group({
      'email': ['', [Validators.required]],
      'name': ['', [Validators.required]],
      'password': ['', [Validators.required]],
      'role':[this.role, [Validators.required]]
    });
  }

  ngOnInit(){
    this.createForm();
  }

  ngOnDestroy(){
    if(this.sub)this.sub.unsubscribe();
  }

  changeRole(role:string){
    this.role = role;
  }

  onRegister(){
    const user = new Object({
      email : this.registerForm.value.email,
      name : this.registerForm.value.name,
      password : this.registerForm.value.password,
      role: this.role
    });

    //console.log(user);
    this.$accountService = this._accountService.createAccount(user);
    this.sub = this.$accountService.subscribe((res:any)=>{
       //console.log(res);
        this._router.navigate(['/login']);
    }, error => {this.errorMessage = <any>error.message; console.log(this.errorMessage)}
    );
  }
}
