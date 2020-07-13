import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AchievementService } from 'src/app/services/achievement.service';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updateachievement',
  templateUrl: './updateachievement.component.html',
  styleUrls: ['./updateachievement.component.scss']
})
export class UpdateachievementComponent implements OnInit {

  achievementForm: FormGroup

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private achievementSrv: AchievementService,
    private formBuilder: FormBuilder,
    private spinnerService: SpinnerService,
    private toastSrv: ToastrService
  ) { }

  ngOnInit(): void {
    this.achievementForm = this.formBuilder.group({
      achievementName: ['', Validators.required],
      dateStarted: [Date, Validators.required],
      dateFinished: [Date],
      achievementDescription: [''],
      _id: ['']
    });
    if (this.activateRoute.snapshot.data.achievementData) {
      this.mapToFormGroup(this.activateRoute.snapshot.data.achievementData)
    } else {
      this.router.navigateByUrl('/my/achievements')
    }
  }

  private mapToFormGroup(data) {
    this.achievementForm.setValue({
      _id: data._id,
      achievementName: data.achievementName,
      dateStarted: new Date(data.dateStarted),
      dateFinished: data.dateFinished != null && data.dateFinished != '' ? new Date(data.dateFinished) : '',
      achievementDescription: data.achievementDescription
    })
  }

  submit() {
    this.spinnerService.show("Updating");
    this.achievementSrv.updateAchievement(this.achievementForm)
      .then((result) => {
        console.log(result);
        this.router.navigateByUrl('/my/achievements')
        this.spinnerService.hide();
      })
      .finally(() => {
        this.spinnerService.hide();
      })

  }
  getLength(type: any) {
    console.log()
  const data = this.achievementForm.controls[type].value;
    return data.length;
  }
}