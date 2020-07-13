import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  placeholderText = "This is a text editor that will allow you to express your career highlights in any way that suits you."
  currrentLength = 0;
  constructor(
    public profileService: ProfileService,) { }

  ngOnInit(): void {
    this.currrentLength = this.getLength('aboutMe');
  }

  getLength(type: any) {
    console.log()
    const data = this.profileService.detailsForm.controls[type].value;
    return data.length;
  }
  textChanged($event) {
    this.currrentLength = $event.editor.getLength() - 1;
    if ($event.editor.getLength() > 1500) {
      $event.editor.deleteText(1500, $event.editor.getLength());
    }
  }
}
