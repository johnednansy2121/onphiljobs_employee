import { Component, OnInit, TemplateRef } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  env = environment;
  loginForm: FormGroup;
  errorMessage = '';

  verificationCode = ''

  modalRef: BsModalRef

  constructor(
    private service: SharedService,
    private router: Router,
    private authSvc: AuthenticationService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinnerSrv: SpinnerService,
    private modalSrv: BsModalService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.loginForm.controls; }
  get formErrorHandler() { return this.f.password.errors || this.f.email.errors;  }
  get formStatusError() { return this.f.password.value === '' || this.f.email.value === '' }
  login(template: TemplateRef<any>) {
    if (!this.formErrorHandler) {
      this.errorMessage = '';

      this.spinnerSrv.show('Signing you in...');
      console.log(this.f);
      this.authSvc.login(this.f.email.value, this.f.password.value)
        .then((result: any) => {
          const { on2FA } = result.model
          if(on2FA) {
            this.modalRef = this.modalSrv.show(template)
          } else {
            console.log(result.model)
            this.authSvc.storeToken(result.model.token);
            this.router.navigateByUrl(environment.initial_page);
          }
        })
        .catch(err => {
          this.toastr.error(err.error.message)
          this.spinnerSrv.hide();
        })
    }
    
  }

  public verify2FALogin() {
    this.spinnerSrv.show('Authenticating . . .')
    this.authSvc.verify2FALogin(this.loginForm.value.email, this.verificationCode)
      .then(() => {
        this.modalRef.hide()
        this.router.navigateByUrl(environment.initial_page)
      })
      .finally(() => this.spinnerSrv.hide())
  }

}
