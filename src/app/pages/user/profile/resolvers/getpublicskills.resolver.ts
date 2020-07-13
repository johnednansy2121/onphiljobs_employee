import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {SkillService} from "../../../../services/skill.service";

@Injectable({
  providedIn: 'root'
})
export class GetPublicSkillsResolver implements Resolve<any>{

  constructor(
      private skillsService: SkillService,
  ) { }

  resolve(actRoute:ActivatedRouteSnapshot) {

    return this.skillsService.getPublicSkillsByUsername(actRoute.params.username)
        .then((result: any) => {
          return result.model;
        })
        .catch(err => {return null})
  };

}
