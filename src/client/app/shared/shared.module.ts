import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NameListService } from './name-list/name-list.service';
import {AuthService} from "./services/auth.service";
import {AccountService} from './services/account.service';
import {Jsonp, ConnectionBackend} from "@angular/http";
import {AdminService} from "./services/admin.service";
import {SellerService} from "./services/seller.service";

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ToolbarComponent, NavbarComponent],
  exports: [
    ReactiveFormsModule,
    ToolbarComponent, NavbarComponent,
    CommonModule, FormsModule, RouterModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService,
        AccountService,
        AdminService,
        SellerService,
        NameListService]
    };
  }
}
