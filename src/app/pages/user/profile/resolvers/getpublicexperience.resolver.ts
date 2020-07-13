import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {ExperienceService} from "../../../../services/experience.service";

@Injectable({
  providedIn: 'root'
})
export class GetPublicExperienceResolver implements Resolve<any>{

  constructor(
      private experienceService: ExperienceService
  ) { }

  resolve(actRoute:ActivatedRouteSnapshot) {

    return this.experienceService.getPublicExperienceByUsername(actRoute.params.username)
        .then((result: any) => {
          return result.model;
        })
        .catch(err => {return null})
  };

}
