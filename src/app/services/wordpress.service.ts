import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WordpressService {

  //private api methods
  private API_VERSION = "api/v1/";

  public blogPosts;
  public blogCategories;

  public blog = []

  constructor(private httpClient: HttpClient) { }

    public getPostsByCategory(category, page = 1) {
        return new Promise((resolve, reject) => {
            this.blog = []
            if(!this.blog[category]){
                this.httpClient.get(environment.api_path + this.API_VERSION + 'wordpress/getposts/' + category + `?page=${page}`)
                    .subscribe(
                        (data: any) => {
                            const { model } = data;
                            this.blog[category] = [...model]
                            resolve(this.blog[category]);
                        },
                        (error) => {
                            reject(false)
                        }
                    )
            }else{
                resolve(this.blog[category])
            }

        })
    }

    public getPostsByCategoryScroll(category, page = 1) {
        return new Promise((resolve, reject) => {
            this.httpClient.get(environment.api_path + this.API_VERSION + 'wordpress/getposts/' + category + `?page=${page}`).toPromise()
            .then((result: any) => {
               resolve(result.model)
            })
            .catch(err => {
                reject('no more items')
            })
        })
        
    }

    public getPostById(id){
        return new Promise((resolve, reject) => {
            this.httpClient.get(environment.api_path + this.API_VERSION + 'wordpress/getpost/' + id)
                .subscribe(
                    (data: any) => {
                        const { model } = data;
                        resolve(model);
                    },
                    (error) => {
                        reject(false)
                    }
                )

        })
    }

    // public getHomepageFeed() {
    //     return new Promise((resolve, reject) => {
    //
    //         if(this.blogPosts){
    //             resolve(this.blogPosts)
    //         }else{
    //             this.httpClient.get(environment.api_path + this.API_VERSION + 'wordpress/getposts')
    //                 .subscribe(
    //                     (data: any) => {
    //                         const { model } = data;
    //                         this.blogPosts = model;
    //                         resolve(this.blogPosts);
    //                     },
    //                     (error) => {
    //                         reject(false)
    //                     }
    //                 )
    //         }
    //
    //     })
    // }
    //
    // public getWordpressCategories() {
    //     return new Promise((resolve, reject) => {
    //         if(this.blogCategories){
    //             resolve(this.blogCategories)
    //         }else{
    //             this.httpClient.get(environment.api_path + this.API_VERSION + 'wordpress/categories')
    //                 .subscribe(
    //                     (data: any) => {
    //                         const { model } = data;
    //                         this.blogCategories = model;
    //                         resolve(this.blogCategories);
    //                     },
    //                     (error) => {
    //                         reject(false)
    //                     }
    //                 )
    //         }
    //     })
    // }

}
