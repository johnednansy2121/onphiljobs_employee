
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../../../utilities/spinner/spinner.service';
import { Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  taskForm: FormGroup
  selected: string
  primaytags = ['goals', 'task']
  suggestedTags = [...this.primaytags, ...this.taskSrv.tagItems.filter(x => !this.primaytags.includes(x))]
  tags =  []
  constructor(
    private fb: FormBuilder,
    private toastSrv: ToastrService,
    private spinnerSrv: SpinnerService,
    private router: Router,
    public taskSrv: TaskService
  ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      notes: [''],
      dueDate: ['']
    })
  }

  submit() {
    this.spinnerSrv.show('Creating task...')
    this.taskSrv.addTask(this.taskForm, this.tags)
      .then( () => {
        this.spinnerSrv.hide()
        this.router.navigateByUrl('/tasks')
      })
      .catch(err => {
        this.spinnerSrv.hide()
      })
  }

  addTag() {
    if(this.selected != '') {
      this.tags.push(this.selected)
      this.selected = ''
    }
  }
  removeTag(tag: string) {
    this.tags = this.tags.filter(x => x != tag)
  }

  getLength(type: any) {
    console.log()
    const data = this.taskForm.controls[type].value;
    return data.length;
  }
}
