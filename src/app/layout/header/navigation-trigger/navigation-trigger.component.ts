import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-navigation-trigger',
  templateUrl: 'navigation-trigger.component.html',
  styleUrls: ['navigation-trigger.component.scss']
})
export class NavigationTriggerComponent implements OnInit {

  constructor(public service: SharedService) { }

  openMobileSidebar() {
    this.service.mobileSidebarActive = !this.service.mobileSidebarActive;
  }

  ngOnInit() {
  }

}
