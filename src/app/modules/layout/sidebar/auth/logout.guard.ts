import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
  
  canActivate(): boolean {

    const isLoggedOut = sessionStorage.getItem('token') == null;

    if (isLoggedOut) {
      return false;
    }

    return true;
  }
  
}
