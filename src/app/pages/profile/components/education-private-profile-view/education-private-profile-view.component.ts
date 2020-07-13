import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-education-private-profile-view',
  templateUrl: './education-private-profile-view.component.html',
  styleUrls: ['./education-private-profile-view.component.scss']
})
export class EducationPrivateProfileViewComponent implements OnInit {
  @Input() educations: any[]
  
  constructor() { }

  ngOnInit(): void {
  }

}
