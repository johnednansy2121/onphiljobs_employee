import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  resumeItems = [
    {
      itemName: 'Education',
      itemList: [
        {
          institutionName: 'school 1',
          dateStarted: 'date 1',
          dateFinished: 'date 2'
        },
        {
          institutionName: 'school 2',
          dateStarted: 'date 1',
          dateFinished: 'date 2'
        }
      ]
    },
    {
      itemName: 'Skills',
      itemList: [
        {
          skillName: 'Skill 1',
          skillLevel: 2
        },
        {
          skillName: 'Skill 2',
          skillLevel: 3
        }
      ]
    },
    {
      itemName: 'Experience',
      itemList: [
        {
          companyName: 'Company 1',
          dateStarted: 'date 1',
          dateFinished: 'date 2',
          notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        },
        {
          companyName: 'Company 2',
          dateStarted: 'date 1',
          dateFinished: 'date 2',
          notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        }
      ]
    },
    {
      itemName: 'Achievements',
      itemList: [
        {
          achievementName: 'Achievement 1',
          dateStarted: 'date 1',
          dateFinished: 'date 2',
          notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        },
        {
          achievementName: 'Achievement 2',
          dateStarted: 'date 1',
          dateFinished: 'date 2',
          notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        }
      ]
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
