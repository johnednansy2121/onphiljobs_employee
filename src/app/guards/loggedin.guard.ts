import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class LoggedinGuard implements CanActivate {

  constructor(private authService:AuthenticationService, private router:Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {
      console.log("loggedin.guard:      Checking Logged In Status")

      return new Promise((resolve, reject) => {
        this.authService.isTokenValid()
          .then(result =>{
              resolve(true)
          })
          .catch(error => {
              this.authService.clearTokenData();
              resolve(this.router.parseUrl("/auth/login"));
          })
      })
  }
}
