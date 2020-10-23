import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  //private api methods
  private API_VERSION = "api/v1/"

  //public api methods
  public userToken = localStorage.getItem('token')
  public hasToken = !!this.userToken;

  public twoFASettings = {
    on2FA: false,
    phone: ''
  }

  constructor(private httpClient: HttpClient, private toastSrv: ToastrService) { }

  // public login(username: string, password: string) {
  //   return this.httpClient.post(environment.api_path + this.API_VERSION + 'employer/login-employer', {userName: username, password:password }).toPromise()
  // }

  public login(username: string, password: string) {
    return this.httpClient.post(environment.api_path + this.API_VERSION + 'user/login', {userName: username, password:password }).toPromise()
  }

  public logout(){
    this.clearTokenData();
    location.reload();
  }

  // public signUp(signUpData, tag: string) {
  //   const { userName, password, email, phone, on2FA, confirm } = signUpData
  //   return this.httpClient.post(environment.api_path + this.API_VERSION + 'employer/signup-employer?tag=' + tag, { 
  //     userName: userName.toLowerCase(),
  //     password: password,
  //     email: email,
  //     phone: phone,
  //     on2FA: on2FA,
  //     confirmPassword: confirm }).toPromise()
  // }

  public signUp(signUpData, tag: string) {
    const { userName, password, email, phone, on2FA, confirm } = signUpData
    return this.httpClient.post(environment.api_path + this.API_VERSION + 'user/signup?tag=' + tag, { 
      userName: userName.toLowerCase(),
      password: password,
      email: email,
      phone: phone,
      on2FA: on2FA,
      confirmPassword: confirm }).toPromise()
   }

  // public verify(id: string) {
  //   return this.httpClient.get(environment.api_path + this.API_VERSION + 'employer/verify-employer/' + id);
  // }

  public verify(id: string) {
    return this.httpClient.get(environment.api_path + this.API_VERSION + 'user/verify/' + id);
  }

  public recoverPassword(username: string) {
    return this.httpClient.post(environment.api_path + this.API_VERSION + 'forgotpassword', { userName: username });
  }

  public changePassword(data: FormGroup, code: string) {
    return new Promise((resolve ,reject) => {
      this.httpClient.put(environment.api_path + this.API_VERSION + 'forgotpassword', {
        code,
        password: data.value.password,
        confirmPassword: data.value.password
      }).toPromise()
        .then((result: any) => {
          const { message } = result
          this.toastSrv.success(message)
          resolve()
        })
        .catch(err => {
          this.toastSrv.error(err.error.message)
          reject()
        })
    }) 
  }

  public isTokenValid(){
    return new Promise((resolve, reject) => {
      if (this.hasToken) {
        this.httpClient.get(environment.api_path + this.API_VERSION + 'sample').subscribe(
          (data: any) => {
            resolve(true)
          },
          (error => {
            reject(false)
          })
        )
      } else {
        reject(false)
      }
    })
  }

  public clearTokenData(){
    this.hasToken = false;
    this.userToken = '';
    localStorage.removeItem('token');
  }

  public storeToken(token: string){
    localStorage.setItem('token', token);
    this.userToken = token;
    this.hasToken = true;
  }

  public requestPhoneVerification(number) {
    return new Promise((resolve, reject) => {
      this.httpClient.get(environment.api_path + this.API_VERSION + 'two-factor/request/' + number).toPromise()
        .then((result: any) => {
          resolve()
        })
        .catch(err => {
          this.toastSrv.error(err.error.message)
          reject()
        })
    })
  }

  public verifyPhone(code, number) {
    return new Promise((resolve, reject) => {
      this.httpClient.get(environment.api_path + this.API_VERSION + `two-factor/${number}/verify/${code}`).toPromise()
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

  public verify2FALogin(userName, code) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(environment.api_path + this.API_VERSION  + 'user/2FA', { userName, code }).toPromise()
        .then((result: any) => {
          const { token } = result.model
          this.storeToken(token)
          this.toastSrv.success(result.message)
          resolve()
        })
        .catch(err => {
          this.toastSrv.error(err.error.message)
          reject()
        })
    }) 
  }

  public get2FASettings() {
    return this.httpClient.get(environment.api_path + this.API_VERSION  + 'user/2FA/settings').toPromise()
  }

  public update2FASettings({ phone, on2FA }) {
    return new Promise((resolve, reject) => {
        this.httpClient.put(environment.api_path + this.API_VERSION  + 'user/2FA/settings', { phone, on2FA }).toPromise()
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
}
