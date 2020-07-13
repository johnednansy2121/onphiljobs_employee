import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  NgcCookieConsentService,
  NgcInitializeEvent,
  NgcNoCookieLawEvent,
  NgcStatusChangeEvent
} from 'ngx-cookieconsent';
import { Subscription }   from 'rxjs';
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'MyEmployeeLife';

  constructor(
      private ccService: NgcCookieConsentService,
      private authService: AuthenticationService
  ){}

  private statusChangeSubscription: Subscription;


  ngOnInit() {


    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
        (event: NgcStatusChangeEvent) => {
          console.log(event)
          if(event.status == "deny"){
            this.authService.logout()
          }
        });

  }

  ngOnDestroy(): void {
    this.statusChangeSubscription.unsubscribe();
  }

}
