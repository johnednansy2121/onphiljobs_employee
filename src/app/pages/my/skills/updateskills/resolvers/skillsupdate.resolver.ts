import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { SkillService } from "../../../../../services/skill.service";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class SkillsUpdateResolver implements Resolve<any> {

  constructor(private skillService: SkillService,
    private router: Router,
    private toaster: ToastrService
  ) { }
  resolve(route: ActivatedRouteSnapshot) {
    console.log(route.params)
    return this.skillService.getSkillsbyId(route.params.id)
      .then((data: any) => {
        return data.model
      })
      .catch(err => {
        console.log(err)
        this.toaster.error(err.error.message);
        return this.router.navigateByUrl('/my/skills')
      })
  };
}
