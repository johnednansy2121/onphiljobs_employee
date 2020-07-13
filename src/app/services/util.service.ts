import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    private API_VERSION = "api/v1/"

    //public api methods
    constructor(
        private httpClient: HttpClient
    ) { }

    public getCountries() {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'utility/countries').toPromise()
    }
}
