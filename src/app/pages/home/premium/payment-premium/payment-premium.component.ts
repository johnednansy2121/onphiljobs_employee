import { Component, OnInit, TemplateRef } from '@angular/core';
import { PlanService } from '../../../../services/plan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentMethodService } from '../../../../services/paymentmethod.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpinnerService } from '../../../../utilities/spinner/spinner.service';
import { SubscriptionService } from '../../../../services/subscription.service';
import { ProfileService } from '../../../../services/profile.service';

@Component({
  selector: 'app-payment-premium',
  templateUrl: './payment-premium.component.html',
  styleUrls: ['./payment-premium.component.scss']
})
export class PaymentPremiumComponent implements OnInit {

  plan = {
    id: '',
    nickname: '',
    amount: 0,
    currency: '',
    interval: ''
  }
  modalRef: BsModalRef
  addForm: FormGroup
  paymentMethodId = ''
  promoCode = '50OFF'

  constructor(
    private planSrv: PlanService,
    private activatedRoute: ActivatedRoute,
    public paymentMethodSrv: PaymentMethodService,
    private modalSrv: BsModalService,
    private fb: FormBuilder,
    private spinnerSrv: SpinnerService,
    private subscriptionSrv: SubscriptionService,
    private router: Router,
    private profileSrv: ProfileService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const param: any  = params
      const planId = param.params.planId
      this.plan = this.planSrv.planItems.filter(x => x.id == planId)[0]
    })
    this.addForm = this.fb.group({
      accountName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiryMonth: ['', Validators.required],
      expiryYear: ['', Validators.required],
      cvc: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required]
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalSrv.show(template)
  }

  submitPaymentMethod() {
    this.spinnerSrv.show('Creating payment method . . .')
    this.paymentMethodSrv.addPaymentMethod(this.addForm)
    .then(_ => {
      this.addForm.reset()
      this.modalRef.hide()
    })
    .finally(() => {
      this.spinnerSrv.hide()
    })
  }

  selectPaymentMethod(id: string, inputId) {
    this.paymentMethodId = id;
    document.getElementById(inputId).click();
  }

  subscribe() {
    this.spinnerSrv.show('Subscribing . . .')
    this.subscriptionSrv.subscribe(this.plan.id, this.paymentMethodId, this.promoCode)
    .then(_ => {
      this.router.navigateByUrl('/premium')
    })
    .finally(() => {
      this.spinnerSrv.hide()
    })
  }
}
