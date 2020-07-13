import { Component, OnInit, TemplateRef } from '@angular/core';
import { ExperienceService } from '../../../../services/experience.service';
import { SpinnerService } from '../../../../utilities/spinner/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-listexperience',
  templateUrl: './listexperience.component.html',
  styleUrls: ['./listexperience.component.scss']
})
export class ListexperienceComponent implements OnInit {
  pageTitle: string = 'Experience';
  pageSubTitle: string = 'Add the experience you would like to highlight.';

  experienceLabelTitle: string = 'More Experience Items to add?';
  experienceLabelSubTitle: string = 'You may add more Job Experience Items, just click the button below';

  constructor(
    public experienceSrv: ExperienceService,
    private spinnerSrv: SpinnerService,
    private toastSrv: ToastrService
  ) { }

  ngOnInit(): void {
  }


  deleteExperience(id: string) {
    this.spinnerSrv.show('Deleting work experience.')
    this.experienceSrv.deleteExperience(id)
      .finally(() => {
        this.spinnerSrv.hide()
      })
  }

  drop(event: CdkDragDrop<string[]>) {
    this.spinnerSrv.show('Reordering Items')
    this.experienceSrv.swapOrder(event.previousIndex, event.currentIndex)
      .finally(() => this.spinnerSrv.hide())
  }

  markAsProtectedUnprotected(id: string) {
    this.spinnerSrv.show('Marking as Protected/Unprotected . . .')
    this.experienceSrv.protectRoute(id)
      .finally(() => this.spinnerSrv.hide())
  }
}
