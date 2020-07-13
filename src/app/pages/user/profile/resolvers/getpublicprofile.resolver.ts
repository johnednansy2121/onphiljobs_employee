import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {ProfileService} from "../../../../services/profile.service";

@Injectable({
  providedIn: 'root'
})
export class GetPublicProfileResolver implements Resolve<any>{

  constructor(
      private profileService: ProfileService
  ) { }

  resolve(actRoute:ActivatedRouteSnapshot) {

    return this.profileService.getProfileByUsername(actRoute.params.username)
        .then((result: any) => {
            return result.model;
        })
        .catch(err => {return null})
  };

}
