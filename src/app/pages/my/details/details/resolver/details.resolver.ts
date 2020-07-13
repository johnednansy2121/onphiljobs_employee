import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { ProfileService } from '../../../../../services/profile.service';


@Injectable({
    providedIn: 'root'
})
export class DetailsDataResolver implements Resolve<any>{

    constructor(
        private profileSrv: ProfileService
    ) { }

    resolve() {
        return this.profileSrv.initialize()
            .catch(err => { return null })
    };

}
