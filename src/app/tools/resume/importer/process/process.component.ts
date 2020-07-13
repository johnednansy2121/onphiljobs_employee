import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {
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
  foundItems = 0;
  constructor(
    private spinnerSrv: SpinnerService, private router: Router) { }

  ngOnInit(): void {
    this.resumeItems.forEach(element => {
      this.foundItems = this.foundItems + element.itemList.length;
    });
    console.log(this.resumeItems)
    this.spinnerSrv.hide();
  }

  continue() {
    this.router.navigateByUrl('/tools/resume/importer/confirm');
  }
}
