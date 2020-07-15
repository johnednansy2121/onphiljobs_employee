import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import * as ProfileActions from '../actions/profile.action'

@Injectable({
    providedIn: 'root'
})
export class SubscriptionService {

    //private api methods
    private API_VERSION = "api/v1/"

    constructor(private httpClient: HttpClient, private toastSrv: ToastrService, private store: Store<AppState>) { }

    subscribe(planId: string, paymentMethodId: string, promoCode: string) {
        return new Promise((resolve, reject) => {
            this.httpClient.post(environment.api_path + this.API_VERSION + 'subscription', {
                planId,
                paymentMethodId,
                promoCode: promoCode.trim()
            }).toPromise()
            .then((result: any) => {
                const { message, model } = result
                this.store.dispatch(new ProfileActions.SetProfile(model))
                this.toastSrv.success(message)
                resolve()
            })
            .catch(err => {
                this.toastSrv.error(err.error.message)
                reject()
            })
        })
    }

    unsubscribe() {
        return new Promise((resolve, reject) => {
            this.httpClient.get(environment.api_path + this.API_VERSION + 'subscription/unsubscribe')
            .toPromise()
            .then((result: any) => {
                const { message, model } = result
                this.store.dispatch(new ProfileActions.SetProfile(model))
                this.toastSrv.success(message)
                resolve()
            })
                .catch(err => {
                this.toastSrv.error(err.error.message)
                reject()
            })
        })
    }
}
