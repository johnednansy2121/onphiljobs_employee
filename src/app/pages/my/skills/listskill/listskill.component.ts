import { Component, OnInit, TemplateRef } from '@angular/core';
import { SkillService } from '../../../../services/skill.service';
import {SpinnerService} from "../../../../utilities/spinner/spinner.service";
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-listskill',
  templateUrl: './listskill.component.html',
  styleUrls: ['./listskill.component.scss']
})
export class ListskillComponent implements OnInit {

  skills = []

  levels = ['Beginner', 'Average', 'Intermediate', 'Expert', 'Instructor']

  pageTitle: string = 'Skills';
  pageSubTitle: string = 'Add the skills you would like to highlight.';

  constructor(
    public skillService: SkillService,
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {

  }

  delete(id: string) {
    this.spinner.show("Deleting your skill")
    this.skillService.removeSkill(id)
        .finally(() => {
          this.spinner.hide()
        })

  }

  drop(event: CdkDragDrop<string[]>) {
    this.spinner.show('Reordering Items')
    this.skillService.swapOrder(event.previousIndex, event.currentIndex)
      .finally(() => this.spinner.hide())
  }

  markAsProtectedUnprotected(id: string) {
    this.spinner.show('Marking as Protected/Unprotected . . .')
    this.skillService.protectRoute(id)
      .finally(() => this.spinner.hide())
  }
}
