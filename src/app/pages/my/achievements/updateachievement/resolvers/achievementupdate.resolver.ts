import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { AchievementService } from "../../../../../services/achievement.service";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AchievementUpdateResolver implements Resolve<any> {

  constructor(private achievementSrv: AchievementService,
    private router: Router,
    private toaster: ToastrService
  ) { }
  resolve(route: ActivatedRouteSnapshot) {
    console.log(route.params)
    return this.achievementSrv.getAchievementById(route.params.id)
      .then((data: any) => {
        return data.model
      })
      .catch(err => {
        console.log(err)
        this.toaster.error(err.error.message);
        return this.router.navigateByUrl('/my/achievements')
      })
  };
}
