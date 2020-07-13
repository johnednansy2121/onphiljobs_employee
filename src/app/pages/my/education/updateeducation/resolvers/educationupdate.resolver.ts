import { Injectable } from '@angular/core';
import { EducationService } from "../../../../../services/education.service";
import {ActivatedRouteSnapshot, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class EducationUpdateResolver {

  constructor(
      private educationSvc: EducationService,
      private router:Router,
      private toaster:ToastrService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    console.log(route.params)
    return this.educationSvc.getEducationById(route.params.id)
        .then((data:any) => {
          return data.model
        })
        .catch(err => {
          console.log(err)
          this.toaster.error(err.error.message);
          return this.router.navigateByUrl('/my/education')
        })
  };

}
