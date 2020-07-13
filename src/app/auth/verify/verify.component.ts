import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  NavigationStart,
} from "@angular/router";

import { filter } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "../../services/authentication.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: "app-verify",
  templateUrl: "./verify.component.html",
  styleUrls: ["./verify.component.scss"],
})
export class VerifyComponent implements OnInit {
  env = environment;
  passworRecovery: FormGroup;
  emai: string;
  previousUrl: any;
  verified: boolean = false;
  notVerified: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authSvc: AuthenticationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const param: any = params;
      this.authSvc.verify(param.params.verificationid).subscribe(
        (data: any) => {
          this.verified = data.success;
          console.log(data);
          this.authSvc.storeToken(data.model);
        },
        (error) => {
          this.notVerified = true;
        }
      );
    });
  }

  continue() {
    this.router.navigateByUrl("/blog/get-started");
  }
}
