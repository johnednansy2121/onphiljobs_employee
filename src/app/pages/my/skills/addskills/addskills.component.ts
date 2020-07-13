import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SkillService } from '../../../../services/skill.service';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';

@Component({
  selector: 'app-addskills',
  templateUrl: './addskills.component.html',
  styleUrls: ['./addskills.component.scss']
})
export class AddskillsComponent implements OnInit {

  skillTable: FormGroup
  control: FormArray
  touchedRows: any;
  constructor(
    private fb: FormBuilder,
    private toastSrv: ToastrService,
    private router: Router,
    private skillService: SkillService,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.touchedRows = []
    this.skillTable = this.fb.group({
      tableRows: this.fb.array([])
    })
    this.addRow()
  }

  ngAfterOnInit() {
    this.control = this.skillTable.get('tableRows') as FormArray
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      skillLevel: ['', Validators.required],
      yearsOfExperience: ['', Validators.required],
      notes: ['']
    })
  }

  addRow() {
    const control = this.skillTable.get('tableRows') as FormArray
    control.push(this.initiateForm())
  }

  get getFormControls() {
    const control = this.skillTable.get('tableRows') as FormArray
    return control
  }

  deleteRow(index: number) {
    const control = this.skillTable.get('tableRows') as FormArray
    control.removeAt(index)
  }

  submit() {

    this.spinnerService.show("Adding your skills");
    const control = this.skillTable.get('tableRows') as FormArray
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value)
    this.skillService.addOneOrManySkills(this.touchedRows)
      .then((result: any) => {
          console.log(result)
          this.spinnerService.hide();
          this.router.navigateByUrl('/my/skills')
        })
  }
  getLength(group: any, type: any) {
    console.log()
    const data = group.controls[type].value;
    return data.length;
  }
}
