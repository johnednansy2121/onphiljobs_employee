import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-review-private-profile-view',
  templateUrl: './review-private-profile-view.component.html',
  styleUrls: ['./review-private-profile-view.component.scss']
})
export class ReviewPrivateProfileViewComponent implements OnInit {
  @Input() reviews: any[]
  constructor() { }

  ngOnInit(): void {
  }

}
