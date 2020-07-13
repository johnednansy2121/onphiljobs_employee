import { Component, OnInit } from '@angular/core';
import { EducationService } from '../../../../services/education.service';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';
import { environment } from '../../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-educationlist',
  templateUrl: './educationlist.component.html',
  styleUrls: ['./educationlist.component.scss']
})
export class EducationlistComponent implements OnInit {
  env = environment;
  educationList = []
  pageTitle: string = 'Education';
  pageSubTitle: string = 'Add the Education you would like to highlight.';

  educationLabelTitle: string = 'More Education Items to add?';
  educationLabelSubTitle: string = 'You may add more Education Items, just click the button below';
  
  currentTheme: string = '';
  constructor(
    public educationService: EducationService,
    private spinnerService: SpinnerService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
  }

  convertToHTML(data) {
    return this.sanitizer.bypassSecurityTrustHtml(data);
  }
  
  delete(id: number) {
    this.spinnerService.show('Deleting education item');
    this.educationService.removeEducation(id)
        .finally(() => {
          this.spinnerService.hide()
        })
  }
  
  drop(event: CdkDragDrop<string[]>) {
    this.spinnerService.show('Reordering Items')
    this.educationService.swapOrder(event.previousIndex, event.currentIndex)
      .finally(() => this.spinnerService.hide())
  }

  markAsProtectedUnprotected(id: string) {
    this.spinnerService.show('Marking as Protected/Unprotected . . . ')
    this.educationService.protectRoute(id)
      .finally(() => this.spinnerService.hide())
  }
}
