import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class PortfolioService {

    //private api methods
    private API_VERSION = "api/v1/"

    //public api methods

    public portfolioItems = []
    public isInitialized = false

    constructor(private httpClient: HttpClient, private toastSrv: ToastrService) { }

    public initialize() {
        if(this.isInitialized) {
            return Promise.resolve(this.portfolioItems)
        } else {
            return this.getPortfolio()
                .then((result: any) => {
                    const { model, message } = result
                    this.portfolioItems = model
                    this.isInitialized = true
                    return this.portfolioItems
                })
                .catch(err => { return err })
        }
    }


    public getPortfolio() {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'portfolio').toPromise()
    }

    public getPortfolioById(id) {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'portfolio/' + id).toPromise()
    }

    public getPublicPortfolioByUsername(username) {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'portfolio/public/' + username).toPromise()
    }

    public addPortfolio(data: FormGroup, imageUrl: string, _tags: string[]) {
        return new Promise((resolve, reject) => {
            this.httpClient.post(environment.api_path + this.API_VERSION + 'portfolio', {
                itemName: data.value.itemName,
                itemImageUrl: imageUrl,
                itemDescription: data.value.itemDescription,
                tags: _tags,
            }).toPromise()
            .then((result: any) => {
                const { model, message } = result
                this.portfolioItems.push(model)
                this.toastSrv.success(message)
                resolve()
            })
            .catch(err => {
                this.toastSrv.error(err.error.message)
                reject()
            })
        })

    }

    public updatePortfolio(data: FormGroup, imageUrl: string, _tags: string[]) {
        return new Promise((resolve, reject) => {
            this.httpClient.put(environment.api_path + this.API_VERSION + 'portfolio', {
                _id: data.value._id,
                itemName: data.value.itemName,
                itemDescription: data.value.itemDescription,
                tags: _tags,
                itemImageUrl: imageUrl
            }).toPromise()
            .then((result: any) => {
                const { model, message } = result
                let index = this.portfolioItems.findIndex(x => x._id == model._id)
                this.portfolioItems[index] = model
                this.toastSrv.success(message)
                resolve()
            })
            .catch(err => {
                this.toastSrv.error(err.error.message)
                reject()
            })
        })

    }

    public removePortfolio(id) {
        return new Promise((resolve, reject) => {
            this.httpClient.delete(environment.api_path + this.API_VERSION + 'portfolio/' + id).toPromise()
            .then((result: any) => {
                const { message } = result
                this.portfolioItems = this.portfolioItems.filter(x => x._id != id)
                this.toastSrv.success(message)
                resolve()
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
            this.httpClient.post(environment.api_path + this.API_VERSION + 'portfolio/swap', swappedPosition).toPromise()
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
        let swappingItems = this.portfolioItems
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
            this.httpClient.get(environment.api_path + this.API_VERSION + 'portfolio/' +  id + '/toggleprotect').toPromise()
                .then((result: any) => {
                    let indexItem = this.portfolioItems.findIndex(x => x._id === id)
                    this.portfolioItems[indexItem].isProtected = !this.portfolioItems[indexItem].isProtected 
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
