import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'sp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  quickStatsData: Array<any> = [];

  constructor(
      private actRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.quickStatsData.push(
        {
          title: 'Jobs',
          number: this.actRoute.parent.snapshot.data.userExperience.length,
          color: 'rgb(58, 131, 192)',
          icon: 'fa fa-history'
        },
        {
          title: 'Skills',
          number: this.actRoute.parent.snapshot.data.userSkills.length,
          color: '#FFAF40',
          icon: 'fa fa-check'
        },
        {
          title: 'Education',
          number: this.actRoute.parent.snapshot.data.userEducation.length,
          color: '#FF7940',
          icon: 'fa fa-graduation-cap'
        },
        {
          title: 'Achievements',
          number: this.actRoute.parent.snapshot.data.userAchievements.length,
          color: '#32C68A',
          icon: 'fa fa-trophy'
        }
    )
    this.actRoute.parent.snapshot.data.userEducation;
  }

}
