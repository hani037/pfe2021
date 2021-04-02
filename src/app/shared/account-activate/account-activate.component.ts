import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../model/user";

@Component({
  selector: 'app-account-activate',
  templateUrl: './account-activate.component.html',
  styleUrls: ['./account-activate.component.css']
})
export class AccountActivateComponent implements OnInit {

  ngOnInit(): void {


  }


}
