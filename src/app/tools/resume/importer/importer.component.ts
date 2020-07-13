import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.scss']
})
export class ImporterComponent implements OnInit {

  pageTitle: string = 'Import Resume';
  pageSubTitle: string = 'You may import your resume here.';

  tabs: any = [
    { tabName: 'Select File', tabRoute: 'select' },
    { tabName: 'Process Results', tabRoute: 'process' },
    { tabName: 'Confirm', tabRoute: 'confirm' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
