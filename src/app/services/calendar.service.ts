import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { endOfDay, startOfDay } from 'date-fns'

const colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  }


@Injectable({
    providedIn: 'root'
})

export class CalendarService {

    //private api methods

    public eventItems = []
    private API_VERSION = "api/v1/"
    public calendar_path : string
    //public api methods

    constructor(private httpClient: HttpClient) { }

    public initialize() {
        this.eventItems = []
        return this.getCalendar()
            .then((result : any) => {
                let { model } = result
                console.log(model[0])
                this.calendar_path = environment.api_path + this.API_VERSION + 'calendar/ical/' + model[0].metadata.owner
                this.addToEventItemsResult(model)
                return this.eventItems
            })
            .catch(error => { return error })
    }

    addToEventItemsResult(data){
        data.forEach(item => {
            this.eventItems.push({
                start: item.dateEnd ? new Date(item.dateStart) : startOfDay(new Date(item.dateStart)),
                end: item.dateEnd ? item.dateEnd : endOfDay(new Date(item.dateStart)),
                title: item.eventTitle,
                color: item.eventType == 'TASK'? colors.red : colors.yellow
            })
        })
    }



    public getCalendar() {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'calendar/my').toPromise()

    }


}
