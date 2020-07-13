import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { ExperienceService } from "../../../../../services/experience.service";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ExperienceUpdateResolver implements Resolve<any> {

  constructor(private experienceSrv: ExperienceService,
    private router: Router,
    private toaster: ToastrService
  ) { }
  resolve(route: ActivatedRouteSnapshot) {
    console.log(route.params)
    return this.experienceSrv.getExperienceById(route.params.id)
      .then((data: any) => {
        return data.model
      })
      .catch(err => {
        console.log(err)
        this.toaster.error(err.error.message);
        return this.router.navigateByUrl('/my/experiences')
      })
  };
}
