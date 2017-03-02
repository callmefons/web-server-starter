import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {SellerGuard} from "../auth/seller-guard.service";
import {SellerComponent} from "./seller.component";
import {SellerRoutingModule} from "./seller-routing.module";
import {SellerListComponent} from "./list/list.component";
import {SellerDetailsComponent} from "./details/details.component";

@NgModule({
  imports: [CommonModule, SellerRoutingModule,SharedModule],
  declarations: [SellerComponent,SellerListComponent,SellerDetailsComponent],
  exports: [SellerComponent,SellerListComponent,SellerDetailsComponent],
  providers:[SellerGuard]
})
export class SellerModule { }
