import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EducationService } from '../../../../services/education.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {SpinnerService} from "../../../../utilities/spinner/spinner.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updateeducation',
  templateUrl: './updateeducation.component.html',
  styleUrls: ['./updateeducation.component.scss']
})
export class UpdateeducationComponent implements OnInit {

  educationForm: FormGroup

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private educationService: EducationService,
    private formBuilder: FormBuilder,
    private spinnerService:SpinnerService,
    private toastSrv: ToastrService
  ) { }

  ngOnInit(): void {
    this.educationForm = this.formBuilder.group({
      institutionName: ['', Validators.required],
      dateStarted: [Date, Validators.required],
      dateFinished: [Date],
      notes: [''],
      _id: ['']
    })

    if(this.activateRoute.snapshot.data.educationData) {
      this.mapToFormGroup(this.activateRoute.snapshot.data.educationData)
    }else{
      this.router.navigateByUrl('/my/education')
    }

    console.log(this.educationForm);
  }

  private mapToFormGroup(data) {
    this.educationForm.setValue({
      _id: data._id,
      institutionName: data.institutionName,
      dateStarted: new Date(data.dateStarted) ,
      dateFinished: data.dateFinished != null && data.dateFinished != '' ? new Date(data.dateFinished) : '',
      notes: data.notes
    })
  }

  submit() {
    this.spinnerService.show("Updating");

    this.educationService.updateEducation(this.educationForm)
        .then((result) => {
          this.router.navigateByUrl('/my/education')
        })
        .finally(() => {
          this.spinnerService.hide()
        })

  }
  getLength(type: any) {
    console.log()
    const data = this.educationForm.controls[type].value;
    return data.length;
  }
}
