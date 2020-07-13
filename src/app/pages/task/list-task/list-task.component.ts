import { Component, OnInit, TemplateRef, ViewChildren, ViewChild } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../../../utilities/spinner/spinner.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss']
})
export class ListTaskComponent implements OnInit {

  @ViewChild("edit", { read: TemplateRef }) edit: TemplateRef<any>;
  name = ''
  modalRef: BsModalRef
  task = {
    name: '',
    tags: '',
    notes: '',
    isCompleted: false,
    metadata: {
      dateUpdated: new Date()
    },
    displayCompleted: ''
  }
  todoSearch: boolean = false;
  editForm: FormGroup
  sort = ''
  priorityTags = ['goals', 'task']
  suggestedTags = [...this.priorityTags, ...this.taskService.tagItems.filter(x => !this.priorityTags.includes(x))]
  editTags = []
  selectedTag = ''
  onGoingItems;
  completedItems;
  constructor(
    public taskService: TaskService,
    private spinnerSrv: SpinnerService,
    private modalSrv: BsModalService,
    private fb: FormBuilder,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.checkCompletedItems();
  }


  searchChange() {
    this.taskService.getTasks(this.name, this.sort)
  }

  addToName(tag: string) {
    this.name = this.name + (this.name == '' ? '' : ',') + tag
    this.searchChange()
  }

  changeSort(sort: string) {
    this.sort = sort
    this.searchChange()
  }

  clearSearch() {
    this.todoSearch = false;
    this.name = '';
    this.taskService.getTasks(this.name, this.sort)
  }
  delete(id: string) {
    this.spinnerSrv.show('Deleting task record...')
    this.taskService.removeTask(id)
      .then(() => {
        this.spinnerSrv.hide()
      })
      .catch( _=> {
        this.spinnerSrv.hide()
      })
  }

  markCompleteIncomplete(id: string)  {
    this.spinnerSrv.show('Updating task record...')
    this.taskService.markCompleteInComplete(id)
      .then( () => {
        this.spinnerSrv.hide()
        this.checkCompletedItems();
      })
      .catch(() => {
        this.spinnerSrv.hide()
      })
  }

  openDetailsModal(id: string, template : TemplateRef<any>) {
    this.task = this.taskService.taskItems.filter(x => x._id == id)[0]
    this.modalRef = this.modalSrv.show(template)
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
  
  checkCompletedItems() {
    this.completedItems = 0;
    this.onGoingItems = 0;
    this.taskService.taskItems.forEach(element => {
      if (element.isCompleted) {
        this.completedItems++;
      } else {
        this.onGoingItems++;
      }
    });
  }

  dueDate(data: any) {
    return data.replace('<br/>', '');
  }
}
