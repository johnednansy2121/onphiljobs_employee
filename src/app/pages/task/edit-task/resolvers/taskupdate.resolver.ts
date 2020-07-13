import { Injectable } from '@angular/core';
import { TaskService } from '../../../../services/task.service';
import {ActivatedRouteSnapshot, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class TaskUpdateResolver {

  constructor(
      private taskService: TaskService,
      private router:Router,
      private toaster:ToastrService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    console.log(route.params)
    return this.taskService.getTaskById(route.params.id)
        .then((data:any) => {
          return data.model
        })
        .catch(err => {
          console.log(err)
          this.toaster.error(err.error.message);
          return this.router.navigateByUrl('/tasks')
        })
  };

}
