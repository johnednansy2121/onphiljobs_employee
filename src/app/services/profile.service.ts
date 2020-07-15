import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import * as ProfileActions from '../actions/profile.action'

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    //private api methods
    private API_VERSION = "api/v1/"

    //public api methods
    public isInitialized = false;
    detailsForm: FormGroup;
    profileImage = '';
    public profile = { premium: {
            hasProSubscription: false
        }
    }

    constructor(private httpClient: HttpClient, private toastSrv: ToastrService, private store: Store<AppState>) { }
    public initialize() {
        if (this.isInitialized) {
            return Promise.resolve(this.detailsForm);
        } else {
            return this.getProfileForDetails().then(
                (data: any) => {
                    const user = { ...data.model }
                    this.mapGroup(user);
                    this.profile = data.model;
                    this.profileImage = user.displayPicture;
                }
            ).catch(err => { return err })
        }
    }

    mapGroup(user) {
        this.detailsForm = new FormGroup({
            '_id': new FormControl(user._id),
            'firstName': new FormControl(user.firstName),
            'lastName': new FormControl(user.lastName),
            'aboutMe': new FormControl(user.aboutMe),
            'displayPicture': new FormControl(user.displayPicture),
            'socialLinks': new FormGroup({
                'linkedin': new FormControl(user.socialLinks.linkedin),
                'facebook': new FormControl(user.socialLinks.facebook),
                'twitter': new FormControl(user.socialLinks.twitter),
                'instagram': new FormControl(user.socialLinks.instagram),
            }),
            'videoUrl': new FormControl(user.videoUrl == '' ? '' : 'https://youtu.be/' + user.videoUrl),
            'jobTitle': new FormControl(user.jobTitle),
            'location': new FormGroup({
                'state': new FormControl(user.location.state),
                'country': new FormControl(user.location.country)
            })
        });
    }

    public createProfile(data: any, _displayPicture) {
        console.log(_displayPicture);
        return this.httpClient.post(environment.api_path + this.API_VERSION + 'profile', {
            firstName: data.value.firstName,
            lastName: data.value.lastName,
            aboutMe: data.value.aboutMe,
            displayPicture: _displayPicture,
            videoUrl: data.value.videoUrl,
            socialLinks: {
                facebook: data.value.facebook,
                twitter: data.value.twitter,
                linkedin: data.value.linkedin,
                instagram: data.value.instagram
            }
        });
    }
    public getProfile() {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'profile')
    }

    public getProfileForDetails() {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'profile').toPromise();
    }

    public getUpdatedStateProfileDetails() {
        this.httpClient.get(environment.api_path + this.API_VERSION + 'profile').toPromise()
            .then((result: any) => {
                this.profile = result.model
            })
    }

    public editProfileDetails() {
        console.log(this.getFormValues);
        return new Promise((resolve, reject) => {
            this.httpClient.put(environment.api_path + this.API_VERSION + 'profile', {
                _id: this.getFormValues._id,
                displayPicture: this.profileImage,
                firstName: this.getFormValues.firstName,
                lastName: this.getFormValues.lastName,
                aboutMe: this.getFormValues.aboutMe,
                videoUrl: this.getFormValues.videoUrl,
                socialLinks: {
                    facebook: this.getFormValues.socialLinks.facebook,
                    twitter: this.getFormValues.socialLinks.twitter,
                    linkedin: this.getFormValues.socialLinks.linkedin,
                    instagram: this.getFormValues.socialLinks.instagram
                },
                jobTitle: this.getFormValues.jobTitle,
                location: {
                    state: this.getFormValues.location.state,
                    country: this.getFormValues.location.country
                }
            })
            .toPromise()
            .then((result: any) => {
                this.store.dispatch(new ProfileActions.SetProfile(result.model))
                this.toastSrv.success(result.message)
                resolve()
            })
            .catch(err => {
                this.toastSrv.error(err.error.message)
                reject()
            })
        })
         
    }

    public editProfile(formData: FormGroup, data: any) {
        const { _id, user, metadata, displayPicture } = data
        return this.httpClient.put(environment.api_path + this.API_VERSION + 'profile', {
            _id,
            user,
            metadata,
            displayPicture,
            firstName: formData.value.firstName,
            lastName: formData.value.lastName,
            aboutMe: formData.value.aboutMe,
            videoUrl: formData.value.videoUrl,
            socialLinks: {
                facebook: formData.value.facebook,
                twitter: formData.value.twitter,
                linkedin: formData.value.linkedin,
                instagram: formData.value.instagram
            }
        })
    }

    public getProfileByUsername(username: string) {
        return this.httpClient.get(environment.api_path + this.API_VERSION + `profile/${username}`).toPromise()
    }

    get getFormValues() {
        return this.detailsForm.value;
    }

    public cancelDetailChanges() {
        return this.getProfileForDetails().then(
            (data: any) => {
                const user = { ...data.model }
                this.mapGroup(user);
            }
        ).catch(err => { return err })
    }


    public changePassword(data: any) {
        console.log(data);
        return new Promise((resolve, reject) => {
         this.httpClient.post(environment.api_path + this.API_VERSION + 'changepassword', {
            oldPassword: data.value.oldPassword,
            newPassword: data.value.newPassword,
            confirmPassword: data.value.confirmPassword
         })
             .toPromise()
             .then((result: any) => {
                 this.toastSrv.success(result.message)
                 resolve()
             })
             .catch(err => {
                 this.toastSrv.error(err.error.message)
                 reject()
             })
            })
    }

    public getPrivateProfile(username: string, code: string) {
        return this.httpClient.get(environment.api_path + this.API_VERSION + `profile/${username}/private?code=${code}`)
    }
}
