import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminComponent} from "./admin.component";
import {AdminGuard} from "../auth/admin-guard.service";
import {AdminListComponent} from "./list/list.component";
import {AdminDetailsComponent} from "./details/details.component";
import {CreateNewAdminComponent} from "./create/new-admin.component";

@NgModule({
  imports: [CommonModule, AdminRoutingModule,SharedModule],
  declarations: [AdminComponent,AdminListComponent,AdminDetailsComponent,CreateNewAdminComponent],
  exports: [AdminComponent,AdminListComponent,AdminDetailsComponent,CreateNewAdminComponent],
  providers:[AdminGuard]
})
export class AdminModule { }
