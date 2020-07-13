import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { UserModel } from "../models/user.model";


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  //private api variables
  private  API_VERSION = "api/v1/";

  //public api variables
  public isInitialized = false;
  public currentUser: UserModel;

  constructor(private httpClient: HttpClient) { }

  public initializeSession(){

    return new Promise((resolve, reject) => {

      if(!this.isInitialized){
        this.httpClient.get(environment.api_path + this.API_VERSION + 'user')
            .subscribe(
                (data: any) => {
                  const { model } = data;
                  this.currentUser = model
                  this.isInitialized = true
                  resolve(true)
                },
                (error) => {
                  reject(false)
                }
            )
      }else{
        resolve(true);
      }

    })

  }
}
