import { Component, OnInit } from '@angular/core';
import { DiaryService } from '../../../services/diary.service'
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  pageTitle: string = 'My Diary';
  pageSubTitle: string = 'The list of your diary will be here.';

  LabelTitle: string = 'Add an entry to you Diary?';
  LabelSubTitle: string = 'You may add more of your diary entry, just click the button below!';

  experiences = []
  diaries = []

  constructor(
    public diaryService: DiaryService,
    private spinnerSrv: SpinnerService
  ) { }

  ngOnInit(): void {
    console.log(this.diaryService.diaryItems)
  }

  deleteDiaryEntry(id: string) {
    this.spinnerSrv.show('Deleting Diary Entry.')
    this.diaryService.deleteDiaryEntry(id)
      .finally(() => {
        this.spinnerSrv.hide()
      })
  }
}
