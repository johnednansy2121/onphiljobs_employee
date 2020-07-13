import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { PlanService } from '../../../../services/plan.service';


@Injectable({
    providedIn: 'root'
})
export class PlanDataResolver implements Resolve<any>{

    constructor(
        private planSrv : PlanService
    ) { }

    resolve() {
        return this.planSrv.initialize()
            .catch(err => { return null })
    };

}
