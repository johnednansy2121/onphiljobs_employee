import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-experience',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent implements OnInit {

  achievementItems = [];

  constructor(
      public actRoute:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.achievementItems = this.actRoute.parent.snapshot.data.userAchievements;
    this.achievementItems.sort(function(a, b) {
      let dateA: Date = new Date(a.dateStarted), dateB: Date = new Date(b.dateFinished);
      return dateB.getTime() - dateA.getTime();
    });

  }

}
