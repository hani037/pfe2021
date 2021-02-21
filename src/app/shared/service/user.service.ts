import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { mergeMap, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import {User} from '../model/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  token : string;
  tokensUrl = '/api/v1/tokens';
  usersUrl = '/api/v1/users';

  readonly _userConnected = new BehaviorSubject<User>(null);
  private dataStore: { user: User } = { user : new User()};
  readonly userConnectedObservable = this._userConnected.asObservable();
  userConnected = new User();

  users : User[] = [];

  @Output() userEmitter = new EventEmitter<User>();

  constructor(private http: HttpClient) {

  }

  isLoggedInObservable() : Observable<User> {
    return this.userConnectedObservable;
  }
  logout() {
    this.token = null;
    localStorage.setItem('token', '');
    //Récupération de l'objet
    this._userConnected.next(null);

  }
  createUser(user: User): Promise<User> {
    return this.http.post<User>(this.usersUrl, user).toPromise();
  }
  login(userName: String, password: String): Promise<any> {
    let user = new User();
    user.userName = userName;
    user.password = password;
    return this.http.post(this.tokensUrl,user,{ responseType: 'text'})
      .pipe(
        mergeMap( token => {
          console.log(token);
          this.token = token;
          localStorage.setItem('token', this.token);
          return this.me();
        }),
      ).toPromise();


  }

  me(): Observable<User> {
    return this.http.get<User>(this.tokensUrl+'/me').pipe(map(user => {
      this.dataStore.user = user;
      User.clone( user, this.userConnected);
      this._userConnected.next(this.dataStore.user);
      return user;
    }));
  }

  getToken(): string{
    if(!this.token){
      // const token = this.cookieService.get(this.auth_cookie);
      const token = localStorage.getItem('token');

      token ? this.token = token: this.token = null;
    }
    return this.token;
  }
  async autoLogin() {
    if (this.getToken()) {
      await this.me().toPromise().then(user => {
        return user;
      })
    } else {
      return false;
    }
  }
}
