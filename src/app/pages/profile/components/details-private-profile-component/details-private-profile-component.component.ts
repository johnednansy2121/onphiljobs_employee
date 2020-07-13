import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-details-private-profile-component',
  templateUrl: './details-private-profile-component.component.html',
  styleUrls: ['./details-private-profile-component.component.scss']
})
export class DetailsPrivateProfileComponentComponent implements OnInit {
  
  @Input() profile: any

  constructor(
    public sanitizer : DomSanitizer
  ) { }

  url: any
  aboutMe: any
  quickStatsData: any[] = []

  ngOnInit(): void {
    this.url = this.sanitizeUrl(this.profile.videoUrl)
    this.aboutMe = this.sanitizeHTMLUrl(this.profile.aboutMe)
    this.quickStatsData.push(
      {
        title: 'Jobs',
        number: this.profile.resume.experiences.length,
        color: 'rgb(58, 131, 192)',
        icon: 'fa fa-history'
      },
      {
        title: 'Skills',
        number: this.profile.resume.skills.length,
        color: '#FFAF40',
        icon: 'fa fa-check'
      },
      {
        title: 'Education',
        number: this.profile.resume.educations.length,
        color: '#FF7940',
        icon: 'fa fa-graduation-cap'
      },
      {
        title: 'Achievements',
        number: this.profile.resume.achievements.length,
        color: '#32C68A',
        icon: 'fa fa-trophy'
      }
    )
  }

  sanitizeUrl(url){
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + url)
  }

  sanitizeHTMLUrl(html: any) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
