import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../shared/services/admin.service";
import {Router} from "@angular/router";
import {SellerService} from "../../shared/services/seller.service";

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-admin',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
})
export class SellerListComponent implements OnInit {

  constructor(private _sellerService:SellerService,
  private _router:Router){

  }

  ngOnInit(){
    this.getAllUsers();
  }

  errorMessage:string;
  users:any;

  private getAllUsers() {
    this._sellerService.getAllUsers()
      .subscribe((res:any)=>{
        console.log(res);
        this.users = res.data.user;
      },error => this.errorMessage = <any>error);
  }

  selectedUser:any;

  onSelect(user: Object): void {
    this.selectedUser = user;
  }

  gotoDetail(id:any): void {
    this._router.navigate(['/seller/user/', id]);
  }

  onRouter(link:string){
    this._router.navigate([`seller/${link}`]);
  }


}
