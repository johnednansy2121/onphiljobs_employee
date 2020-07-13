import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  env =environment;
  passwordForm : FormGroup
  newPassword = ''
  code = ''
  constructor(
    private activatedRoute : ActivatedRoute,
    private spinnerSrv: SpinnerService,
    private fb: FormBuilder,
    private authenticationSrv: AuthenticationService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params : any) => {
      const { params: { code } } = params 
      this.code = code
    })
    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
    console.log(this.code)
  }

  get f() { return this.passwordForm.controls; }
  get formErrorHandler() {
    return (this.f.password.value !== this.f.confirmPassword.value)
      || this.f.confirmPassword.errors || this.f.password.errors
  }

  changePassword() {
    this.spinnerSrv.show('Updating password . . .')
    this.authenticationSrv.changePassword(this.passwordForm, this.code)
      .then(() => {
        this.route.navigateByUrl('/auth/login')
      })
      .finally(() => this.spinnerSrv.hide())
  }
}
