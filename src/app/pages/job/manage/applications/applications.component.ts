import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from 'src/app/services/job.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  pageTitle: string = 'Manage Applications';
  pageSubTitle: string = 'View and manage applications you\'ve made on Fllair.';

  searchQuery: any;
  jobApplications: any
  jobApplicationsItems: any = []
  constructor(
    private spinnerSrv: SpinnerService,
    public route: ActivatedRoute,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private jobSrv: JobService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    if (this.activateRoute.snapshot.data.applicationsData) {
      this.jobApplications = this.activateRoute.snapshot.data.applicationsData;
      this.jobApplicationsItems = this.jobApplications.items;
      console.log(this.activateRoute.snapshot.data.applicationsData)
    } else {
      this.router.navigateByUrl('/jobs')
    }
    this.initialize()
  }

  withdrawApplication(id: any) {
    this.spinnerSrv.show('Withdrawing application');
    this.jobSrv.withdrawApplication(id).then((res) => {
      console.log(res)
    }).finally(() => this.spinnerSrv.hide())
  }

  initialize() {
    this.searchQuery = {
      pageSize: 10,
      pageNum: 1,
      orderBy: "metadata.dateCreated desc", //desc asc
    }
  }

  executeSearch() {
    this.spinnerSrv.show("Fetching your applications")
      this.jobSrv.fetchApplications(this.searchQuery)
      .then((result: any) => {
        this.jobApplications = result
        if (result.totalItems > 0) {
          this.toastr.success(result.message)
        } else {
          this.toastr.error('No records found')
        }
      })
      .catch(err => {
        console.log(err)
        this.toastr.error(err.error.Message)
      })
      .finally(() => {
        this.spinnerSrv.hide()
      })
  }
  changePage(event){
    this.searchQuery.pageNum = (event.pageIndex + 1)
    this.searchQuery.pageSize = event.pageSize
    this.executeSearch();
  }
}
