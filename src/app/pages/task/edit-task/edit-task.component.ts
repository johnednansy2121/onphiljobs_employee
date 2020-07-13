import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';
import { TaskService } from 'src/app/services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  editForm: FormGroup
  editTags = []
  selectedTag = ''
  priorityTags = ['goals', 'task']
  suggestedTags = [...this.priorityTags, ...this.taskService.tagItems.filter(x => !this.priorityTags.includes(x))]
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public taskService: TaskService,
    private spinnerSrv: SpinnerService,
    private toastSrv: ToastrService
  ) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      notes: [''],
      isCompleted: [''],
      dueDate: ['']
    })
    if (this.activateRoute.snapshot.data.taskData) {
      this.patchValueToForm(this.activateRoute.snapshot.data.taskData)
    } else {
      this.router.navigateByUrl('/tasks')
    }
  }

    patchValueToForm(data) {
      this.editForm.setValue({
        _id: data._id,
        name: data.name,
        isCompleted: data.isCompleted,
        notes: data.notes, 
        dueDate: data.dateDue != '' && data.dateDue != null ? new Date(data.dateDue).toLocaleDateString('en-us', { month: '2-digit', day: '2-digit', year: 'numeric' }) : null

      })
      this.editTags = data.tags
    }
  submitEdit() {
    this.spinnerSrv.show('Updating task record...')
    this.taskService.updateTask(this.editForm, this.editTags)
      .then(() => {
        this.spinnerSrv.hide()
        this.router.navigateByUrl('/tasks')
      })
      .catch(_ => {
        this.spinnerSrv.hide()
      })
  }

  removeTag = (tag: string) => {
    this.editTags = this.editTags.filter(x => x != tag)
  }

  addTag = () => {
    if (this.selectedTag != '') {
      this.editTags.push(this.selectedTag)
      this.selectedTag = ''
    }
  }

  getLength(type: any) {
    console.log()
    const data = this.editForm.controls[type].value;
    return data.length;
  }
}
