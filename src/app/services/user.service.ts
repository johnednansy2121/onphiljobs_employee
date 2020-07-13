import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    //private api methods
    private API_VERSION = "api/v1/"

    //public api methods

    constructor(private httpClient: HttpClient) { }

    public hasProfile() {
        return new Promise((resolve, reject) => {
            this.httpClient.get(environment.api_path + this.API_VERSION + 'user')
                .subscribe(
                    (data: any) => {
                        const { model } = data
                        if(model.metadata.hasProfile) resolve(true)
                        else resolve(false)
                    },
                    (error) => {
                        console.log(error)
                        reject(false)
                    }
                )
        })
    }

}
