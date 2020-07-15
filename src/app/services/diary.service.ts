import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class DiaryService {

    //private api methods
    private API_VERSION = "api/v1/"

    //public api methods

    public diaryItems = []
    public isInitialized = false;

    constructor(private httpClient: HttpClient, private toastSrv: ToastrService) { }
    public initialize() {
        if (this.isInitialized) {
            return Promise.resolve(this.diaryItems)
        } else {
            return this.getDiaries()
                .then((result: any) => {
                    let { model } = result
                    this.diaryItems = model
                    this.isInitialized = true;
                    return this.diaryItems
                })
                .catch(err => { return err })
        }
    }

    public createDiary(data) {
        return new Promise((resolve, reject) => {
            this.httpClient.post(environment.api_path + this.API_VERSION + 'diary', { title: data.value.title.trim(), body: data.value.body.trim() }).toPromise()
            .then((result: any) => {
                this.diaryItems.push(result.model)
                this.toastSrv.success(result.message)
                resolve()
            })
            .catch(err => { 
                this.toastSrv.error(err.error.message)
                reject() })
        })
    }

    public getDiaries() {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'diary/listall').toPromise();
    }

    public deleteDiaryEntry(id) {
        return new Promise((resolve, reject) => {
            this.httpClient.delete(environment.api_path + this.API_VERSION + 'diary/' + id)
                .toPromise()
                .then((result: any) => {
                    const { message } = result
                    this.toastSrv.success(message)
                    this.diaryItems = this.diaryItems.filter(x => x._id != id)
                    resolve()
                })
                .catch(err => {
                    this.toastSrv.error(err.error.message)
                    reject() })
        })
    }

    public getDiaryById(id) {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'diary/' + id ).toPromise();
    }

    public updateDiary(data: FormGroup) {
        return new Promise((resolve, reject) => {
            this.httpClient.put(environment.api_path + this.API_VERSION + 'diary', {
                _id: data.value._id,
                title: data.value.title.trim(),
                body: data.value.body.trim(),
            })
                .toPromise()
                .then((result: any) => {
                    const { model, message } = result
                    this.diaryItems = this.diaryItems.filter(diary => diary._id != model._id)
                    this.diaryItems.push(model)
                    this.toastSrv.success(message)
                    resolve()
                })
                .catch(err => {
                    this.toastSrv.error(err.error.message)
                    reject() })
        })
    }
}
