import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { ExperienceService } from '../../../../services/experience.service';


@Injectable({
    providedIn: 'root'
})
export class ExperienceDataResolver implements Resolve<any>{

    constructor(
        private experienceService : ExperienceService
    ) { }

    resolve() {
        return this.experienceService.initialize()
            .catch(err => { return null })
    };

}
