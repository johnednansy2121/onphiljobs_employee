import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SharedService } from '../../services/shared.service';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  env = environment;

  constructor(public service: SharedService,
              private spinnerSrv: SpinnerService) {
  }

  ngOnInit(): void {
    this.spinnerSrv.hide();
  }

}
