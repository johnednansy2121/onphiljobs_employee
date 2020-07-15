import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { FormGroup } from '@angular/forms';
import {ToastrService} from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export class SkillService {

    //private api methods
    private API_VERSION = "api/v1/"

    //public api methods
    public isInitialized = false;
    public skillItems = [];

    constructor(
        private httpClient: HttpClient,
        private toaster:ToastrService
    ) { }

    public initialize(){
        console.log("SkillService.initialize()")
        if(this.isInitialized){
            return Promise.resolve(this.skillItems);
        }else{
            return this.getSkills()
                .then((skillData: any) => {
                    this.skillItems.push(...skillData.model);
                    this.isInitialized = true;
                    return this.skillItems
                })
                .catch(error => {return error})

        }
    }

    //create
    public addOneOrManySkills(data) {
        return this.httpClient.post(environment.api_path + this.API_VERSION + 'skills', data).toPromise()
            .then((results: any) => {
                const { model, message } = results
                this.toaster.success(message)
                this.skillItems.push(...results.model)
            })
            .catch(err => {
                this.toaster.error(err.error.message)
            })
    }

    //read
    public getSkills() {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'skills').toPromise()
    }

    public getSkillsbyId(id) {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'skills/' + id).toPromise()
    }

    public getPublicSkillsByUsername(username) {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'skills/public/' + username).toPromise()
    }

    //update
    public updateSkill(data: FormGroup) {
        return this.httpClient.put(environment.api_path + this.API_VERSION + 'skills', {
            _id: data.value._id,
           skillName: data.value.skillName,
           skillLevel: data.value.skillLevel,
           yearsOfExperience: data.value.yearsOfExperience,
           notes: data.value.notes
        }).toPromise()
            .then((result: any) => {
                let foundIndex = this.skillItems.findIndex(x => x._id == result.model._id)
                this.skillItems[foundIndex] = result.model
                this.toaster.success(result.message);
            })
            .catch(err => {
                this.toaster.error(err.error.message)
            })
    }

    //delete
    public removeSkill(id) {
        return this.httpClient.delete(environment.api_path + this.API_VERSION + 'skills/' + id).toPromise()
            .then((result: any) => {
                this.toaster.success(result.message);
                this.skillItems = this.skillItems.filter(x => x._id !== id)
            })
            .catch(err => {
                this.toaster.error(err.error.message)
            })
    }

    public swapOrder(previousPosition: number, nextPosition: number) {
        return new Promise((resolve, reject) => {
            const swappedPosition = this.getSwappingPosition(previousPosition, nextPosition)
            this.httpClient.post(environment.api_path + this.API_VERSION + 'skills/swap', swappedPosition).toPromise()
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
        let swappingItems = this.skillItems
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
            this.httpClient.get(environment.api_path + this.API_VERSION + 'skills/' +  id + '/toggleprotect').toPromise()
                .then((result: any) => {
                    let indexItem = this.skillItems.findIndex(x => x._id === id)
                    this.skillItems[indexItem].isProtected = !this.skillItems[indexItem].isProtected 
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
