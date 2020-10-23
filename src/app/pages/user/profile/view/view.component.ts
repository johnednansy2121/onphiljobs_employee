import { Component, OnInit, TemplateRef } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { ProfileService } from '../../../../services/profile.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from 'src/app/services/session.service';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';
import { environment } from '../../../../../environments/environment';
import { Meta } from '@angular/platform-browser';
import { TitleTagService } from 'src/app/services/title-tag.service';

declare var angular: any;

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  env = environment;
  link = '';
  user: any = {};
  socialShareItems = [
    { icon: 'fa fa-facebook', color: '#405a93', label: 'fb', name: 'Facebook' },
    { icon: 'fa fa-twitter', color: '#49a1eb', label: 'tw', name: 'Twitter' },
    { icon: 'fa fa-linkedin', color: '#0077b5', label: 'in', name: 'Linkedin' },
    { icon: 'fa fa-reddit', color: '#ff4500', label: 'rd', name: 'Reddit' },
    { icon: 'fa fa-pinterest', color: '#cb2027', label: 'pn', name: 'Pinterest' },
  ]
  modalRef: BsModalRef;
  pageTitle;
  domain;
  fullname: any;
  constructor(
    public actRoute: ActivatedRoute,
    private modalService: BsModalService,
    private platform: Platform,
    public toastrService: ToastrService,
    public sessionService: SessionService,
    private titleTagService: TitleTagService) { }

  ngOnInit(): void {
    console.log(this.actRoute.snapshot.data)
    this.user = this.actRoute.snapshot.data.userProfile;
    let fname = this.user.firstName + " " + this.user.lastName;
    this.fullname = fname.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'').substring(0,2);
    this.user.hasSocialLinks = (this.user.socialLinks.facebook
      || this.user.socialLinks.instagram || this.user.socialLinks.twitter || this.user.socialLinks.linkedin)
    this.activeSocialNavigation = 'posts';
    if (this.sessionService.currentUser) {
      if (this.env.name === 'Local') {
        this.domain = "http://" + window.location.host;
        this.link = "http://" + window.location.host + "/u/" + this.sessionService.currentUser.userName;
      } else if (this.env.name === 'Production') {
        this.domain = "https://www." + window.location.host;
        this.link = "https://www." + this.env.domain + "/u/" + this.sessionService.currentUser.userName;
      } else {
        this.domain = "https://" + window.location.host;
        this.link = "https://" + this.env.domain + "/u/" + this.sessionService.currentUser.userName;
      }
    } else {
      this.link = window.location.href;
    }
    this.pageTitle = this.user.firstName + ' ' + this.user.lastName;
    this.titleTagService.setTitle(this.pageTitle);
    this.titleTagService.setSocialMediaTags(
      this.link,
      this.pageTitle,
      this.user.aboutMe,
      this.domain,
      this.user.displayPicture);
  }

  overviewTabs: any = [
    { tabName: 'Details', tabRoute: 'details', tabIcon: 'fa fa-bar-chart' },
    // { tabName: 'Activity', tabRoute: 'reviews', tabIcon: 'fa fa-tasks' },
    { tabName: 'Experience', tabRoute: 'experience', tabIcon: 'fa fa-briefcase' },
    { tabName: 'Skills', tabRoute: 'skills', tabIcon: 'fa fa-podcast' },
    { tabName: 'Education', tabRoute: 'education', tabIcon: 'fa fa-university' },
    // { tabName: 'Projects', tabRoute: 'projects', tabIcon: 'fa fa-code-fork' },
    { tabName: 'Achievements', tabRoute: 'achievements', tabIcon: 'fa fa-trophy' },
    { tabName: 'Portfolio', tabRoute: 'portfolio', tabIcon: 'fa fa-cubes' },
    { tabName: 'Reviews', tabRoute: 'reviews', tabIcon: 'fa fa-star' },
  ];
  socialTabs: any = [
    { tabName: 'Posts', amount: 24, tabRoute: 'posts', tabIcon: 'fa fa-pencil-square-o' },
    { tabName: 'Videos', amount: 55, tabRoute: 'videos', tabIcon: 'fa fa-video-camera' },
    { tabName: 'Photos', amount: 13, tabRoute: 'photos', tabIcon: 'fa fa-picture-o' },
    { tabName: 'Followers', amount: 243, tabRoute: 'followers', tabIcon: 'fa fa-user-plus' },
    { tabName: 'Following', amount: 234, tabRoute: 'following', tabIcon: 'fa fa-users' }
  ];
  activeSocialNavigation: any;

  socialNavigation(activeNav: any) {
    if (this.activeSocialNavigation === activeNav) {
      console.log('The Tab is already active.');
    } else {
      this.activeSocialNavigation = activeNav;
    }
  }
  checkMobilePlatform() {
    if (this.platform.ANDROID || this.platform.IOS) {
      return true;
    } else {
      return false;
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  copy() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.link;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastrService.success('Link copied to clipboard');
  }

  shareProfile(socialPlatform: any) {
    const url = encodeURIComponent(this.link);
    switch (socialPlatform) {
      case 'fb':
        this.popUpCenter(`https://www.facebook.com/sharer/sharer.php?u=${url}`, 'Share to Facebook', 700, 500);
        break;
      case 'tw':
        this.popUpCenter(`https://twitter.com/home?status=${url}`, 'Share to Twitter', 700, 500);
        break;
      case 'in':
        this.popUpCenter(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, 'Share to Linkedin', 700, 500);
        break;
      case 'tr':
        this.popUpCenter(`https://www.tumblr.com/widgets/share/tool?canonicalUrl=${url}`, 'Share to Tumblr', 700, 500);
        break;
      case 'rd':
        this.popUpCenter(`https://reddit.com/submit?url=${url}`, 'Share to Reddit', 700, 500);
        break;
      case 'pn':
        this.popUpCenter(`https://www.pinterest.com/pin/find/?url=${url}`, 'Share to Pinterest', 700, 500);
        break;
      default:
        break;
    }
  }

  popUpCenter(url, title, w, h) {
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const top = (height - h) / 2 / systemZoom + dualScreenTop
    const newWindow = window.open(url, title,
      `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `
    )

    if (window.focus) newWindow.focus();
  }
}
