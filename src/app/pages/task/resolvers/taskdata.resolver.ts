import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { TaskService } from '../../../services/task.service';


@Injectable({
    providedIn: 'root'
})
export class TaskDataResolver implements Resolve<any>{

    constructor(
        private taskSrv : TaskService
    ) { }

    resolve() {
        return this.taskSrv.initialize()
            .catch(err => { return null })
    };

}
