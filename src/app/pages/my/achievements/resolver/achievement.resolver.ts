import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { AchievementService } from '../../../../services/achievement.service';


@Injectable({
    providedIn: 'root'
})
export class AcheivementDataResolver implements Resolve<any>{

    constructor(
        private achievementSrv : AchievementService
    ) { }

    resolve() {
        return this.achievementSrv.initialize()
            .catch(err => { return null })
    };

}
