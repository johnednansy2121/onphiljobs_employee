import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../../../services/plan.service';
import { ProfileService } from '../../../../services/profile.service';
import { Router } from '@angular/router';
import { SpinnerService } from '../../../../utilities/spinner/spinner.service';
import { SubscriptionService } from '../../../../services/subscription.service';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProfile } from 'src/app/models/iprofile';
import * as moment from 'moment'
import { isThisSecond } from 'date-fns';

@Component({
  selector: 'app-subscribe-premium',
  templateUrl: './subscribe-premium.component.html',
  styleUrls: ['./subscribe-premium.component.scss']
})
export class SubscribePremiumComponent implements OnInit {

  plans = [];
  planFeatures = {
    plan_free: {
      title: "Free Plan",
      features: [
        'Online Resume & Profile',
        'News & Articles',
        'Take A Challenge',
        'Tasks & Diary'
      ]
    },
    price_1GsIoWKj7H3a0BU8PfAwnSoi : {
      title: "[TEST] Premium Daily",
      features: [
        'Now:',
        'We',
        'Can',
        'Do this'
      ]
    },

    price_1GsKhrKj7H3a0BU8xmQa6K8U: {
      title: "[TEST] Premium Monthy",
      features: [
        'Standard Membership Plus:',
        '1 to 1 Career Discussion',
        'Verified Profile Badge',
        'Exclusive Content & Discounts'
      ]
    },

    plan_H9fSQUEqSumb4Z: {
      title: "[TEST] Premium Yearly",
      features: [
        'Standard Membership Plus:',
        '1 to 1 Career Discussion',
        'Verified Profile Badge',
        'Exclusive Content & Discounts'
      ]
    },

    plan_HDMMtusVMrI2oc: {
      title: "Premium Yearly",
      features: [
        'Standard Membership Plus:',
        '1 to 1 Career Discussion',
        'Verified Profile Badge',
        'Exclusive Content & Discounts'
      ]
    }
  }

  colors = ['blue', 'red', 'purple', 'teal']
  profile: Observable<IProfile>
  remainingDays: number = 0;
  selectedPlan: any

  constructor(
    public planSrv: PlanService,
    public profileSrv: ProfileService,
    private router: Router,
    private spinnerSrv: SpinnerService,
    private subscriptionSrv: SubscriptionService,
    private store: Store<AppState>
  ) { 
    this.profile = this.store.select('profile')
    this.profile.subscribe(data => {
      if(data.premium.hasProSubscription) {
        this.remainingDays = moment(data.premium.subscription.nextInterval).diff(moment(), 'days') + 1
      }
    })
  }

  ngOnInit(): void {
    this.spinnerSrv.show('Getting plans . . .')
    const freeSubscription =
    {
      id: "plan_free",
      isFree: true,
      nickname: 'Standard',
      amount: 0.00,
      currency: 'AUD'
    };
    this.plans.push(freeSubscription);
    this.planSrv.planItems.forEach(element => {
      console.log(element)
      this.plans.push(element)
    });

    this.profile.subscribe(data => {
      if(data.premium.hasProSubscription) {
        this.selectedPlan = this.plans.filter(x => x.id === data.premium.subscription.planId)[0]
        console.log("SELPLAN")
        console.log(this.selectedPlan)
      }
    })

  }

  navigate(planId: string) {
    this.router.navigateByUrl('/premium/payment/' + planId)
  }

  unsubscribe() {
    this.spinnerSrv.show('Unsubscribing . . .')
    this.subscriptionSrv.unsubscribe()
    .finally(() => {
      this.spinnerSrv.hide()
    })
  }
}
