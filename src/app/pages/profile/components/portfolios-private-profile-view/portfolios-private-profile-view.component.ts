import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-portfolios-private-profile-view',
  templateUrl: './portfolios-private-profile-view.component.html',
  styleUrls: ['./portfolios-private-profile-view.component.scss']
})
export class PortfoliosPrivateProfileViewComponent implements OnInit {
  @Input() portfolios: any[]
  constructor() { }

  ngOnInit(): void {
  }

}
