import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from "@angular/router";
import { Observable, empty } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PrivateProfileResolver implements Resolve<any>{

  constructor(
    private service: ProfileService,
    private router: Router
  ) { }

  resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.service.getPrivateProfile(route.paramMap.get('username'), route.paramMap.get('code'))
        .pipe(
            catchError((error) => {
                return this.router.navigateByUrl('/')
            }) 
        )
  };

}
