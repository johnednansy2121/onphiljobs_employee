import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../../../services/portfolio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { SpinnerService } from '../../../../utilities/spinner/spinner.service';
import { FileService } from '../../../../services/file.service';
import { TaskService } from '../../../../services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updateportfolio',
  templateUrl: './updateportfolio.component.html',
  styleUrls: ['./updateportfolio.component.scss']
})
export class UpdateportfolioComponent implements OnInit {

  portfolioForm: FormGroup
  displayImage = ''

  control: FormArray
  primaytags = ['goals', 'task']
  suggestedTags = [...this.primaytags, ...this.taskSrv.tagItems.filter(x => !this.primaytags.includes(x))]
  selected = '';
  tagResponse = 'Hit enter to add tag';
  tags = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private portfolioSrv: PortfolioService,
    private spinnerService: SpinnerService,
    private fileService: FileService,
    private spinnerSrv: SpinnerService,
    private fb: FormBuilder,
    public taskSrv: TaskService,
    private toastSrv: ToastrService
  ) { }

  ngOnInit(): void {
    this.portfolioForm = this.fb.group({
      _id: [''],
      itemName: ['', Validators.required],
      itemDescription: [''],
      tags: []
    })

    if (this.activateRoute.snapshot.data.portfolioData) {
      this.mapToFormGroup(this.activateRoute.snapshot.data.portfolioData)
    } else {
      this.router.navigateByUrl('/my/portfolio')
    }
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
    this.spinnerSrv.show('uploading image.')
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0]
      const formData = new FormData
      formData.append('image', file)

      this.fileService.uploadImage(formData).subscribe(
        (result: any) => {
          const { model } = result
          this.displayImage = model
          this.spinnerSrv.hide()
        }
      )
    } else {
      this.spinnerSrv.hide();
    }
  }
  private mapToFormGroup(data) {
    this.portfolioForm.patchValue({
      _id: data._id,
      itemName: data.itemName,
      itemDescription: data.itemDescription
    });
    this.tags = data.tags;
    this.displayImage = data.itemImageUrl
  }

  submit() {
    this.spinnerService.show("Updating");
    this.portfolioSrv.updatePortfolio(this.portfolioForm, this.displayImage, this.tags)
      .then((result) => {
        this.router.navigateByUrl('/my/portfolio')
      })
      .finally(() => {
        this.spinnerService.hide()
      })

  }
  getLength(type: any) {
    console.log()
    const data = this.portfolioForm.controls[type].value;
    return data.length;
  }
}
