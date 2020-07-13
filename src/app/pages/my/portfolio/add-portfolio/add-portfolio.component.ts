import { Component, OnInit } from '@angular/core';
import { FileService } from '../../../../services/file.service';
import { SpinnerService } from '../../../../utilities/spinner/spinner.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PortfolioService } from '../../../../services/portfolio.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TaskService } from '../../../../services/task.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-add-portfolio',
  templateUrl: './add-portfolio.component.html',
  styleUrls: ['./add-portfolio.component.scss']
})
export class AddPortfolioComponent implements OnInit {

  displayImage = ''
  portfolioForm: FormGroup
  primaytags = ['goals', 'task']
  suggestedTags = [...this.primaytags, ...this.taskSrv.tagItems.filter(x => !this.primaytags.includes(x))]
  control: FormArray;
  selected = '';
  tagResponse = 'Hit enter to add tag';
  tags = [];

  constructor(
    private fileService: FileService,
    private spinnerSrv: SpinnerService,
    private fb: FormBuilder,
    private portfolioSrv: PortfolioService,
    private toastSrv: ToastrService,
    private router: Router,
    public taskSrv: TaskService
  ) { }

  ngOnInit(): void {
    this.portfolioForm = this.fb.group({
      itemName: ['', Validators.required],
      itemDescription: ['']
    });
  }

  addTag() {
    if (this.selected !== '') {
      this.tags.push(this.selected);
      this.selected = '';
      this.tagResponse = 'Hit enter to add tag';
    } else {
      this.tagResponse = 'Please enter a tag first before adding'
    }
  }

  deleteTag(index: number) {
    this.tags.splice(index, 1);
  }

  fileChange(event: any) {
    this.spinnerSrv.show('uploading image.');
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      const formData = new FormData;
      formData.append('image', file);

      this.fileService.uploadImage(formData).subscribe(
        (result: any) => {
          const { model } = result;
          this.displayImage = model;
          this.spinnerSrv.hide();
        },
        (error) => {
          this.spinnerSrv.hide();
        }
      );
    } else {
      this.spinnerSrv.hide();
    }
  }

  submit() {
    this.spinnerSrv.show('Submitting portfolio data.');
    this.portfolioSrv.addPortfolio(this.portfolioForm, this.displayImage, this.tags)
      .then((result: any) => {
        this.router.navigateByUrl('/my/portfolio');
      })
      .finally(() => {
        this.spinnerSrv.hide()
      })

  }
  getLength(type: any) {
    console.log()
    const data = this.portfolioForm.controls[type].value;
    return data.length;
  }
}
