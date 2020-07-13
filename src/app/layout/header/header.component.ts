import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SharedService } from '../../services/shared.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {
  maCurrentTheme: string;
  maThemes: Array<string>;
  appShortcuts: Array<any>;
  tasks= this.taskService.taskItems.filter(x => x.isCompleted != true)
  notifications: Array<any>;
  mobileSearchActive: boolean = false;

  constructor(private sharedservice: SharedService, public taskService: TaskService) {

    // Retrieve current theme from AppService
    this.maCurrentTheme = environment.theme;

    // App shortcut data
    this.appShortcuts = [
      {
        appTitle: 'Calendar',
        className: 'bg-red',
        icon: 'zmdi-calendar',
        route: '/calendar'
      },
      {
        appTitle: 'Files',
        className: 'bg-light',
        icon: 'zmdi-file-text',
        route: '#',
      },
      {
        appTitle: 'Email',
        className: 'bg-light',
        icon: 'zmdi-email',
        route: '#',
      },
      {
        appTitle: 'Reports',
        className: 'bg-light',
        icon: 'zmdi-trending-up',
        route: '#',
      },
      {
        appTitle: 'News',
        className: 'bg-light',
        icon: 'zmdi-view-headline',
        route: '#',
      },
      {
        appTitle: 'Gallery',
        className: 'bg-light',
        icon: 'zmdi-image',
        route: '#',
      }
    ]

    // Available themes
    this.maThemes = [
      'green',
      'blue',
      'red',
      'teal',
      'cyan',
      'blue-grey',
      'purple',
      'indigo',
      'orange'
    ]

    // Notifications + Messages
    this.notifications = [
      {
        image: '1.jpg',
        user: 'David Belle',
        content: 'Cum sociis natoque penatibus et magnis dis parturient montes',
        date: '12:01 PM'
      },
      {
        image: '2.jpg',
        user: 'Jonathan Morris',
        content: 'Nunc quis diam diamurabitur at dolor elementum, dictum turpis vel',
        date: '02:45 PM'
      },
      {
        image: '6.jpg',
        user: 'Fredric Mitchell Jr.',
        content: 'Phasellus a ante et est ornare accumsan at vel magnauis blandit turpis at augue ultricies',
        date: '08:21 PM'
      },
      {
        image: '4.jpg',
        user: 'Glenn Jecobs',
        content: 'Ut vitae lacus sem ellentesque maximus, nunc sit amet varius dignissim, dui est consectetur neque',
        date: '08:43 PM'
      },
      {
        image: '5.jpg',
        user: 'Bill Phillips',
        content: 'Proin laoreet commodo eros id faucibus. Donec ligula quam, imperdiet vel ante placerat',
        date: '11:32 PM'
      }
    ];
  }

  // Set theme
  setMaTheme() {
    environment.theme = this.maCurrentTheme;
    this.sharedservice.currentTheme = this.maCurrentTheme;
  }

  ngOnInit() {
    this.sharedservice.currentTheme = this.maCurrentTheme;
    this.taskService.getTasks('', '-metadata.dateCreated');
  }
}
