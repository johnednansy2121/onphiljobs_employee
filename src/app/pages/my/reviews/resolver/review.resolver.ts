import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { ReviewService } from 'src/app/services/review.service';


@Injectable({
    providedIn: 'root'
})
export class ReviewDataResolver implements Resolve<any>{

    constructor(
        private reviewSrv: ReviewService
    ) { }

    resolve() {
        return this.reviewSrv.initialize()
            .catch(err => { return null })
    };

}
