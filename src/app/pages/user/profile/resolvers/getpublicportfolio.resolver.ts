import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {PortfolioService} from "../../../../services/portfolio.service";

@Injectable({
  providedIn: 'root'
})
export class GetPublicPortfolioResolver implements Resolve<any>{

  constructor(
      private portfolioService: PortfolioService
  ) { }

  resolve(actRoute:ActivatedRouteSnapshot) {

    return this.portfolioService.getPublicPortfolioByUsername(actRoute.params.username)
        .then((result: any) => {
          return result.model;
        })
        .catch(err => {return null})
  };

}
