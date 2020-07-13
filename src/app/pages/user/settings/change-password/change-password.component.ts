import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private profileSrv: ProfileService,
    private spinnerService: SpinnerService,
    private router: Router) { }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }
  get passwordValidation() {
    return this.passwordForm.controls.newPassword.value === this.passwordForm.controls.confirmPassword.value;
  }

  cancel() {
    this.passwordForm.reset();
  }

  submit() {
    this.spinnerService.show("Updating Password");
    this.profileSrv.changePassword(this.passwordForm).then((result) => {
        console.log(result);
        this.cancel();
      })
      .finally(() => {
        this.spinnerService.hide();
      })
  }
}
