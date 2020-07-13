import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { JobService } from 'src/app/services/job.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';
import { MapsAPILoader } from '@agm/core';
import {} from "googlemaps"

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  @ViewChild('search', {static: true})
  public searchElementRef: ElementRef;

  address: string;
  private geoCoder;

  markers = []
  // google maps zoom level
  zoom: number = 5;
  // initial center position for the map
  lat: number = -26.233449;
  lng: number = 133.848693;
  
  pageTitle: string = 'Job Search';
  pageSubTitle: string = 'Look for the right job for you.';

  items: string[] = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
    'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
    'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin', 'Düsseldorf',
    'Essen', 'Frankfurt', 'Genoa', 'Glasgow'];
  config = {
        search: true ,
        height: 'auto',
        placeholder: 'Any Classifications',
        noResultsFound: 'No results found!'
  }
  
  stateItems: Array<any> = [];
  cityItems:Array<any> = [];
  country = '';
  state = '';
  city = '';
  locationItems: any;
  locationSearch: any[] = [];
  jobList: Array<any> = [];
  searchQuery: any;
  titleSearch = '';
  searchedJob = false;
  disableAutocomplete = false;
  constructor(
    private spinnerSrv: SpinnerService,
    private sanitizer: DomSanitizer,
    public route: ActivatedRoute,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private jobSrv: JobService,
    private toastr: ToastrService,
    public sharedSrv: SharedService,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,
  ) { }
  ngOnInit(): void {
    if (this.activateRoute.snapshot.data.jobData) {
      this.jobList = this.activateRoute.snapshot.data.jobData[0];
      console.log(this.jobList)
    } else {
      this.router.navigateByUrl('/blog/news')
    }
    this.initialize();
    
  }
  initialize() {
    this.searchQuery = {
      filter: '',
      pageSize: 10,
      pageNum: 1,
      orderBy: "metadata.dateCreated desc" //desc asc
    }
  }
  changePage(event){
    this.searchQuery.pageNum = (event.pageIndex + 1)
    this.searchQuery.pageSize = event.pageSize
    this.executeSearch();
    this.searchedJob = false;
  }

  

  convertToHTML(data) {
    return this.sanitizer.bypassSecurityTrustHtml(data);
  }
  executeSearch() {
    this.searchQuery.filter = ''
    this.spinnerSrv.show("Searching Jobs")
    console.log(this.sharedSrv.country)
    if (this.sharedSrv.country === '' && !this.sharedSrv.isDisabled) {
      this.searchQuery.filter= `contains(title, '${this.titleSearch}')` ;  
    } else {
      // this.searchQuery.filter= `contains(title, '${this.titleSearch}') and` ;  
      if (!this.sharedSrv.isDisabled) {
        this.searchQuery.filter= this.searchQuery.filter + `contains(details/location/country, '${this.sharedSrv.country}') and contains(details/location/state, '${this.sharedSrv.state}')` ;    
      } else {
        this.searchQuery.filter= this.searchQuery.filter + `contains(details/isWorkFromHome, true)`;
      } 
    }
    console.log(this.searchQuery)
    this.jobSrv.fetchJobs(this.searchQuery)
      .then((result: any) => {
        this.jobList = result.items
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
        this.searchedJob = true;
        this.searchQuery.filter = '';
      })
  }

  setMap() {
    this.sharedSrv.country = '';
    this.sharedSrv.city = '';
    this.sharedSrv.state = '';
  }
}
