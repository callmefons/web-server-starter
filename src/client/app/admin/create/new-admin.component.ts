import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../shared/services/admin.service";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {Location} from "@angular/common";

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-admin',
  templateUrl: 'new-admin.component.html',
  styleUrls: ['new-admin.component.css'],
})
export class CreateNewAdminComponent implements OnInit {

  constructor(
    private _formBuilder:FormBuilder,
    private _adminService:AdminService,
    private location:Location,
  private _router:Router){

  }

  ngOnInit(){

      this.createForm();
  }

  errorMessage:string;
  createForm() {
    this.createNewAdminForm = this._formBuilder.group({
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]],
      'name': ['', [Validators.required]]
    });
  }

  createNewAdminForm:any;

  onCreateNewAdmin(){
    this._adminService.createNewAdmin(this.createNewAdminForm.value)
      .subscribe((res:any)=>{
        this.createNewAdminForm.reset();
        this.location.back();
      },error => this.errorMessage = <any>error);
  }

}
