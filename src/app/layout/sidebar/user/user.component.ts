import { Component, OnInit } from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import { SessionService } from "../../../services/session.service";
import { AuthenticationService } from "../../../services/authentication.service";
import { ProfileService } from '../../../services/profile.service';
import { IProfile } from 'src/app/models/iprofile';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [
    trigger('toggleUserMenu', [
      state('void', style({
        height: '0',
        opacity: '0'
      })),
      state('true', style({
        height: '*',
        opacity: '1'
      })),
      transition(':enter', animate('200ms ease-in')),
      transition(':leave', animate('200ms ease-out'))
    ])
  ]
})
export class UserComponent implements OnInit {
  userMenu: boolean = false;

  profile: Observable<IProfile>

  constructor(
    public sessionService: SessionService,
    public authService: AuthenticationService,
    public profileService: ProfileService,
    private store: Store<AppState>
  ) { 
    this.profile = this.store.select('profile')
  }

  ngOnInit() {
  }
}
