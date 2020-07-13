import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProfileService } from '../../../../services/profile.service';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  listTab: any = [
    { tabName: 'General', tabRoute: 'general' },
    { tabName: 'About Me', tabRoute: 'about_me' },
    { tabName: 'Social Links', tabRoute: 'social_links' },
    { tabName: 'Video', tabRoute: 'video_pitch' },
  ];

  pageTitle: string = 'Details';
  pageSubTitle: string = 'General information you would like to highlight.';
  
  constructor( private profileSrv: ProfileService,
    private spinnerService: SpinnerService, private toastSrv: ToastrService) { }

  ngOnInit(): void {
  }

  submit() {
    this.spinnerService.show('Updating your Details');
    this.profileSrv.editProfileDetails()
    .finally(() => { 
      this.profileSrv.initialize()
        .catch(err => console.log(err));
      this.spinnerService.hide()
    }
    )
  }

  cancel() {
    this.spinnerService.show('Cancelling all changes');
    this.profileSrv.initialize().then( (res) => {
      this.spinnerService.hide();
    }).catch((err)=> {console.log(err)});
  }
}
