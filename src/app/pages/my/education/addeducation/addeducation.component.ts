import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EducationService } from '../../../../services/education.service';
import { Router } from '@angular/router';
import {SpinnerService} from "../../../../utilities/spinner/spinner.service";

@Component({
  selector: 'app-addeducation',
  templateUrl: './addeducation.component.html',
  styleUrls: ['./addeducation.component.scss']
})
export class AddeducationComponent implements OnInit {

  educationTable: FormGroup
  control: FormArray
  mode: boolean
  touchedRows: any



  constructor(
    private formBuilder: FormBuilder,
    private toastSrv: ToastrService,
    private educationService: EducationService,
    private router: Router,
    private spinnerService:SpinnerService
  ) { }

  ngOnInit(): void {
    this.touchedRows = []
    this.educationTable = this.formBuilder.group({
      tableRows: this.formBuilder.array([])
    })
    this.addRow()
  }

  ngAfterOnInit() {
    this.control = this.educationTable.get('tableRows') as FormArray
  }

  initiateForm(): FormGroup {
    return this.formBuilder.group({
      institutionName: ['', Validators.required],
      dateStarted: ['', Validators.required],
      dateFinished: [''],
      notes: ['']
    })
  }

  addRow() {
    const control = this.educationTable.get('tableRows') as FormArray
    control.push(this.initiateForm())
  }

  deleteRow(index: number) {
    const control = this.educationTable.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  get getFormControls() {
    const control = this.educationTable.get('tableRows') as FormArray
    return control
  }

  submit() {
    this.spinnerService.show("Adding your education items");
    const control = this.educationTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
    this.educationService.addEducation(this.touchedRows)
        .then((result:any) => {
          this.spinnerService.hide();
            this.router.navigateByUrl('/my/education')
        })
  }

  getLength(group: any, type: any) {
    console.log()
    const data = group.controls[type].value;
    return data.length;
  }
}
