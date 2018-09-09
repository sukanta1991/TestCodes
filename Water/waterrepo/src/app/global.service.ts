import { Injectable, Inject } from '@angular/core';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService) { }

  setUserSignIn(): void {
    let key = 'atserveuser';
    let val = 'admin';
    this.setSession(key, val);
  }

  setUserSignOut(): void {
    let key = 'atserveuser';
    let val = 'notadmin';
    this.setSession(key, val);
  }

  setSession(key, val): void {
    this.storage.set(key, val);
  }

  isUserSignIn() {
    let key = 'atserveuser'
    let user = this.storage.get(key);

    if (user == 'admin'){
      return true;
    }
    else{
      return false;
    }
  }

}
