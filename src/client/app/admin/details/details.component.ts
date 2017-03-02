import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import { Location }               from '@angular/common';
import {AdminService} from "../../shared/services/admin.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {FormBuilder, Validators} from "@angular/forms";

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'sd-admin',
  templateUrl: 'details.component.html',
  styleUrls: ['details.component.css'],
})
export class AdminDetailsComponent implements OnInit {

  constructor(private _formBuilder:FormBuilder,
              private route: ActivatedRoute,
              private location: Location,
              private _adminService:AdminService
              ){}
  user:any;
  editUserForm:any;

  ngOnInit(): void {
    this.createForm();
    this.route.params
      .switchMap((params: Params) => this._adminService.getUserById(+params['id']))
      .subscribe((res:any)=>{
        //console.log(res);
        this.user = res.data.user;
      });
  }

  createForm() {
    this.editUserForm = this._formBuilder.group({
      'name': ['', [Validators.required]]
    });
  }

  errorMessage:string;
  popupMessage: string;
  dismissable: boolean = false;

  onEditUser(){
    this._adminService.editUserById(this.editUserForm.value,this.user.user_id)
      .subscribe((res:any)=>{

        this.popupMessage = res.message;
        this.dismissable = true;

        setTimeout(() => {
          this.dismissable = false;
        }, 3000);

        //console.log(res);
      },error => this.errorMessage = <any>error);
  }

  onDeleteUser(){
    $('#myModal').modal('show')
  }

  DeleteUser(){
    this._adminService.deleteUserById(this.user.user_id)
      .subscribe((res:any)=>{
        //console.log(res);
        $('#myModal').modal('hide');
        this.goBack();
      },error => this.errorMessage = <any>error);
  }

  goBack(): void {
    this.location.back();
  }

}
