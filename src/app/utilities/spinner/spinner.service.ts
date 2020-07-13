import { Injectable } from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  public message = '';

  constructor(
      public ngxSpinner:NgxSpinnerService
  ) { }

  public show(message: string = ''){
    this.message = message;
    this.ngxSpinner.show();
  }

  public hide(){
    this.ngxSpinner.hide();
  }
}
