import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { SpinnerService } from '../../../../utilities/spinner/spinner.service';
import { Router } from '@angular/router';
import { ExperienceService } from '../../../../services/experience.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addexperience',
  templateUrl: './addexperience.component.html',
  styleUrls: ['./addexperience.component.scss']
})
export class AddexperienceComponent implements OnInit {

  experienceTable: FormGroup
  control: FormArray
  touchedRows: any

  constructor(
    private fb : FormBuilder,
    private spinnerSrv: SpinnerService,
    private router: Router,
    private experienceSrv: ExperienceService,
    private toastSrv: ToastrService
  ) { }

  ngOnInit(): void {
    this.touchedRows = []
    this.experienceTable = this.fb.group({
      tableRows: this.fb.array([])
    })
    this.addRow()
  }

  ngAfterOnInit() {
    this.control = this.experienceTable.get('tableRows') as FormArray
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      organizationName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      location: [''],
      jobDescription: [''],
      dateStarted: ['', Validators.required],
      dateFinished: ['']
    })
  }

  addRow() {
    const control = this.experienceTable.get('tableRows') as FormArray
    control.push(this.initiateForm())
  }

  get getFormControls() {
    const control = this.experienceTable.get('tableRows') as FormArray
    return control
  }

  deleteRow(index: number) {
    const control = this.experienceTable.get('tableRows') as FormArray
    control.removeAt(index)
  }

  submit() {
    this.spinnerSrv.show('Inserting work experience records')
    const control = this.experienceTable.get('tableRows') as FormArray
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
    this.experienceSrv.addManyExperiences(this.touchedRows)
      .then((result: any) => {
          this.router.navigateByUrl('/my/experiences');
      })
      .finally(() => {
        this.spinnerSrv.hide()
      })
  }
  

  getLength(group: any, type: any) {
    console.log()
    const data = group.controls[type].value;
    return data.length;
  }
}
