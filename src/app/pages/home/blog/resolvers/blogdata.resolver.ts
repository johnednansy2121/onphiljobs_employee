import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { WordpressService } from "../../../../services/wordpress.service";

@Injectable({
  providedIn: 'root'
})
export class BlogDataResolver implements Resolve<any> {

  constructor(private wpService: WordpressService) {
  }

  resolve(route:ActivatedRouteSnapshot) {

    return this.wpService.getPostsByCategory(route.params.category)
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
