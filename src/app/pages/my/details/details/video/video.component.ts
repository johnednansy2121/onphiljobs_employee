import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  constructor(public profileService: ProfileService) { }
  ngOnInit(): void {
  }
  getLength(type: any) {
    console.log()
    const data = this.profileService.detailsForm.controls[type].value;
    return data.length;
  }
}
