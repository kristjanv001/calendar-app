import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, filter, map, of } from "rxjs";
import { Event } from "../interfaces/calendar.interface";

@Injectable({
  providedIn: "root",
})
export class CalendarService {
  events: Event[] = [];
  selectedMonth$ = new BehaviorSubject(new Date());

  constructor() {
    this.events = [
      {
        title: "fff",
        date: new Date(2024, 4, 16),
      },
      {
        title: "sleep",
        date: new Date(2024, 4, 10),
      },
      {
        title: "run",
        date: new Date(2024, 4, 15),
      },
      {
        title: "play",
        date: new Date(2024, 5, 15),
      },
      {
        title: "cook",
        date: new Date(2024, 5, 12),
      },
    ];
  }

  setSelectedMonth(date: Date) {
    this.selectedMonth$.next(date);
  }

  getEventsForMonth(year: number, month: number): Observable<Event[]> {
    return of(this.events).pipe(
      map((events) =>
        events.filter((event) => {
          return event.date.getFullYear() === year && event.date.getMonth() === month;
        }),
      ),
    );
  }
}
