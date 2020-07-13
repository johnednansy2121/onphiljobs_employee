import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { PaymentMethodService } from '../../../../services/paymentmethod.service';


@Injectable({
    providedIn: 'root'
})
export class PaymentMethodResolver implements Resolve<any>{

    constructor(
        private paymentMethodSrv : PaymentMethodService
    ) { }

    resolve() {
        return this.paymentMethodSrv.initialize()
            .catch(err => { return null })
    };

}
