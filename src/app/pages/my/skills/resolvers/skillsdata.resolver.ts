import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { SkillService } from "../../../../services/skill.service";

@Injectable({
  providedIn: 'root'
})
export class SkillsDataResolver implements Resolve<any>{

  constructor(
      private skillsSvc: SkillService
  ) { }

  resolve() {
    return this.skillsSvc.initialize()
        .catch(err => {return null})
  };

}
