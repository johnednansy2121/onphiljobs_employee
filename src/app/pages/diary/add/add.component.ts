import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DiaryService } from '../../../services/diary.service'
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  diaryForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private diaryService: DiaryService,
    private router: Router,
    private spinnerSrv: SpinnerService,
  ) { }

  ngOnInit(): void {
    this.diaryForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]]
    })
  }

  get f() { return this.diaryForm.controls; }

  get formErrorHandler() {
    return this.f.title.errors || this.f.body.errors
  }

  submit() {
    this.spinnerSrv.show('Inserting Diary Entry.')
    this.diaryService.createDiary(this.diaryForm)
      .then(() => {
        this.router.navigateByUrl('/diary')
      })
      .finally(() => {
        this.spinnerSrv.hide()
      })
  }
}
