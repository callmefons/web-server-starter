import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {AuthService} from "../shared/services/auth.service";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [CommonModule, AuthRoutingModule, SharedModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [AuthService]
})
export class AuthModule { }
