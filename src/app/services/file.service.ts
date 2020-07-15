import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class FileService {

    //private api methods
    private API_VERSION = "api/v1/"

    //public api methods

    constructor(private httpClient: HttpClient) { }

    public uploadDisplayPhoto(data) {
        let formData = new FormData()
        formData.append('displayPhoto', data)
        return this.httpClient.post(environment.api_path + this.API_VERSION + 'files/displayPhoto', formData)
    }

    public uploadImage(data) {
        return this.httpClient.post(environment.api_path + this.API_VERSION + 'files/image', data)
    }
}
