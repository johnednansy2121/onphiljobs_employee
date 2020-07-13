import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentMethodService } from 'src/app/services/paymentmethod.service';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {

  addForm: FormGroup
  constructor(
    public paymentMethodSrv: PaymentMethodService,
    private fb: FormBuilder,
    private spinnerSrv: SpinnerService, 
    private location: Location) { }

  ngOnInit(): void {this.addForm = this.fb.group({
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
  submitPaymentMethod() {
    this.spinnerSrv.show('Creating payment method . . .')
    this.paymentMethodSrv.addPaymentMethod(this.addForm)
      .then(_ => {
        this.addForm.reset()
        this.backToPayment();
      })
      .finally(() => {
        this.spinnerSrv.hide()
      })
  }

  backToPayment() {
    this.location.back();
  }
} 
