import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class PaymentMethodService {

    //private api methods
    private API_VERSION = "api/v1/"

    //public api methods
    public paymentMethodItems = []
    public isInitialized = false

    constructor(private httpClient: HttpClient, private toastSrv: ToastrService) { }

    public initialize() {
        if(this.isInitialized) {
            return Promise.resolve(this.paymentMethodItems)
        } else {
            return this.getPaymentMethods()
                .then((result : any) => {
                    let { model } = result
                    this.paymentMethodItems = model
                    this.isInitialized = true
                    return this.paymentMethodItems
                })
                .catch(err => { return err })
        }
    }

   getPaymentMethods() {
       return this.httpClient.get(environment.api_path + this.API_VERSION + 'paymentmethod').toPromise()
   }

   addPaymentMethod(data: FormGroup) {
       return new Promise((resolve, reject) => {
           this.httpClient.post(environment.api_path + this.API_VERSION + 'paymentmethod', {
                accountName: data.value.accountName,
                cardNumber: data.value.cardNumber,
                expiryMonth: data.value.expiryMonth,
                expiryYear: data.value.expiryYear,
                cvc: data.value.cvc,
                address1: data.value.address1,
                address2: data.value.address2,
                city: data.value.city,
                state: data.value.state,
                postalCode: data.value.postalCode
           }).toPromise()
           .then((result:any) => {
               const { message, model } = result
               this.paymentMethodItems.push(model)
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
