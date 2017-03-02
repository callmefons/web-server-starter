import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../shared/services/admin.service";
import {Router} from "@angular/router";

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-admin',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
})
export class AdminListComponent implements OnInit {

  constructor(private _adminService:AdminService,
  private _router:Router){

  }

  ngOnInit(){
    this.getAllUsers();
  }

  errorMessage:string;
  users:any;

  private getAllUsers() {
    this._adminService.getAllUsers()
      .subscribe((res:any)=>{
        //console.log(res);
        this.users = res.data.user;
      },error => this.errorMessage = <any>error);
  }

  selectedUser:any;

  onSelect(user: Object): void {
    this.selectedUser = user;
  }

  gotoDetail(id:any): void {
    this._router.navigate(['/admin/user/', id]);
  }

  onRouter(link:string){
    this._router.navigate([`admin/${link}`]);
  }


}
