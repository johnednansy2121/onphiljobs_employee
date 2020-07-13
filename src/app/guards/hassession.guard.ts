import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../services/user.service";
import {SessionService} from "../services/session.service";

@Injectable({
  providedIn: 'root'
})
export class HasSessionGuard implements CanActivate {

  constructor(private sessionService: SessionService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("hassession.guard:      Checking if session initialized")

      return new Promise((resolve, reject) => {
      this.sessionService.initializeSession()
          .then(result => {
              if(result) resolve(true)
            //we need to handle this error somehow, send the user to a failed to load page or somethihng
            else resolve(false)
          })
          .catch(error => {
            //we need to handle this error somehow, send the user to a failed to load page or somethihng
            resolve(false);
          })
    })
  }
  
}
