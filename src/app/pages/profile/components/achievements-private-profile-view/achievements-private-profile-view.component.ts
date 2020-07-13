import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-achievements-private-profile-view',
  templateUrl: './achievements-private-profile-view.component.html',
  styleUrls: ['./achievements-private-profile-view.component.scss']
})
export class AchievementsPrivateProfileViewComponent implements OnInit {
  @Input() achievements: any[]
  constructor() { }

  ngOnInit(): void {
  }

}
