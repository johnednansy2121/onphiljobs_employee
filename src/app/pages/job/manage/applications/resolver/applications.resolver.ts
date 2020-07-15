import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { JobService } from '../../../../../services/job.service';


@Injectable({
    providedIn: 'root'
})
export class ApplicationsDataResolver implements Resolve<any>{

    applicantQuery = {
        pageNum: 1,
        pageSize: 10,
        orderBy: 'metadata.dateCreated desc',
    }
    constructor(
        private jobService : JobService
    ) { }

    resolve() {
        return this.jobService.fetchApplications(this.applicantQuery)
            .catch(err => { return null })
    };

}
