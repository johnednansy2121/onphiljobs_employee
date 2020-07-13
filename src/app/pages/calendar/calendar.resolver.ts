import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { CalendarService } from '../../services/calendar.service';



@Injectable({
    providedIn: 'root'
})
export class CalendarDataResolver implements Resolve<any>{

    constructor(
        private calendarSrv : CalendarService
    ) { }

    resolve() {
        return this.calendarSrv.initialize()
            .catch(err => { return null })
    };

}
