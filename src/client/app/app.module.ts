import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import {HttpModule, Jsonp, JsonpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AccountModule } from './account/account.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import {AuthModule} from "./auth/auth.module";
import {AdminModule} from "./admin/admin.module";
import {SellerModule} from "./seller/seller.module";

@NgModule({
  imports: [JsonpModule,BrowserModule, HttpModule, AppRoutingModule,
    AccountModule, HomeModule, AuthModule, AdminModule,SellerModule,SharedModule.forRoot()],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})
export class AppModule { }
