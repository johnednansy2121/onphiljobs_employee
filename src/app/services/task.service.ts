import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import * as moment from 'moment';
import { resolve } from 'url';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    //private api methods
    private API_VERSION = "api/v1/"

    public isInitialized = false
    public taskItems = []
    public tagItems = []
    public filteredTasks = [];
    //public api methods
    constructor(
        private httpClient: HttpClient,
        private toaster:ToastrService,
        private fb:FormBuilder
    ) { }

    public initialize() {
        if(this.isInitialized) {
            return Promise.resolve(this.taskItems)
        } else {
            return this.getTasks('', '-metadata.dateCreated')
                .then((result : any) => {
                    let { model } = result
                    model = this.constructDisplayedDate(model)
                    console.log(model)
                    this.isInitialized = true
                    let tags = []
                    model.forEach(item => {
                        tags.push(...item.tags.filter(x => !tags.includes(x)))
                    })
                    this.tagItems = tags
                    this.taskItems.push(...model)
                    this.filteredTasks = this.taskItems.filter(x => x.isCompleted != true)
                    return this.taskItems
                })
                .catch(error => { return error })
        }
    }

    private constructDisplayedDate = (model) => {
        let result = []
        model.forEach(x => {
            result.push({
                ...x,
                displayCreated: `Created ${moment(new Date(x.metadata.dateCreated)).fromNow()} by ${x.metadata.owner.userName} `,
                displayCompleted: x.isCompleted ? `Completed ${moment(new Date(x.metadata.dateUpdated)).fromNow()}` : x.dateDue != '' && x.dateDue != null ? `Due ${moment(new Date(x.dateDue)).fromNow()} <br/> ${new Date(x.dateDue).toLocaleDateString()}` : ''
            })
        })

        return result
    }

    public addTask(data: FormGroup, tags) {
        return new Promise((resolve,reject) => {
            this.httpClient.post(environment.api_path + this.API_VERSION + 'tasks', {
                name: data.value.name.trim(),
                notes: data.value.notes.trim(),
                tags: tags,
                dueDate: data.value.dueDate
            }).toPromise()
            .then((result: any) => {
                let { model , message } = result
                model = this.createTaskDetailsDate(model)
                this.taskItems.splice(0, 0, model);
                this.tagItems.push(...tags.filter(x => !this.tagItems.includes(x)))
                this.filteredTasks = this.taskItems.filter(x => x.isCompleted != true)
                this.toaster.success(message)
                resolve()
            })
                .catch(err => {
                    this.toaster.error(err.error.message)
                reject()
            })
        })
    }

    private createTaskDetailsDate = (data) => {
        data.displayCreated = `Created ${moment(new Date(data.metadata.dateCreated)).fromNow()} by ${data.metadata.owner.userName}`
        data.displayCompleted = data.isCompleted ? `Completed ${moment(new Date(data.metadata.dateUpdated)).fromNow()}` : data.dateDue != '' && data.dateDue != null ? `Due on ${new Date(data.dateDue).toDateString()}` : ''
        return data
    }

    public getTasks(name: string, sort: string) {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'tasks?tags=' + name + '&sort=' + sort).toPromise()
            .then((result: any) => {
                let  { model } = result
                model = this.constructDisplayedDate(model)
                this.isInitialized = true
                let tags = []
                model.forEach(item => {
                    tags.push(...item.tags.filter(x => !tags.includes(x)))
                })
                this.tagItems = tags
                this.taskItems = [...model]
                this.filteredTasks = this.taskItems.filter(x => x.isCompleted != true)
            })
    }

    public getTaskById(id) {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'tasks/' + id).toPromise();
    }


    public updateTask(data: FormGroup, tags) {
        return new Promise((resolve, reject) => {
            this.httpClient.put(environment.api_path + this.API_VERSION + 'tasks', {
                _id: data.value._id,
                name: data.value.name.trim(),
                isCompleted: data.value.isCompleted,
                notes: data.value.notes.trim(),
                dueDate: data.value.dueDate,
                tags: tags
            }).toPromise()
            .then((result: any) => {
                const { model, message } = result
                this.taskItems = this.taskItems.filter(x => x._id != model._id)
                console.log(model)
                this.taskItems.push(this.updateTaskDetailsDate(model))
                this.filteredTasks = this.taskItems.filter(x => x.isCompleted != true)
                this.toaster.success(message)
                resolve()
            })
                .catch(err => {
                    this.toaster.error(err.error.message)
                    reject()
            })
        })
    }


    public removeTask(id) {
        return new Promise((resolve, reject) => {
            this.httpClient.delete(environment.api_path + this.API_VERSION + 'tasks/' + id).toPromise()
                .then((result: any) => {
                    const { message } = result
                    this.toaster.success(message)
                    this.taskItems = this.taskItems.filter(x => x._id != id)
                    let tagList = []
                    this.taskItems.map(x => x.tags).forEach(tags => {
                        tags.forEach(tag => {
                            if(!tagList.includes(tag)) tagList.push(tag)
                        })
                    })

                    this.filteredTasks = this.taskItems.filter(x => x.isCompleted != true)
                    this.tagItems = tagList
                    resolve()
                })
                .catch(err => {
                    this.toaster.error(err.error.message)
                    reject()
                })
        })
    }

    private updateTaskDetailsDate = (data) => {
        data.displayCreated = `Created ${moment(new Date(data.metadata.dateCreated)).fromNow()} by ${data.metadata.owner.userName}`
        data.displayCompleted = data.isCompleted ? `Completed ${moment(new Date(data.metadata.dateUpdated)).fromNow()}` : data.dateDue != '' && data.dateDue != null  ? `Due on ${new Date(data.dateDue).toDateString()}` : ''

        return data
    }

    public markCompleteInComplete(id) {
        return new Promise((resolve, reject) => {
            this.httpClient.get(environment.api_path + this.API_VERSION + 'tasks/markAsCompleteIncomplete/' + id).toPromise()
            .then((result: any) => {
                const { message } = result
                let task = this.taskItems.filter(x => x._id == id)[0]
                task.metadata.dateUpdated = new Date()
                task.isCompleted = !task.isCompleted
                task = this.updateTaskDetailsDate(task)
                this.taskItems = this.taskItems.filter(x => x._id != id)
                this.taskItems.push(task)
                this.filteredTasks = this.taskItems.filter(x => x.isCompleted != true)
                this.toaster.success(message)
                resolve()
            })
                .catch(err => {
                    this.toaster.error(err.error.message)
                reject()
            })
        })

    }

    //Process and Inject Tasks from blog article
    public processAndInjectTasks(tasks){

        let fb = this.fb
        let allTasksAsFormPromises = [];
        let httpClient = this.httpClient
        let apiVersion = this.API_VERSION
        tasks.forEach(function(t){

            let itemP = httpClient.post(environment.api_path + apiVersion + 'tasks', {
                name: t.name,
                notes: t.notes,
                tags: t.tags,
                dueDate: moment(new Date())[t.duration.action](t.duration.value, t.duration.type)
            }).toPromise()

            allTasksAsFormPromises.push(itemP)
        })

        return Promise.all(allTasksAsFormPromises).then((results) => {
            results.forEach((result) => {
                let { model } = result
                model = this.createTaskDetailsDate(model)
                this.tagItems.push(...model.tags.filter(x => !this.tagItems.includes(x)))
                this.taskItems.push(model)
                this.filteredTasks = this.taskItems.filter(x => x.isCompleted != true)
            })
        })
    }
}


