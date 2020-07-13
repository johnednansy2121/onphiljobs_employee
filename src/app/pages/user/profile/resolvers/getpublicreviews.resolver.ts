import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {ReviewService} from "../../../../services/review.service";

@Injectable({
  providedIn: 'root'
})
export class GetPublicReviewsResolver implements Resolve<any>{

  constructor(
      private reviewService: ReviewService
  ) { }

  resolve(actRoute:ActivatedRouteSnapshot) {

    return this.reviewService.getPublicReviewsByUsername(actRoute.params.username)
        .then((result: any) => {
          return result.model;
        })
        .catch(err => {return null})
  };

}
