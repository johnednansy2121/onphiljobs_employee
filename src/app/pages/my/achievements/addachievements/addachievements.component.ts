import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { SpinnerService } from '../../../../utilities/spinner/spinner.service';
import { Router } from '@angular/router';
import { AchievementService } from '../../../../services/achievement.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addachievements',
  templateUrl: './addachievements.component.html',
  styleUrls: ['./addachievements.component.scss']
})
export class AddachievementsComponent implements OnInit {
  // @ViewChild(BST, {static: false}) datapickerDirective;

  achievementTable: FormGroup
  control: FormArray
  touchedRows: any

  constructor(
    private fb: FormBuilder,
    private spinnerSrv: SpinnerService,
    private toastSrv: ToastrService,
    private router: Router,
    private achievementSrv: AchievementService
  ) { }

  ngOnInit(): void {
    this.touchedRows = []
    this.achievementTable = this.fb.group({
      tableRows: this.fb.array([])
    })
    this.addRow()
  }

  ngAfterOnInit() {
    this.control = this.achievementTable.get('tableRows') as FormArray
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      achievementName: ['', Validators.required],
      achievementDescription: [''],
      dateStarted: ['', Validators.required],
      dateFinished: ['']
    })
  }
  onShowPicker(container) {
    const dayHoverHandler = container.dayHoverHandler;
    const hoverWrapper = function ($event) {
      const { cell, isHovered } = $event;
      // do whatever with hovered cell/event
      return dayHoverHandler($event);
    };
    container.dayHoverHandler = hoverWrapper;
  }
  
  addRow() {
    const control = this.achievementTable.get('tableRows') as FormArray
    control.push(this.initiateForm())
  }

  get getFormControls() {
    const control = this.achievementTable.get('tableRows') as FormArray
    return control
  }

  deleteRow(index: number) {
    const control = this.achievementTable.get('tableRows') as FormArray
    control.removeAt(index)
  }

  submit() {
    this.spinnerSrv.show('Inserting achievement records.')
    const control = this.achievementTable.get('tableRows') as FormArray
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value)
    this.achievementSrv.addManyAchievements(this.touchedRows)
      .then(res => {
        this.router.navigateByUrl('/my/achievements')
        this.spinnerSrv.hide();
      })
      .finally( () => {
        this.spinnerSrv.hide()
      })
  }

  getLength(group: any, type: any) {
    console.log()
    const data = group.controls[type].value;
    return data.length;
  }
}
