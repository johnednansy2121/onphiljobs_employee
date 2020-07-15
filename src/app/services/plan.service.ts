import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class PlanService {

    //private api methods
    private API_VERSION = "api/v1/"

    //public api methods
    public planItems = []
    public isInitialized = false

    constructor(private httpClient: HttpClient, private toastSrv: ToastrService) { }

    public initialize() {
        if(this.isInitialized) {
            return Promise.resolve(this.planItems)
        } else {
            return this.getPlan()
                .then((result : any) => {
                    let { model } = result
                    this.planItems = model
                    this.isInitialized = true
                    return this.planItems
                })
                .catch(err => { return err })
        }
    }

   getPlan() {
       return this.httpClient.get(environment.api_path + this.API_VERSION + 'plan').toPromise()
   }
}
