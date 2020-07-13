import {Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import { ProfileService } from "../../services/profile.service"; 
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { IProfile } from 'src/app/models/iprofile';
import { Observable } from 'rxjs';


@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  host: {
    class: "sidebar",
  },
  animations: [
    trigger("toggleSubMenu", [
      state(
        "inactive",
        style({
          height: "0",
          opacity: "0",
        })
      ),
      state(
        "active",
        style({
          height: "*",
          opacity: "1",
        })
      ),
      transition("inactive => active", animate("200ms ease-in")),
      transition("active => inactive", animate("200ms ease-out")),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  @HostBinding("attr.class") class = "sidebar";
  @ViewChild(PerfectScrollbarDirective, { static: false }) perfectScrollbarDirectiveRef?: PerfectScrollbarDirective;

  mainMenu = [
    { title: "Go Premium", icon: "seedling", route: "/premium" },
    {
      title: "Content",
      icon: "home", 
      visibility: "active",
      sub: [
        { title: "News", icon: "rss", route: "/blog/news" },
        { title: "Get Started", icon: "question", route: "/blog/get-started" },
        {
          title: "Premium",
          icon: "heart",
          route: "/blog/premium",
          premium: true,
        },
        { title: "Challenges", icon: "fire", route: "/blog/challenges" },
        { title: "Job Search", icon: "search", route: "/blog/jobsearch" },
        { title: "Career", icon: "briefcase", route: "/blog/career" },
        { title: "Wellbeing", icon: "book-medical", route: "/blog/wellbeing" },
        { title: "Leadership", icon: "tasks", route: "/blog/leadership" },
        { title: "Learning", icon: "book-reader", route: "/blog/learning" },
        { title: "Students", icon: "university", route: "/blog/students" },
      ],
    },
    {
      title: "Profile",
      icon: "user",
      visibility: "inactive",
      sub: [
        { title: "Details", icon: "info", route: "/my/details" },
        { title: "Experience", icon: "history", route: "/my/experiences" },
        { title: "Skills", icon: "check-square", route: "/my/skills" },
        { title: "Education", icon: "graduation-cap", route: "/my/education" },
        { title: "Achievements", icon: "trophy", route: "/my/achievements" },
        { title: "Portfolio", icon: "folder", route: "/my/portfolio" },
        { title: "Reviews", icon: "star", route: "/my/reviews" },
      ],
    },
    {
      title: 'Activity', icon: 'briefcase', visibility: 'inactive',
      sub: [
        { title: "Calendar", icon: "calendar", route: "/calendar" },
        { title: "Diary", icon: "file", route: "/diary" },
        { title: "Tasks", icon: "tasks", route: "/tasks" },
      ],
    },
    {
      title: "Jobs",
      icon: "running",
      route: "/jobs",
    },
    {
      title: "People",
      icon: "users",
      route: "/5",
      class: "disabled",
      promote: true,
    },
    {
      title: "Rewards",
      icon: "smile-wink",
      route: "/7",
      class: "disabled",
      promote: true,
    },
    {
      title: "Marketplace",
      icon: "store",
      route: "/8",
      class: "disabled",
      promote: true,
    },
  ];

  // mainMenu: Array<any> = [
  //   {
  //     title: 'Home',
  //     icon: 'home',
  //     route: '/home'
  //   },
  //   {
  //     title: 'Typography',
  //     icon: 'format-underlined',
  //     route: '/typography'
  //   },
  //   {
  //     title: 'Widgets',
  //     icon: 'widgets',
  //     route: '/widgets'
  //   },
  //   {
  //     title: 'Tables',
  //     icon: 'view-list',
  //     sub: [
  //       {
  //         title: 'HTML Table',
  //         route: '/tables/html-table'
  //       },
  //       {
  //         title: 'Data Table',
  //         route: '/tables/data-table'
  //       }
  //     ],
  //     visibility: 'inactive'
  //   },
  //   {
  //     title: 'Forms',
  //     icon: 'collection-text',
  //     sub: [
  //       {
  //         title: 'Basic Form Elements',
  //         route: '/forms/form-elements'
  //       },
  //       {
  //         title: 'Form Components',
  //         route: '/forms/form-components'
  //       },
  //       {
  //         title: 'Form Layouts',
  //         route: '/forms/form-layouts'
  //       },
  //       {
  //         title: 'Form Validation',
  //         route: '/forms/form-validation'
  //       }
  //     ],
  //     visibility: 'inactive'
  //   },
  //   {
  //     title: 'User Interface',
  //     icon: 'swap-alt',
  //     sub: [
  //       {
  //         title: 'Colors',
  //         route: '/user-interface/colors'
  //       },
  //       {
  //         title: 'CSS Animations',
  //         route: '/user-interface/css-animations'
  //       },
  //       {
  //         title: 'Buttons',
  //         route: '/user-interface/buttons'
  //       },
  //       {
  //         title: 'Icons',
  //         route: '/user-interface/icons'
  //       },
  //       {
  //         title: 'Listviews',
  //         route: '/user-interface/listviews'
  //       },
  //       {
  //         title: 'Toolbars',
  //         route: '/user-interface/toolbars'
  //       },
  //       {
  //         title: 'Cards',
  //         route: '/user-interface/cards'
  //       },
  //       {
  //         title: 'Alerts',
  //         route: '/user-interface/alerts'
  //       },
  //       {
  //         title: 'Badges',
  //         route: '/user-interface/badges'
  //       },
  //       {
  //         title: 'Bredcrumbs',
  //         route: '/user-interface/bredcrumbs'
  //       },
  //       {
  //         title: 'Jumbotron',
  //         route: '/user-interface/jumbotron'
  //       },
  //       {
  //         title: 'Navs',
  //         route: '/user-interface/navs'
  //       },
  //       {
  //         title: 'Pagination',
  //         route: '/user-interface/pagination'
  //       },
  //       {
  //         title: 'Progress',
  //         route: '/user-interface/progress'
  //       }
  //     ],
  //     visibility: 'inactive'
  //   },
  //   {
  //     title: 'Bootstrap Components',
  //     icon: 'group-work',
  //     sub: [
  //       {
  //         title: 'Accordions',
  //         route: '/bootstrap-components/accordions'
  //       },
  //       {
  //         title: 'Alerts',
  //         route: '/bootstrap-components/alerts'
  //       },
  //       {
  //         title: 'Buttons',
  //         route: '/bootstrap-components/buttons'
  //       },
  //       {
  //         title: 'Carousel',
  //         route: '/bootstrap-components/carousel'
  //       },
  //       {
  //         title: 'Collapse',
  //         route: '/bootstrap-components/collapse'
  //       },
  //       {
  //         title: 'Datepicker',
  //         route: '/bootstrap-components/datepicker'
  //       },
  //       {
  //         title: 'Dropdowns',
  //         route: '/bootstrap-components/dropdowns'
  //       },
  //       {
  //         title: 'Modals',
  //         route: '/bootstrap-components/modals'
  //       },
  //       {
  //         title: 'Pagination',
  //         route: '/bootstrap-components/pagination'
  //       },
  //       {
  //         title: 'Popover',
  //         route: '/bootstrap-components/popover'
  //       },
  //       {
  //         title: 'Progressbar',
  //         route: '/bootstrap-components/progressbar'
  //       },
  //       {
  //         title: 'Rating',
  //         route: '/bootstrap-components/rating'
  //       },
  //       {
  //         title: 'Sortable',
  //         route: '/bootstrap-components/sortable'
  //       },
  //       {
  //         title: 'Tabs',
  //         route: '/bootstrap-components/tabs'
  //       },
  //       {
  //         title: 'Timepicker',
  //         route: '/bootstrap-components/timepicker'
  //       },
  //       {
  //         title: 'Tooltips',
  //         route: '/bootstrap-components/tooltips'
  //       },
  //       {
  //         title: 'Typeahead',
  //         route: '/bootstrap-components/typeahead'
  //       }
  //     ],
  //     visibility: 'inactive'
  //   },
  //   {
  //     title: 'Charts and Maps',
  //     icon: 'trending-up',
  //     sub: [
  //       {
  //         title: 'Charts',
  //         route: '/charts-maps/charts'
  //       },
  //       {
  //         title: 'Maps',
  //         route: '/charts-maps/maps'
  //       }
  //     ],
  //     visibility: 'inactive'
  //   },
  //   {
  //     title: 'Photo Gallery',
  //     icon: 'image',
  //     visibility: 'inactive',
  //     route: '/photo-gallery'
  //   },
  //   {
  //     title: 'Sample Pages',
  //     icon: 'collection-item',
  //     sub: [
  //       {
  //         title: 'Profile',
  //         route: '/sample-pages/profile'
  //       },
  //       {
  //         title: 'Messages',
  //         route: '/sample-pages/messages'
  //       },
  //       {
  //         title: 'Contacts',
  //         route: '/sample-pages/contacts'
  //       },
  //       {
  //         title: 'New Contact',
  //         route: '/sample-pages/new-contact'
  //       },
  //       {
  //         title: 'Groups',
  //         route: '/sample-pages/groups'
  //       },
  //       {
  //         title: 'Pricing Tables',
  //         route: '/sample-pages/pricing-tables'
  //       },
  //       {
  //         title: 'Invoice',
  //         route: '/sample-pages/invoice'
  //       },
  //       {
  //         title: 'Todo Lists',
  //         route: '/sample-pages/todo-lists'
  //       },
  //       {
  //         title: 'Notes',
  //         route: '/sample-pages/notes'
  //       },
  //       {
  //         title: 'Search Results',
  //         route: '/sample-pages/search-results'
  //       },
  //       {
  //         title: 'Issue Tracker',
  //         route: '/sample-pages/issue-tracker'
  //       },
  //       {
  //         title: 'FAQ',
  //         route: '/sample-pages/faq'
  //       },
  //       {
  //         title: 'Team',
  //         route: '/sample-pages/team'
  //       },
  //       {
  //         title: 'Blog',
  //         route: '/sample-pages/blog'
  //       },
  //       {
  //         title: 'Blog Details',
  //         route: '/sample-pages/blog-details'
  //       },
  //       {
  //         title: 'Login & SignUp',
  //         route: '/sample-pages/login'
  //       },
  //       {
  //         title: 'Lockscreen',
  //         route: '/sample-pages/lockscreen'
  //       },
  //       {
  //         title: '404',
  //         route: '/sample-pages/404'
  //       },
  //       {
  //         title: 'Empty Page',
  //         route: '/sample-pages/empty-page'
  //       }
  //     ],
  //     visibility: 'inactive'
  //   },
  // ];

  // Toggle sub menu
  toggleSubMenu(i) {
    this.mainMenu[i].visibility =
      this.mainMenu[i].visibility === "inactive" ? "active" : "inactive";
  }

  constructor(private profileService: ProfileService, private router: Router, private store: Store<AppState>) { 
    
    this.profile = this.store.select('profile')
    
    this.router.events.subscribe((val) => {
      if (this.perfectScrollbarDirectiveRef) {
        this.perfectScrollbarDirectiveRef.update();
      }
    });
  }

  profile: Observable<IProfile>
  
  ngOnInit(): void {
  }

 
}
