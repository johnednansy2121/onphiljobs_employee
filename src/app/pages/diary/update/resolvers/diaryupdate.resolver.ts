import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { DiaryService } from "../../../../services/diary.service";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class DiaryUpdateResolver implements Resolve<any> {

  constructor(private diaryService: DiaryService,
    private router: Router,
    private toaster: ToastrService
  ) { }
  resolve(route: ActivatedRouteSnapshot) {
    console.log(route.params)
    return this.diaryService.getDiaryById(route.params.id)
      .then((data: any) => {
        return data.model
      })
      .catch(err => {
        console.log(err)
        this.toaster.error(err.error.message);
        return this.router.navigateByUrl('/diary')
      })
  };
}
