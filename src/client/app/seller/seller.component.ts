import { Component, OnInit } from '@angular/core';
import { NameListService } from '../shared/name-list/name-list.service';
import {AdminService} from "../shared/services/admin.service";

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-seller',
  templateUrl: 'seller.component.html',
  styleUrls: ['seller.component.css'],
})
export class SellerComponent{

  constructor(){

  }

}
