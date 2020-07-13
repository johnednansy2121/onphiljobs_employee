import { Component, OnInit } from '@angular/core';
import {SpinnerService} from "./spinner.service";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  env = environment;
  constructor(
      public spinnerSvc:SpinnerService
  ) { }

  ngOnInit(): void {
  }

}
