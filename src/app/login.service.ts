import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginStatus = new BehaviorSubject<boolean>(false);
  log = this.loginStatus.asObservable();

  constructor() { }

  loggedIn(){
    this.loginStatus.next(true);
  }
  loggedOut(){
    this.loginStatus.next(false);
  }
}
