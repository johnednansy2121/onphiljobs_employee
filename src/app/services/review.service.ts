import { Injectable, ResolvedReflectiveFactory } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {

    //private api methods
    private API_VERSION = "api/v1/"

    //public api methods

    public reviewItems = []
    public isInitialized = false

    constructor(private httpClient: HttpClient, private toastSrv: ToastrService) { }

    public initialize() {
        if(this.isInitialized) return Promise.resolve(this.reviewItems)
        else {
            return this.getMyReviews()
                .then((result: any) => {
                    const { model } = result
                    this.reviewItems = model
                    this.isInitialized = true
                    return this.reviewItems
                })
                .catch(err => err)
        }
    }

    public getMyReviews() {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'my/reviews').toPromise()
    }
    public getPublicReviewsByUsername(username) {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'reviews/public/' + username).toPromise()
    }

    public hideUnhideReview(id: string) {
        return new Promise((resolve, reject) => {
            this.httpClient.get(environment.api_path + this.API_VERSION + 'my/reviews/' + id + '/hideUnhide').toPromise()
                .then((result: any) => {
                    let indexItem = this.reviewItems.findIndex(x => x._id == id)
                    this.reviewItems[indexItem].isDisplayed = !this.reviewItems[indexItem].isDisplayed
                    this.toastSrv.success('Successfully updated review.')
                    resolve()
                })
                .catch(err => {
                    this.toastSrv.error(err.error.message)
                    reject()
                })
        }) 
    }

    public addReview(recipientId: string, review: string) {
        return new Promise((resolve, reject) => {
            this.httpClient.post(environment.api_path + this.API_VERSION + 'reviews', { reviewDescription: review, recipientId }).toPromise()
                .then((result : any) => {
                    const { model, message } = result
                    this.toastSrv.success('Your review is posted. We will notify the user for your review.')
                    resolve(model)
                })
                .catch(err => {
                    this.toastSrv.error(err.error.message)
                    reject()
                })
        })
    }

    public swapOrder(previousPosition: number, nextPosition: number) {
        return new Promise((resolve, reject) => {
            const swappedPosition = this.getSwappingPosition(previousPosition, nextPosition)
            this.httpClient.post(environment.api_path + this.API_VERSION + 'reviews/swap', swappedPosition).toPromise()
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
        let swappingItems = this.reviewItems
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
            this.httpClient.get(environment.api_path + this.API_VERSION + 'achievements/' +  id + '/toggleprotect').toPromise()
                .then((result: any) => {
                    let indexItem = this.reviewItems.findIndex(x => x._id === id)
                    this.reviewItems[indexItem].isProtected = !this.reviewItems[indexItem].isProtected 
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
