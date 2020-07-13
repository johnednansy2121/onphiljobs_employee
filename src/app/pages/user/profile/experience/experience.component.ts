import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  experienceItems = [];

  constructor(
      public actRoute:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.experienceItems = this.actRoute.parent.snapshot.data.userExperience;
    // this.experienceItems.sort(function(a, b) {
    //   let dateA: Date = new Date(a.dateStarted), dateB: Date = new Date(b.dateFinished);
    //   return dateB.getTime() - dateA.getTime();
    // });
  }

}
