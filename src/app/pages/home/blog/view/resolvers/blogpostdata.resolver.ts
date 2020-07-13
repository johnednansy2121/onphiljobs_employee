import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { WordpressService } from "../../../../../services/wordpress.service";

@Injectable({
  providedIn: 'root'
})
export class BlogPostDataResolver implements Resolve<any> {

  constructor(private wpService: WordpressService) {
  }

  resolve(route:ActivatedRouteSnapshot) {

    return this.wpService.getPostById(route.params.id)
        .then((res) => {
          console.log(res);
          return res;
        })
        .catch((err) => {
          return err;
        })

    // return forkJoin({
    //   blogPosts: this.wpService.getHomepageFeed(),
    //   blogCategories: this.wpService.getWordpressCategories(),
    // });

  }

}
