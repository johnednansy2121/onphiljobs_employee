import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-skill-private-profile-view',
  templateUrl: './skill-private-profile-view.component.html',
  styleUrls: ['./skill-private-profile-view.component.scss']
})
export class SkillPrivateProfileViewComponent implements OnInit {
  @Input() skills: any[]
  
  constructor() { }

  ngOnInit(): void {
  }

}
