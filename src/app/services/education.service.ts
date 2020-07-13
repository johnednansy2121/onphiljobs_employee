import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { FormGroup } from '@angular/forms';
import {ToastrService} from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export class EducationService {

    //private api variables
    private API_VERSION = "api/v1/";

    //public api variables
    public isInitialized = false;
    public educationItems = [];

    constructor(
        private httpClient: HttpClient,
        private toaster:ToastrService
    ) { }

    public initialize () {

        if (this.isInitialized){
            return Promise.resolve(this.educationItems)
        }else{
            return this.getEducation()
                .then((educationData: any) => {
                    this.educationItems.push(...educationData.model);
                    this.isInitialized = true;
                    return this.educationItems
                })
                .catch(error => {return error})
        }

    }

    //Create
    public addEducation(data) {
        return this.httpClient.post(environment.api_path + this.API_VERSION + 'education', data).toPromise()
            .then((results: any) => {
                this.toaster.success('Successfully added education data.')
                this.educationItems.push(...results.model)
            })
            .catch(err => {
                this.toaster.error(err.error.message)
            })
    }

    //Read
    public getEducation () {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'education').toPromise()
    }

    public getEducationById(id) {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'education/' + id).toPromise()
    }

    public getPublicEducationsByUsername(username) {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'education/public/' + username).toPromise()
    }

    //Update
    public updateEducation(data: FormGroup) {
        return this.httpClient.put(environment.api_path + this.API_VERSION + 'education', {
            _id: data.value._id,
            institutionName: data.value.institutionName,
            dateStarted: data.value.dateStarted,
            dateFinished: data.value.dateFinished,
            notes: data.value.notes
        }).toPromise()
            .then((result: any) => {
                let foundIndex = this.educationItems.findIndex(x => x._id == result.model._id)
                this.educationItems[foundIndex] = result.model
                this.toaster.success(result.message)
            })
            .catch(err => {
                this.toaster.error(err.error.message)
            })
    }

    //Delete
    public removeEducation(id) {
        return this.httpClient.delete(environment.api_path + this.API_VERSION + 'education/' + id).toPromise()
            .then((result:any) => {
                 this.toaster.success(result.message);
                 this.educationItems = this.educationItems.filter(x => x._id !== id)
            }).catch(err => {
                this.toaster.error(err.error.message)
            })
    }

    public swapOrder(previousPosition: number, nextPosition: number) {
        return new Promise((resolve, reject) => {
            const swappedPosition = this.getSwappingPosition(previousPosition, nextPosition)
            this.httpClient.post(environment.api_path + this.API_VERSION + 'education/swap', swappedPosition).toPromise()
            .then((result : any) => {
                resolve()
            })
            .catch(err => {
                this.toaster.error(err.error.message)
                reject()
            })
        })
    }

    public getSwappingPosition(previousPosition, nextPosition) {
        let swappingItems = this.educationItems
        let previousItem = swappingItems[nextPosition]
        swappingItems[nextPosition] = swappingItems[previousPosition]

        const repititionNumber = nextPosition > previousPosition ? nextPosition - previousPosition : previousPosition - nextPosition
        let nextIndex = nextPosition
        let nextSwappedItem
        for(let i = 1; i <= repititionNumber; i ++) {
            if(nextPosition > previousPosition) {
                nextIndex -= 1
            } else if (nextPosition < previousPosition) nextIndex += 1
            nextSwappedItem = swappingItems[nextIndex]
            swappingItems[nextIndex] = previousItem
            previousItem = nextSwappedItem 
        }

        let result = []
        for(let i = 0; i < swappingItems.length; i++ ) {
            result.push({
                id: swappingItems[i]._id,
                position: i
            })
        }

        return result
    }

    public protectRoute(id: string) {
        return new Promise((resolve, reject) => {
            this.httpClient.get(environment.api_path + this.API_VERSION + 'education/' +  id + '/toggleprotect').toPromise()
                .then((result: any) => {
                    let indexItem = this.educationItems.findIndex(x => x._id === id)
                    this.educationItems[indexItem].isProtected = !this.educationItems[indexItem].isProtected 
                    this.toaster.success(result.message)
                    resolve()
                })
                .catch(err => {
                    this.toaster.error(err.error.message)
                    reject()
                })
        })
    }
}
