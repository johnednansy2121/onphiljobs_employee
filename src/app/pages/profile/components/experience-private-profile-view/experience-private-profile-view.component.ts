import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-experience-private-profile-view',
  templateUrl: './experience-private-profile-view.component.html',
  styleUrls: ['./experience-private-profile-view.component.scss']
})
export class ExperiencePrivateProfileViewComponent implements OnInit {
  @Input() experiences: any[]
  constructor() { }

  ngOnInit(): void {
  }

}
