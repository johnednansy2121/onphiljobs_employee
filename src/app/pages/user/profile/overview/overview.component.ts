import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  user: any
  url: any
  aboutMe: any
  constructor(
    private actRoute:ActivatedRoute,
    public sanitizer:DomSanitizer
  ) { }

  ngOnInit() {
    //get the current user out of the parent route (/profile or /u)
    this.user = this.actRoute.parent.snapshot.data.userProfile;
    this.url = this.sanitizeUrl(this.user.videoUrl)
    this.aboutMe = this.sanitizeHTMLUrl(this.user.aboutMe);
    console.log(this.user)
  }

  sanitizeUrl(url){
   return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + url)
  }

  sanitizeHTMLUrl(html: any) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
