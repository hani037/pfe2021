import { CanActivate, ActivatedRouteSnapshot, UrlTree } from "@angular/router";

import {ActivatedRoute, Router, RouterStateSnapshot} from "@angular/router";
import { Injectable } from '@angular/core';

import { Promise } from 'q';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import {UserService} from "../service/user.service";


@Injectable({
  providedIn: 'root'
})
export class ConnectActivate implements CanActivate {
  constructor(private userService: UserService, private router: Router) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {

    return this.userService.userConnectedObservable.pipe(map(userConnected => {
      if (userConnected && userConnected.id && userConnected.enabled) {
        return true;
      }

      this.router.navigate(['/search']);

      return false;
    }));

  }
}
