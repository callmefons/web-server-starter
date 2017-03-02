import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import {RegisterComponent} from "./register/register.component";
import {SettingComponent} from "./setting/setting.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'about', component: AboutComponent },
      { path: 'setting', component: SettingComponent },
      { path: 'register', component: RegisterComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
