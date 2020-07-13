import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  listTab: any = [
    { tabName: 'Change Password', tabRoute: 'change-password' },
    // { tabName: '2 Factor Authentication', tabRoute: '2-fa' }
  ];

  pageTitle: string = 'Settings';
  pageSubTitle: string = 'Change your profile settings.';

  profile = { displayPicture: null }
  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.profileService.getProfile().subscribe(
      (result: any) => {
        const { model } = result
        this.profile = { ...model }
      }
    )
  }

}
