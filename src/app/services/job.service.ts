import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { FormGroup } from '@angular/forms';
import {ToastrService} from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export class JobService {

    //private api variables
    private API_VERSION = "api/v1/";

    //public api variables
    public isInitialized = false;
    public jobItems = [];

    constructor(
        private httpClient: HttpClient,
        private toaster:ToastrService
    ) { }

    public initialize () {

        if (this.isInitialized){
            return Promise.resolve(this.jobItems)
        }else{
            const fetchJob = {
                filter: `contains`,
                pageNum: 1,
                pageSize: 10,
                orderBy: 'metadata.dateCreated desc'
            }
            return this.fetchJobs(fetchJob)
                .then((res: any) => {
                    this.jobItems.push(res.items);
                    console.log(res);   
                    this.isInitialized = true;
                    return this.jobItems
                })
                .catch(error => {return error})
        }

    }

    //Fetch Jobs
    public fetchJobs(searchQuery) {
        const params = new HttpParams()
        .set('$filter', searchQuery.filter)
        .set('$pageNum', searchQuery.pageNum)
        .set('$pageSize', searchQuery.pageSize)
        .set('$orderBy', searchQuery.orderBy);
        console.log(params)
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'jobs',{params}).toPromise()
    }

    public fetchJobById(id: any) {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'jobs/' + id).toPromise()
    }

    public applyForJob(id: any) {
        const _id = {
            id: id
        }
        return this.httpClient.post(environment.api_path + this.API_VERSION + 'jobs/' + id  +'/apply', _id).toPromise()
        .then((res: any) => {
            console.log(res);
            this.toaster.success(res.message);
        })
        .catch(error => {
            this.toaster.error(error.error.message);
            return error
        })
    }
}
