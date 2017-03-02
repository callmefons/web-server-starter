import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { AccountRoutingModule } from './account-routing.module';
import { RegisterComponent } from "./register/register.component";
import {SharedModule} from "../shared/shared.module";
import {SettingComponent} from "./setting/setting.component";

@NgModule({
  imports: [CommonModule, AccountRoutingModule,SharedModule],
  declarations: [AboutComponent, RegisterComponent, SettingComponent],
  exports: [AboutComponent, RegisterComponent, SettingComponent]
})
export class AccountModule { }
