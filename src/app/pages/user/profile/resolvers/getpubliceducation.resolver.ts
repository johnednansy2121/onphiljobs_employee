import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {EducationService} from "../../../../services/education.service";

@Injectable({
  providedIn: 'root'
})
export class GetPublicEducationResolver implements Resolve<any>{

  constructor(
      private educationService: EducationService
  ) { }

  resolve(actRoute:ActivatedRouteSnapshot) {

    return this.educationService.getPublicEducationsByUsername(actRoute.params.username)
        .then((result: any) => {
          return result.model;
        })
        .catch(err => {return null})
  };

}
