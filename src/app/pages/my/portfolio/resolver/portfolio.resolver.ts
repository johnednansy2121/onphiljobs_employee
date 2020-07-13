import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { PortfolioService } from '../../../../services/portfolio.service';


@Injectable({
    providedIn: 'root'
})
export class PortfolioDataResolver implements Resolve<any>{

    constructor(
        private portfolioSrv : PortfolioService
    ) { }

    resolve() {
        return this.portfolioSrv.initialize()
            .catch(err => { return null })
    };

}
