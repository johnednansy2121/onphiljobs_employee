import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { PostsComponent } from "./posts/posts.component";
import { PhotosComponent } from "./photos/photos.component";
import { FollowersComponent } from "./followers/followers.component";
import { FollowingComponent } from "./following/following.component";
import { VideosComponent } from "./videos/videos.component";



@NgModule({
  declarations: [
    PostsComponent,
    PhotosComponent,
    FollowersComponent,
    FollowingComponent,
    VideosComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PostsComponent,
    PhotosComponent,
    FollowersComponent,
    FollowingComponent,
    VideosComponent
  ]
})
export class SocialPagesModule { }
