import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from 'src/app/services/job.service';
import { ToastrService } from 'ngx-toastr';
import { JobModel } from 'src/app/models/job.model';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.scss']
})
export class ViewJobComponent implements OnInit {
  pageTitle: string = 'Job View';
  pageSubTitle: string = 'See the details of the job your looking for.';

  markers = []
  // google maps zoom level
  zoom: number = 15;
  // initial center position for the map
  lat: number = -26.233449;
  lng: number = 133.848693;
  jobModel: JobModel
  jobData: any;

  constructor(
    private spinnerSrv: SpinnerService,
    private sanitizer: DomSanitizer,
    public route: ActivatedRoute,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private jobSrv: JobService,
    private toastr: ToastrService,
    private mapsAPILoader: MapsAPILoader,) { }

  ngOnInit(): void {
    if (this.activateRoute.snapshot.data.jobViewData) {
      this.jobModel = this.activateRoute.snapshot.data.jobViewData;
      console.log(this.activateRoute.snapshot.data.jobViewData)
    } else {
      this.router.navigateByUrl('/jobs')
    }

    if (!this.jobModel.details.isWorkFromHome) {
      this.mapsAPILoader.load().then(() => {
        // this.lat = this.jobModel.details.location.lat;
        // this.lng = this.jobModel.details.location.long;
      });
    }
  }
  
  convertToHTML(data) {
    return this.sanitizer.bypassSecurityTrustHtml(data);
  }

  applyJob() {
    this.spinnerSrv.show('Sending application');
    this.jobSrv.applyForJob(this.jobModel._id).then(()=> {
    }).catch((err)=>  { 
      console.log(err)
    }).finally(() => {
      this.spinnerSrv.hide();
    })
  }

  checkSameAddress() {
    return this.jobModel.details.location.address2 && this.jobModel.details.location.address1 !== this.jobModel.details.location.address2;
  }
}
