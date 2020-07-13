import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-twofactor-settings',
  templateUrl: './twofactor-settings.component.html',
  styleUrls: ['./twofactor-settings.component.scss']
})
export class TwofactorSettingsComponent implements OnInit {

  separateDialCode = true;
	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
	preferredCountries: CountryISO[] = [CountryISO.Australia, CountryISO.UnitedKingdom];

  mobileNumber: any
  phone : any

  isValid = false
  on2FA = false

  isVerified = false

  verificationCode = ''
  modalRef: BsModalRef

  constructor(
    private authSrv: AuthenticationService,
    private spinnerSrv: SpinnerService,
    private modalSrv: BsModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.authSrv.get2FASettings()
      .then((result: any) => {
        const { on2FA, phone } = result.model
        this.phone = phone
        this.on2FA = on2FA
        this.validSubmit()
      })
  }

  toggleOn2FA() {
    this.on2FA = !this.on2FA
    this.validSubmit()
  }

  validSubmit() {
    if(this.on2FA === true) {
      let internationalNumber
      if(this.phone === undefined) {
        internationalNumber = ''
      } else {
        internationalNumber = this.phone.internationalNumber
      }
      if(internationalNumber === '')
        this.isValid = false
      else {
        if(this.isVerified) 
          this.isValid = true
        else this.isValid = false
      }
    } else {
      this.isValid = true
    }
  }

  submit() {
    this.spinnerSrv.show('Updating 2 FA Authentication . . .')
    console.log(this.phone)
    let phone
    if(this.phone === undefined) phone = ''
    else if(this.phone.internationalNumber === undefined) phone = this.phone
    else phone = this.phone.internationalNumber.replace(/\s/g, '')
    this.authSrv.update2FASettings({ on2FA: this.on2FA, phone })
      .finally(() => this.spinnerSrv.hide())
  }

  requestPhoneVerification(template: TemplateRef<any>) {
    this.spinnerSrv.show('Requesting Verification Code . . . ')
    let mobileNumber = ''
    if(this.phone.internationalNumber === undefined) mobileNumber = this.phone
    else mobileNumber = this.phone.internationalNumber.replace(/\s/g, '')
    this.authSrv.requestPhoneVerification(mobileNumber)
      .then(() => {
        this.modalRef = this.modalSrv.show(template)
      })
      .finally(() => this.spinnerSrv.hide())
  }

  verify2FALogin() {
    this.spinnerSrv.show('Authenticating . . .')
    let mobileNumber = ''
    if(this.phone.internationalNumber === undefined) mobileNumber = this.phone
    else mobileNumber = this.phone.internationalNumber.replace(/\s/g, '')

    this.authSrv.verifyPhone(this.verificationCode, mobileNumber)
      .then((result: any) => {
        this.modalRef.hide()
        this.verificationCode = ''
        this.isVerified = true
        this.toastr.success('Phone Verified');
        this.validSubmit()
      })
      .finally(() => this.spinnerSrv.hide())
  }
}
