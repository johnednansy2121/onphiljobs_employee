import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../../../services/review.service';
import { SpinnerService } from '../../../../utilities/spinner/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {SessionService} from "../../../../services/session.service";
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {

  pageTitle: string = 'My Reviews';
  pageSubTitle: string = 'Get others to add reviews to your profile.';
  status = '';
  constructor(
    public reviewSrv: ReviewService,
    private spinnerSrv: SpinnerService,
    private toastSrv: ToastrService,
    private sessionService: SessionService
  ) { }

  link = ''
  env = environment;

  ngOnInit(): void {
    if (this.sessionService.currentUser) {
      if (this.env.domain === 'localhost') {
        this.link = "http://" + window.location.host + "/profile/view/" + this.sessionService.currentUser.userName;
      } else {
        this.link = "https://www." + this.env.domain + "/profile/view/" + this.sessionService.currentUser.userName;
      }
    }
  }

  hideUnhide(id: string, reviewStatus: boolean) {
    const message = reviewStatus ? 'Hiding your reviews' : 'Showing your reviews';
    this.spinnerSrv.show(message);
    this.reviewSrv.hideUnhideReview(id)
     .finally(() => {
       this.spinnerSrv.hide()
     })
  }

  drop(event: CdkDragDrop<string[]>) {
    this.spinnerSrv.show('Reordering Items')
    this.reviewSrv.swapOrder(event.previousIndex, event.currentIndex)
      .finally(() => this.spinnerSrv.hide())
  }

  markAsProtectedUnprotected(id: string) {
    this.spinnerSrv.show('Mark as Protected/Unprotected . . .')
    this.reviewSrv.protectRoute(id)
      .finally(() => this.spinnerSrv.hide())
  }
}
