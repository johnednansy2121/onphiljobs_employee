import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { JobService } from '../../../../services/job.service';


@Injectable({
    providedIn: 'root'
})
export class JobDataResolver implements Resolve<any>{

    constructor(
        private jobService : JobService
    ) { }

    resolve() {
        return this.jobService.initialize()
            .catch(err => { return null })
    };

}
