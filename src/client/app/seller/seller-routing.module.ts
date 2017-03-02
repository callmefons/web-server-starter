import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {SellerComponent} from "./seller.component";
import {SellerListComponent} from "./list/list.component";
import {SellerDetailsComponent} from "./details/details.component";
import {SellerGuard} from "../auth/seller-guard.service";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'seller', component: SellerComponent , canActivate: [SellerGuard],
        children: [
          {path: '', component: SellerListComponent},
          {path: 'user/:id', component: SellerDetailsComponent}
        ]}
    ])
  ],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
