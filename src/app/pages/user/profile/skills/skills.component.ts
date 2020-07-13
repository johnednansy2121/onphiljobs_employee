import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  skillItems = [];

  constructor(
      public actRoute:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.skillItems = this.actRoute.parent.snapshot.data.userSkills;
  }

}
