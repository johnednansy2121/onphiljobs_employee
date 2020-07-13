import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DiaryService } from 'src/app/services/diary.service';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  diaryForm: FormGroup
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private skillSrv: DiaryService,
    private formBuilder: FormBuilder,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.diaryForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      _id: ['']
    })

    if (this.activateRoute.snapshot.data.diaryData) {
      this.mapToFormGroup(this.activateRoute.snapshot.data.diaryData)
    } else {
      this.router.navigateByUrl('/diary')
    }

    console.log(this.diaryForm);
  }

  private mapToFormGroup(data) {
    this.diaryForm.setValue({
      _id: data._id,
      title: data.title,
      body: data.body,
    })
  }

  submit() {
    this.spinnerService.show("Updating Diary Entry");

    this.skillSrv.updateDiary(this.diaryForm)
      .then((result) => {
        this.router.navigateByUrl('/diary')
      })
      .finally(() => {
        this.spinnerService.hide()
      })

  }
}