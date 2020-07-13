import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../../services/profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  profile = {
    firstName: '',
    lastName: '',
    aboutMe: ''
  }

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private toasterService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: any) => {
        const param: any = params
        // this.profileService.getProfileByUsername(param.params.username).subscribe(
        //   (data: any) => {
        //     const { model } = data
        //     this.profile = { ...model }
        //   },
        //   (error) => {
        //     this.toasterService.error(error.message)
        //     this.router.navigateByUrl('/home')
        //   }
        // )
      },
      error => {
        this.router.navigateByUrl('/home')
      }
    )

  }

}
