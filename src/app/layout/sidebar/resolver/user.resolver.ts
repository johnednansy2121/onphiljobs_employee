import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { ProfileService } from 'src/app/services/profile.service';


@Injectable({
    providedIn: 'root'
})
export class ProfileDataResolver implements Resolve<any>{

    constructor(
        private profileSrv : ProfileService 
    ) { }

    resolve() {
        return this.profileSrv.initialize()
            .catch(err => { return null })
    };

}
