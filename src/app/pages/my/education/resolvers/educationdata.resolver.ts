import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import {EducationService} from "../../../../services/education.service";

@Injectable({
  providedIn: 'root'
})
export class EducationDataResolver implements Resolve<any>{

  constructor(
    private educationSvc: EducationService
  ) { }

  resolve() {
    return this.educationSvc.initialize()
      .catch(err => {return null})
  };

}
