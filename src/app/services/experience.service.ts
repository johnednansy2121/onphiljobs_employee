import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ExperienceService {

    //public api variables
    public isInitialized = false;
    public experienceItems = [];

    //private api methods
    private API_VERSION = "api/v1/"

    //public api methods

    constructor(private httpClient: HttpClient, private toastSrv: ToastrService) { }
    public initialize() {

        if (this.isInitialized) {
            return Promise.resolve(this.experienceItems)
        } else {
            return this.getExperiences()
                .then((experienceData: any) => {
                    this.experienceItems.push(...experienceData.model);
                    this.isInitialized = true;
                    return this.experienceItems
                })
                .catch(error => { return error })
        }

    }
    public addManyExperiences(data: FormGroup) {
        return new Promise((resolve, reject) => {
            this.httpClient.post(environment.api_path + this.API_VERSION + 'experiences', data).toPromise()
            .then((result: any) => {
                const { model , message } = result
                this.experienceItems.push(...model)
                this.toastSrv.success(message)
                resolve()
            })
            .catch(err => {
                this.toastSrv.error(err.error.message)
                reject()
            })
        })

    }

    public getExperiences() {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'experiences').toPromise()
    }

    public getExperienceById(id) {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'experiences/' + id).toPromise()
    }

    public getPublicExperienceByUsername(username) {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'experiences/public/' + username).toPromise()
    }

    public updateExperience(data: FormGroup) {
        return new Promise((resolve, reject) => {
            this.httpClient.put(environment.api_path + this.API_VERSION + 'experiences', {
                _id: data.value._id,
                organizationName: data.value.organizationName,
                jobTitle: data.value.jobTitle,
                jobDescription: data.value.jobDescription,
                location: data.value.location,
                dateStarted: data.value.dateStarted,
                dateFinished: data.value.dateFinished
            }).toPromise()
                .then((result: any) => {
                    const { model, message } = result
                    this.toastSrv.success(message)
                    let foundIndex = this.experienceItems.findIndex(x => x._id == model._id)
                    this.experienceItems[foundIndex] = result.model
                    resolve()
                })
                .catch(err => {
                    this.toastSrv.error(err.error.message)
                    reject()
                })
        })
    }

    public deleteExperience(id) {
        return new Promise((resolve, reject) => {
            this.httpClient.delete(environment.api_path + this.API_VERSION + 'experiences/' + id).toPromise()
            .then((result: any) => {
                const { message} = result
                this.toastSrv.success(message)
                this.experienceItems = this.experienceItems.filter(x => x._id != id)
                resolve()
            })
                .catch(err => {
                    this.toastSrv.error(err.error.message)
                    reject()})
        })

    }

    public swapOrder(previousPosition: number, nextPosition: number) {
        return new Promise((resolve, reject) => {
            const swappedPosition = this.getSwappingPosition(previousPosition, nextPosition)
            this.httpClient.post(environment.api_path + this.API_VERSION + 'experiences/swap', swappedPosition).toPromise()
            .then((result : any) => {
                resolve()
            })
            .catch(err => {
                this.toastSrv.error(err.error.message)
                reject()
            })
        })
    }

    public getSwappingPosition(previousPosition, nextPosition) {
        let swappingItems = this.experienceItems
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
            this.httpClient.get(environment.api_path + this.API_VERSION + 'experiences/' +  id + '/toggleprotect').toPromise()
                .then((result: any) => {
                    let indexItem = this.experienceItems.findIndex(x => x._id === id)
                    this.experienceItems[indexItem].isProtected = !this.experienceItems[indexItem].isProtected 
                    this.toastSrv.success(result.message)
                    resolve()
                })
                .catch(err => {
                    this.toastSrv.error(err.error.message)
                    reject()
                })
        })
    }
}
