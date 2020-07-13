import { Component, OnInit, ViewChild, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import {
  isSameDay,
  isSameMonth
} from 'date-fns';
import {
  CalendarEvent,
  CalendarView,
} from 'angular-calendar';
import { CalendarService } from '../../services/calendar.service';
import { Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  view: CalendarView = CalendarView.Month

  CalendarView = CalendarView

  refresh: Subject<any> = new Subject()

  viewDate: Date = new Date()

  events: CalendarEvent[] = this.calendarSrv.eventItems

  activeDayIsOpen: boolean = true

  modalRef: BsModalRef

  constructor(
    public calendarSrv: CalendarService,
    private modelSrv: BsModalService
  ) { }

  ngOnInit(): void {

  }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  openImport(template: TemplateRef<any>) {
    this.modalRef = this.modelSrv.show(template)
  }
}
