import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { DiaryService } from "../../../services/diary.service";

@Injectable({
  providedIn: 'root'
})
export class DiaryDataResolver implements Resolve<any>{

  constructor(
    private diarySvc: DiaryService
  ) { }

  resolve() {
    return this.diarySvc.initialize()
      .catch(err => {return null})
  };

}
