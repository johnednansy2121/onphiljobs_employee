import { Component, OnInit, TemplateRef } from '@angular/core';
import { AchievementService } from '../../../../services/achievement.service';
import { SpinnerService } from '../../../../utilities/spinner/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-listachievements',
  templateUrl: './listachievements.component.html',
  styleUrls: ['./listachievements.component.scss']
})
export class ListachievementsComponent implements OnInit {



  pageTitle: string = 'Achievements';
  pageSubTitle: string = 'Add the Achievements you would like to highlight.';

  achievementTitle: string = 'More Achievements to add?';
  achievementsLabelSubTitle: string = 'You may add more Achievements, just click the button below';

  constructor(
    public achievementSrv: AchievementService,
    private spinnerSrv: SpinnerService
  ) { }

  ngOnInit(): void {
  }

  deleteAchievement(id: string) {
    this.spinnerSrv.show('Deleting achievement record.')
    this.achievementSrv.deleteAchievement(id)
      .finally(() => {
        this.spinnerSrv.hide()
      })
  }

  drop(event: CdkDragDrop<string[]>) {
    this.spinnerSrv.show('Reordering Items ')
    this.achievementSrv.swapOrder(event.previousIndex, event.currentIndex)
      .finally(() => this.spinnerSrv.hide())
    
  }

  markProtectedUnprotected(id: string) {
    this.spinnerSrv.show('Marking as protected/unprotected . . . ')
    this.achievementSrv.protectRoute(id)
      .finally(() => this.spinnerSrv.hide())
  }
}
