import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { map } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  copyArrayItem,
  CdkDrag,
  CdkDropList,
} from "@angular/cdk/drag-drop";
import { CalendarDay, CalendarMonth } from "../../interfaces/calendar.interface";
import { DialogComponent } from "../dialog/dialog.component";
import { EventComposerComponent } from "../event-composer/event-composer.component";
import { CalendarService } from "../../services/calendar.service";

@Component({
  selector: "app-calendar",
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag],
  templateUrl: "./calendar.component.html",
})
export class CalendarComponent {
  weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  calendarService = inject(CalendarService);

  currentDate = new Date()

  selectedMonth$ = this.calendarService.selectedMonth$;
  selectedMonthStr$ = this.selectedMonth$.pipe(map((date) => this.getMonthStr(date)));
  selectedMonthOffset$ = this.selectedMonth$.pipe(map((date) => this.getOffset(date)));
  calendarMonth$ = this.selectedMonth$.pipe(map((date) => this.createCalendarMonth(date)));

  events$ = this.calendarService.events$;

  pickedDay$ = this.calendarService.pickedDay$;
  pickedDayEvents$ = this.pickedDay$.pipe(map((date) => this.getDayEvents(date)));

  // calMonthDays$ = this.selectedMonth$.pipe(map((date) => this.getDaysInMonth(date)));
  // {{selectedMonthEvents$.getValue()[formatDateAsIso(pickedDay$.getValue())]}}
  // this.selectedMonthEvents$.getValue()[this.formatDateAsIso(currentDay)] ?? []

  constructor(public dialog: MatDialog) {}

  getDayEvents(date: Date) {
    return this.events$.getValue()[this.formatDateAsIso(date)];
  }

  getConnectedDropLists(daysInMonth: number): any[] {
    const arr = Array.from({ length: daysInMonth }, (_, index) => `acdk-drop-list-${index}`);

    return arr;
  }

  setSelectedMonth(date: Date) {
    this.calendarService.setSelectedMonth(date);
  }

  createCalendarMonth(date: Date) {
    const daysInSelectedMonth = this.getDaysInMonth(date);

    const calendarMonth: CalendarMonth = {
      date: date,
      days: [],
    };

    for (let i = 1; i <= daysInSelectedMonth; i++) {
      const currentDay = new Date(date.getFullYear(), date.getMonth(), i);
      const events = this.events$.getValue()[this.formatDateAsIso(currentDay)] ?? [];

      const calendarDay: CalendarDay = {
        date: currentDay,
        day: i,
        events: events,
      };

      calendarMonth.days.push(calendarDay);
    }
    // console.log(calendarMonth);
    return calendarMonth;
  }

  drop(event: CdkDragDrop<any>) {
    console.log(event.container.data);

    if (event.previousContainer === event.container) {
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      return
    } else {
      console.log("✅ different container");

      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "Create a New Event",
        component: EventComposerComponent,
        payload: {},
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }

  getMonthStr(date: Date) {
    return date.toLocaleString("default", { month: "long" });
  }

  getOffset(date: Date) {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    return firstDayOfMonth > 0 ? firstDayOfMonth - 1 : 0;
  }

  setPrevMonth() {
    const nextDate = new Date(this.selectedMonth$.getValue());
    nextDate.setMonth(nextDate.getMonth() - 1);

    this.calendarService.setSelectedMonth(nextDate);
  }

  setCurrMonth() {
    this.calendarService.setSelectedMonth(new Date());
    this.calendarService.setPickedDay(new Date());
  }

  setNextMonth() {
    const nextDate = new Date(this.selectedMonth$.getValue());
    nextDate.setMonth(nextDate.getMonth() + 1);

    this.calendarService.setSelectedMonth(nextDate);
  }

  handleDayClick(date: Date) {
    this.calendarService.setPickedDay(date);
  }

  getDateStr(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  // utils
  getDaysInMonth(date: Date): number {
    const year = date.getFullYear();
    const month = date.getMonth();
    const nextMonth = new Date(year, month + 1, 1);
    nextMonth.setDate(nextMonth.getDate() - 1);

    return nextMonth.getDate();
  }

  formatDateAsIso(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  isSameDate(dateA: Date, dateB: Date) {
    return (
      dateA.getFullYear() === dateB.getFullYear() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getDate() === dateB.getDate()
    );
  }
}
