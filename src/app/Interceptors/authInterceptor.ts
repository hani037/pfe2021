import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpResponse, HttpRequest, HttpInterceptor } from '@angular/common/http';


import { catchError, retry } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import {UserService} from '../shared/service/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.userService.getToken();
    if (token) {
      return next.handle(
        req.clone({
          headers: req.headers.append('Authorization', 'Bearer ' + token)
        })
      );
    }
    console.log(req);
    return next.handle(req);
  }

}
