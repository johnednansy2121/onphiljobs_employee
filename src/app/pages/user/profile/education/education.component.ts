import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  educationItems = [];

  constructor(
      private actRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.educationItems = this.actRoute.parent.snapshot.data.userEducation;
  }

}
