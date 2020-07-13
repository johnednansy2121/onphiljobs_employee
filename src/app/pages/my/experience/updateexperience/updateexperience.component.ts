import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperienceService } from '../../../../services/experience.service';
import { SpinnerService } from '../../../../utilities/spinner/spinner.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updateexperience',
  templateUrl: './updateexperience.component.html',
  styleUrls: ['./updateexperience.component.scss']
})
export class UpdateexperienceComponent implements OnInit {

  experienceForm: FormGroup

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private experienceSrv: ExperienceService,
    private formBuilder: FormBuilder,
    private spinnerService: SpinnerService,
    private toastSrv: ToastrService
  ) { }

  ngOnInit(): void {
    this.experienceForm = this.formBuilder.group({
      organizationName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      dateStarted: [Date, Validators.required],
      dateFinished: [Date],
      location: [''],
      jobDescription: [''],
      _id: ['']
    })

    if (this.activateRoute.snapshot.data.experienceData) {
      this.mapToFormGroup(this.activateRoute.snapshot.data.experienceData)
    } else {
      this.router.navigateByUrl('/my/experiences')
    }

    console.log(this.experienceForm);
  }

  private mapToFormGroup(data) {
    this.experienceForm.setValue({
      _id: data._id,
      organizationName: data.organizationName,
      jobTitle: data.jobTitle,
      location: data.location,
      dateStarted: new Date(data.dateStarted),
      dateFinished: data.dateFinished != null && data.dateFinished != '' ? new Date(data.dateFinished) : '',
      jobDescription: data.jobDescription
    })
  }

  submit() {
    this.spinnerService.show("Updating");

    this.experienceSrv.updateExperience(this.experienceForm)
      .then((result) => {
        this.router.navigateByUrl('/my/experiences')
      })
      .finally(() => {
        this.spinnerService.hide()
      })

  }

  getLength(type: any) {
    console.log()
    const data = this.experienceForm.controls[type].value;
    return data.length;
  }
}
