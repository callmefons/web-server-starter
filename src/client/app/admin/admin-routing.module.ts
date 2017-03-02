import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {AdminGuard} from "../auth/admin-guard.service";
import {AdminListComponent} from "./list/list.component";
import {AdminDetailsComponent} from "./details/details.component";
import {CreateNewAdminComponent} from "./create/new-admin.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'admin', component: AdminComponent , canActivate: [AdminGuard],
        children: [
          {path: '', component: AdminListComponent},
          {path: 'user/:id', component: AdminDetailsComponent},
          {path: 'create', component: CreateNewAdminComponent}
        ]}
    ])
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
