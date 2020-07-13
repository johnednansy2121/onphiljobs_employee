import { Component, OnInit, HostListener } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { WordpressService } from 'src/app/services/wordpress.service';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';



@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blogPosts = [];
  category = '';
  page = 1
  isLoading = false

  constructor(
      private router: Router,
      private actRoute: ActivatedRoute,
      private wpService: WordpressService,
      private spinnerSrv: SpinnerService,
  ) {
    //this means when we navigate but only change the route param (category) the whole route will be destroyed and reloaded
    //without this, the route will be reused and the content wont change or reload. ie NGOnInit is called only once.
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {

    this.spinnerSrv.hide();
    // this.category = this.actRoute.snapshot.params.category
    // this.blogPosts = this.actRoute.snapshot.data.posts;
    this.actRoute.params.subscribe(routeParams => {
      window.scrollTo({ top: 0 })
      this.page = 1
      this.category = routeParams.category
    });

    this.actRoute.data.subscribe(routeData => {
      console.log(routeData)
      this.blogPosts = routeData.posts
    });
  }

  @HostListener('window:scroll') onscroll(){
    if((window.scrollY + window.innerHeight) >= document.body.offsetHeight) {
      this.isLoading = true
      this.page = this.page + 1
      this.wpService.getPostsByCategoryScroll(this.category, this.page)
        .then((model: []) => {
          if(model.length <= 0) {
            this.page = this.page - 1
          }
          this.blogPosts.push(...model)
          window.scrollTo({ top: window.scrollY - 20 })
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  } 
}
