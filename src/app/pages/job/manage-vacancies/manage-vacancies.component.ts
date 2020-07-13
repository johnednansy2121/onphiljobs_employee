import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-vacancies',
  templateUrl: './manage-vacancies.component.html',
  styleUrls: ['./manage-vacancies.component.scss']
})
export class ManageVacanciesComponent implements OnInit {

  pageTitle: string = 'Manage Applications';
  pageSubTitle: string = 'View and manage applications you\'ve made on Fllair.';

  constructor() { }

  ngOnInit(): void {
  }

}
