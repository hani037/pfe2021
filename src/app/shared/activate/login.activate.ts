import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";

import {ActivatedRoute, Router, RouterStateSnapshot} from "@angular/router";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { mergeMap, map, take } from 'rxjs/operators';
import { Promise } from 'q';
import {UserService} from "../service/user.service";

@Injectable({
  providedIn: 'root'
})
export class LoginActivate implements CanActivate {
  constructor(private userService: UserService, private router: Router) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.userService.userConnectedObservable.pipe(map(userConnected => {
      if (!userConnected || !userConnected.id) {
        return true;
      }

      this.router.navigate(['/home']);

      return false;
    }));

  }
}
