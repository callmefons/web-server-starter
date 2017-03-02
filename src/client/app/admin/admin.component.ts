import { Component, OnInit } from '@angular/core';
import { NameListService } from '../shared/name-list/name-list.service';
import {AdminService} from "../shared/services/admin.service";

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css'],
})
export class AdminComponent{

  constructor(){

  }

}
