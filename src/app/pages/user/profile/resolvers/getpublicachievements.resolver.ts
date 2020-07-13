import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {AchievementService} from "../../../../services/achievement.service";

@Injectable({
  providedIn: 'root'
})
export class GetPublicAchievementsResolver implements Resolve<any>{

  constructor(
      private achievementService: AchievementService
  ) { }

  resolve(actRoute:ActivatedRouteSnapshot) {

    return this.achievementService.getPublicAchievementsByUsername(actRoute.params.username)
        .then((result: any) => {
          return result.model;
        })
        .catch(err => {return null})
  };

}
