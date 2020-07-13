import { Component, OnInit, TemplateRef } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { ReviewService } from 'src/app/services/review.service';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SessionService } from 'src/app/services/session.service';
import { environment } from '../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  env = environment;
  reviewItems = [];

  modalRef: BsModalRef
  isPublic = true
  isLoggedIn = localStorage.getItem('token') == '' || localStorage.getItem('token') == null ? false : true;
  recipientId = ''
  review = ''
  currentUserId;
  constructor(
      public actRoute:ActivatedRoute,
    private reviewSrv: ReviewService,
    public modalSrv: BsModalService,
      private spinnerSrv: SpinnerService,
      private sessionSrv: SessionService,
      private toastSrv: ToastrService
  ) { }

  ngOnInit() {
    this.reviewItems = this.actRoute.parent.snapshot.data.userReviews;
    this.isPublic = this.actRoute.parent.snapshot.data.publicView == undefined ? false : true
    this.recipientId = this.actRoute.parent.snapshot.data.userProfile.user;
    this.currentUserId = this.sessionSrv.currentUser._id;
    console.log(this.actRoute.parent.snapshot.data)
  }

  submit() {
    this.spinnerSrv.show('Adding Review . . . ')
    this.reviewSrv.addReview(this.recipientId, this.review.trim())
      .then((model) => {
        this.review = ''
        this.reviewItems.push(model)
        this.modalRef.hide();
      })
      .finally(() => {
        this.spinnerSrv.hide()
      })
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalSrv.show(template)
  }

  get isAddReview() {
    return !this.isPublic && ( this.recipientId !== this.currentUserId)
  }
  getLength() {
    return this.review.length;
  }
}
