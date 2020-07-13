import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  uploader: HTMLElement = document.getElementById('uploader') as HTMLElement;
  constructor(
    private spinnerSrv: SpinnerService, private router: Router) { }

  ngOnInit(): void {
  }

  fileChangeEvent(event: any): void {
    this.spinnerSrv.show('Processing you Resume');
    this.router.navigateByUrl('/tools/resume/importer/process');
  }
}
