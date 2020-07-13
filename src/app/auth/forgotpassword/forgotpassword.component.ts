import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  env =environment;
  passworRecovery: FormGroup;
  isRequestDone: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authSvc: AuthenticationService,
    private toastr: ToastrService,
    private router: Router,
    private spinnerSrv: SpinnerService) {
  }

  ngOnInit() {
    this.passworRecovery = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

  }

  get f() { return this.passworRecovery.controls; }

  recoverPassword() {
    this.spinnerSrv.show('Sending your request...');
    this.authSvc.recoverPassword(this.f.email.value).subscribe((data: any) => {
      console.log(data);
      this.spinnerSrv.hide();
      this.isRequestDone = true;
    }, (error => {
      this.spinnerSrv.hide();
      this.toastr.error(error.error.message);
      console.log(error);
    }));
  }

  done() {
    this.router.navigateByUrl('/auth/login');
  }
}
