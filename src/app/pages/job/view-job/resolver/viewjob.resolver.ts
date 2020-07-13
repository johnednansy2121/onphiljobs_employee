import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { JobService } from '../../../../services/job.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
    providedIn: 'root'
})
export class ViewJobResolver implements Resolve<any>{

    constructor(
        private jobSrv: JobService,
        private router:Router,
        private toaster: ToastrService
    ) { }
  
    resolve(route: ActivatedRouteSnapshot) {
      console.log(route.params)
      return this.jobSrv.fetchJobById(route.params.id)
          .then((data:any) => {
            return data.model;
          })
          .catch(err => {
            console.log(err)
            this.toaster.error(err.error.message);
            return this.router.navigateByUrl('/jobs')
          })
    };

}
