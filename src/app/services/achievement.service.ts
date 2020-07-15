import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class AchievementService {

    //private api methods
    private API_VERSION = "api/v1/"

    //public api methods
    public achievementItems = []
    public isInitialized = false

    constructor(private httpClient: HttpClient, private toastSrv: ToastrService) { }

    public initialize() {
        if(this.isInitialized) {
            return Promise.resolve(this.achievementItems)
        } else {
            return this.getAchievements()
                .then((result : any) => {
                    let { model } = result
                    this.achievementItems = model
                    this.isInitialized = true
                    return this.achievementItems
                })
                .catch(err => { return err })
        }
    }

    public addManyAchievements(data) {
        return new Promise((resolve, reject) => {
            this.httpClient.post(environment.api_path + this.API_VERSION + 'achievements', data)
            .toPromise()
            .then((result: any) => {
                const { model, message } =result
                this.achievementItems.push(...model)
                this.toastSrv.success(message)
                resolve()
            })
            .catch(err =>{ 
                this.toastSrv.error(err.error.message)
                reject()})
        })
    }

    public getAchievements() {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'achievements').toPromise()
    }

    public getAchievementById(id) {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'achievements/' + id).toPromise()
    }

    public getPublicAchievementsByUsername(username) {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'achievements/public/' + username).toPromise()
    }

    public addAchievement(data: FormGroup) {
        return this.httpClient.post(environment.api_path + this.API_VERSION + 'achievements', {
            achievementName: data.value.achievementName,
            achievementDescription: data.value.achievementDescription,
            dateStarted: data.value.dateStarted,
            dateFinished: data.value.dateFinished
        }).toPromise()
        .catch(err => {
            this.toastSrv.error(err.error.message)
            })
    }

    public updateAchievement(data: FormGroup) {
        return new Promise((resolve, reject) => {
            this.httpClient.put(environment.api_path + this.API_VERSION + 'achievements', {
                _id: data.value._id,
               achievementName: data.value.achievementName,
               achievementDescription: data.value.achievementDescription,
               dateStarted: data.value.dateStarted,
               dateFinished: data.value.dateFinished
            })
            .toPromise()
            .then((result: any) => {
                const { model, message } = result
                this.achievementItems = this.achievementItems.filter(achievement => achievement._id != model._id)
                this.achievementItems.push(model)
                this.toastSrv.success(message)
                resolve()
            })
            .catch(err =>{ 
                this.toastSrv.error(err.error.message)
                reject()})
        })
    }

    public deleteAchievement(id) {
        return new Promise((resolve, reject) => {
            this.httpClient.delete(environment.api_path + this.API_VERSION + 'achievements/' + id)
            .toPromise()
            .then((result: any) => {
                const { message } = result
                this.toastSrv.success(message)
                this.achievementItems = this.achievementItems.filter(x => x._id != id)
                resolve()
            })
            .catch(err => {
                this.toastSrv.error(err.error.message)
                reject() })
        })
    }

    public swapOrder(previousPosition: number, nextPosition: number) {
        return new Promise((resolve, reject) => {
            const swappedPosition = this.getSwappingPosition(previousPosition, nextPosition)
            console.log(swappedPosition)
            this.httpClient.post(environment.api_path + this.API_VERSION + 'achievements/swap', swappedPosition).toPromise()
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
        let swappingItems = this.achievementItems
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
        // swappingItems[previousPosition] = swappedItem

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
            this.httpClient.get(environment.api_path + this.API_VERSION + 'achievements/' +  id + '/toggleprotect').toPromise()
                .then((result: any) => {
                    let indexItem = this.achievementItems.findIndex(x => x._id === id)
                    this.achievementItems[indexItem].isProtected = !this.achievementItems[indexItem].isProtected 
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
