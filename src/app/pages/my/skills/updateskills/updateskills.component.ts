import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillService } from 'src/app/services/skill.service';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updateskills',
  templateUrl: './updateskills.component.html',
  styleUrls: ['./updateskills.component.scss']
})
export class UpdateskillsComponent implements OnInit {

  skillForm: FormGroup
  isActive = 1;
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private skillSrv: SkillService,
    private formBuilder: FormBuilder,
    private spinnerService: SpinnerService,
    private toastSrv: ToastrService
  ) { }

  ngOnInit(): void {
    this.skillForm = this.formBuilder.group({
      skillName: ['', Validators.required],
      skillLevel: ['', Validators.required],
      yearsOfExperience: ['', Validators.required],
      notes: [''],
      _id: ['']
    })

    if (this.activateRoute.snapshot.data.skillsData) {
      this.mapToFormGroup(this.activateRoute.snapshot.data.skillsData)
    } else {
      this.router.navigateByUrl('/my/skills')
    }

    console.log(this.skillForm);
  }

  private mapToFormGroup(data) {
    this.skillForm.setValue({
      _id: data._id,
      skillName: data.skillName,
      skillLevel: data.skillLevel,
      yearsOfExperience: data.yearsOfExperience,
      notes: data.notes
    })
  }

  getActiveTab(i) {
    return i === this.skillForm.controls.skillLevel.value ? true : i.toString() === this.skillForm.controls.skillLevel.value;
  }

  submit() {
    this.spinnerService.show("Updating Skill");
    this.skillSrv.updateSkill(this.skillForm)
      .then((result) => {
        this.router.navigateByUrl('/my/skills')
      })
      .finally(() => {
        this.spinnerService.hide()
      })
  }
  getLength(type: any) {
    console.log()
    const data = this.skillForm.controls[type].value;
    return data.length;
  }
}
